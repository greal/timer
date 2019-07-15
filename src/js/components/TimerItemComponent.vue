<template>
  <div :class="['Timer__item', {'Timer__item--overdue': !timeLeft}]">
    <div class="Timer__row">
      <div class="Timer__counter" v-text="getCounterDyn">--:--:--</div>
      <div class="Timer__controls">
        <button @click="toggle" :class="['Btn', {'Btn--green': !getActive}, {'Btn--red': getActive}]" v-text="!getActive ? `Старт` : `Стоп`" :disabled="!timeLeft"></button>
        <button @click="reset" class="Btn Btn--default" :disabled="!getPassed">Сброс</button>
      </div>
    </div>
    <div class="Timer__row Timer__row--info">
      <span class="Timer__name" v-text="getName"></span>
      <span class="Timer__value" v-text="getCounter">--:--:--</span>
      <span class="BtnAudio">
        <input type="checkbox" :id="`AudioCheck-${getSong.id}`" :name="`audioCheck_${getSong.id}`" @change="notify" :checked="isPlaySong">
        <label :for="`AudioCheck-${getSong.id}`">{{getSong.title}}</label>
      </span>
      <button @click="edit" class="Btn Btn--link Btn--edit">
        <span class="Icon Icon--edit"></span>
        Редактировать
      </button>
      <button @click="remove" class="Btn Btn--link Btn--remove">
        <span class="Icon Icon--remove"></span>
        Удалить
      </button>
    </div>
    <div class="Timer__row">
      <div :class="['Timer__progress', {'Timer__progress--textHide': progressValue < 5}, {'Timer__progress--alert': progressValue <= 10}]">
        <div :style="[{'width': `${progressValue}%`}]" v-text="getPassed ? `${progressValue}%` : `(не запущено)`"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import store from "../store";
import {timeSecond2Human} from "../functions";

export default {
    name: `TimerItemComponent`,
    store,
    created() {
        // this.$store.dispatch('timer/getRequisites')
        // console.log(this.getTimer);
    },
    props: {
        timerId: Number
    },
    computed: {
        getTimer() {
            return this.$store.getters[`timer/findTimer`](this.timerId);
        },
        getName() {
            return this.getTimer.name;
        },
        getActive() {
            return this.getTimer.isActive;
        },
        getPassed() {
            return this.getTimer.passed;
        },
        getSong() {
            return this.getTimer.song;
        },
        getCounter() {
            return timeSecond2Human(this.getTimer.begin);
        },
        getCounterDyn() {
            return timeSecond2Human(this.timeLeft);
        },
        timeLeft() {
            let timeLeft = this.getTimer.begin - this.getTimer.passed;
            return timeLeft > 0 ? timeLeft : 0;
        }
    },

    data: () => ({
        progressValue: 100,
        isPlaySong: false
    }),

    watch: {
        getTimer(timer) {
            this.calcProgressValue();

            if (!this.timeLeft) {
                // Включить уведомление
                this.notify();

                // Добавить уведомление в favicon и title
                // faviconBadge++;
                // handlerNotify();

                // Остановить таймер
                // timerState(timer.id, false);
            }

            // console.log("getTimer: ", timer);
        },

        getActive(value) {
            // console.log("getActive: ", value);
        }
    },

    methods: {
        edit() {
            this.$root.$emit(`openModal`, this.timerId);
        },
        remove() {
            if (confirm(`Вы действительно хотите удалить таймер?`)) {
                this.$root.$emit(`removeTimer`, this.timerId);
            }
        },
        toggle() {
            this.$root.$emit(`toggleTimer`, this.timerId);
        },
        reset() {
            // Убрать цвет просрочки
            // timerItem.removeClass('Timer__item--overdue');
            // Остановка таймера
            // if (storeTimer.isset(id)) {
            // 	timerState(id, false);
            // }
            // Сброс
            // var timers = store.get('timers', []);
            // timers.map(function (timer) {
            // 	if (timer.id === id) {
            // 		timer.isActive = false;
            // 		timer.passed = 0;
            //
            // 		// Выключение мелодии
            // 		timerAlert.stop(timer.songId);
            // 	}
            // 	return timer;
            // });
            // store.set('timers', timers);
        },

        // Подсчет процента выполнения
        calcProgressValue() {
            this.progressValue = this.getTimer.passed
                ? 100 - Math.floor(this.getTimer.passed / (this.getTimer.begin / 100))
                : 100;
        },

        // Добавить уведомление в favicon и title
        notify() {
            // Признак включенного звука
            this.isPlaySong ^= true;

            // Включить звук уведомления
            this.$root.$emit(`playSong`, {
                timerId: this.timerId,
                songId: this.getSong.id,
                isPlay: this.isPlaySong
            });
        }
    }
};
</script>
