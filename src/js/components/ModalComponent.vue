<template>
  <transition name="Modal">
    <div class="Modal">
      <div class="Modal__wrapper">
        <div class="Modal__container">
          <a @click.prevent="closeModal" class="Modal__close" href="#"></a>
          <div class="Modal__header">Таймер</div>
          <div class="Modal__content">
            <div class="Modal__box">
              <div class="AddTimer">
                <div class="AddTimer__col">
                  <label class="AddTimer__label" for="timerHours">Часы</label>
                  <input v-model.number="hour" class="AddTimer__input AddTimer__input--time" id="timerHours" type="number" value="0" min="0" max="99">
                </div>
                <div class="AddTimer__col">
                  <label class="AddTimer__label" for="timerMinutes">Минуты</label>
                  <input v-model.number="minute" class="AddTimer__input AddTimer__input--time" id="timerMinutes" type="number" value="0" min="0" max="59">
                </div>
                <div class="AddTimer__col">
                  <label class="AddTimer__label" for="timerSeconds">Секунды</label>
                  <input v-model.number="second" class="AddTimer__input AddTimer__input--time" id="timerSeconds" type="number" value="0" min="0" max="59">
                </div>
              </div>
            </div>
            <div class="Modal__box">
              <label class="AddTimer__label" for="timerName">Название</label>
              <input v-model="name" class="AddTimer__input AddTimer__input--name" id="timerName" type="text" maxlength="255">
            </div>
            <div class="Modal__box">
              <label class="AddTimer__label" for="timerSongs">Звук уведомления</label>
              <select v-model.number="song" class="AddTimer__select" id="timerSongs">
                <option v-for="song in songs" :key="`song-modal-${song.id}`" :value="song">{{song.title}}</option>
              </select>
              <span class="BtnAudio">
                <input @change="listenSong" type="checkbox" value="1" id="BtnAudio" name="listenAudio">
                <label for="BtnAudio">Прослушать</label>
              </span>
            </div>
          </div>
          <div class="Modal__controls">
            <button @click.prevent="saveTimer" class="Btn Btn--default">Сохранить</button>
            <button @click.prevent="closeModal" class="Btn Btn--link">Отменить</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from "vuex";
import {timeStr2Array} from "../functions";

export default {
    name: `ModalComponent`,
    props: {
        timerId: Number
    },
    watch: {
        getTimer(value) {
            if (value) {
                const timeFormat = timeStr2Array(value.begin);
                this.hour = timeFormat[0];
                this.minute = timeFormat[1];
                this.second = timeFormat[2];
                this.song = value.song ? value.song : this.songs[0];
                this.name = value.name;
            } else {
                this.hour = 0;
                this.minute = 0;
                this.second = 0;
                this.song = this.songs[0];
                this.name = ``;
            }
        },
        songId() {
            this.$root.$emit(`pauseSong`);
        }
    },
    computed: {
        getTimer() {
            return this.$store.getters[`timer/findTimer`](this.timerId);
        },
        ...mapState({
            songs: state => state.timer.songs
        })
    },
    data: () => ({
        name: ``,
        song: null,
        hour: 0,
        minute: 0,
        second: 0
    }),
    methods: {
        saveTimer() {

            // @TODO Валидация

            this.$root.$emit(`saveTimer`, 
                Object.assign(this.$data, {
                    id: this.timerId
                })
            );
        },

        closeModal() {
            this.$root.$emit(`closeModal`);
        },

        listenSong(e) {
            this.$root.$emit(`listenSong`, {
                isPlay: e.target.checked,
                song: this.song
            });
        }
    }
};
</script>
