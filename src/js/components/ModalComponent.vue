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
                <input type="checkbox" id="BtnAudio" name="listenAudio" @change="playSound()" :checked="isPlaySong">
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

<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import {EventBus} from '../EventBus'
import {Timer, Sound} from '../types/store'
import {timeStr2Array} from "../functions"

const namespace = 'timer'

@Component
export default class ModalComponent extends Vue {
    @Prop(Number) readonly timerId!: number
    @Getter('getSongs', {namespace}) readonly songs!: Sound[]
    @Getter('getDefaultParams', {namespace}) readonly defaultParams!: Timer

    name: string = ``
    song: Sound | null = null
    hour: number = 0
    minute: number = 0
    second: number = 0
    isPlaySong: boolean = false

    created() {
        if (!this.timerId) {
            this.hour = 0;
            this.minute = 10;
            this.second = 0;
            this.song = this.songs[0];
            this.name = this.defaultParams.name;
        }
    }

    @Watch('getTimer')
    onGetTimerChanged(value: Timer) {
        if (value) {
            const timeFormat = timeStr2Array(value.begin);
            this.hour = timeFormat[0];
            this.minute = timeFormat[1];
            this.second = timeFormat[2];
        } else {
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            this.song = this.songs[0];
            this.name = ``;
        }
    }

    @Watch('song')
    onSongChanged() {
        EventBus.$emit(`stopSong`);
        this.isPlaySong = false;
    }

    get getTimer() {
        return this.$store.getters[`timer/findTimer`](this.timerId)
    }

    saveTimer() {
        // @TODO Валидация

        EventBus.$emit(`saveTimer`, Object.assign(this.$data, {
            id: this.timerId
        }))
    }

    closeModal() {
        EventBus.$emit(`closeModal`)
    }

    // Управление звуком
    playSound() {
        // Признак включенного звука
        this.isPlaySong = this.isPlaySong !== true;

        // Включить звук уведомления
        EventBus.$emit(`playSong`, {
            songId: this.song ? this.song.id : this.songs[0].id,
            isPlay: this.isPlaySong
        })
    }
}
</script>
