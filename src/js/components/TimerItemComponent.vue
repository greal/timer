<template>
  <div :class="['Timer__item', {'Timer__item--overdue': !timeLeft}]">
    <div class="Timer__row">
      <div class="Timer__counter">{{timeLeft | formatSecond2Human}}</div>
      <div class="Timer__controls">
        <button @click="toggle" :class="['Btn', {'Btn--green': !getActive}, {'Btn--red': getActive}]" v-text="!getActive ? `Старт` : `Стоп`" :disabled="!timeLeft"></button>
        <button @click="reset" class="Btn Btn--default" :disabled="!getPassed">Сброс</button>
      </div>
    </div>
    <div class="Timer__row Timer__row--info">
      <span class="Timer__name" v-text="getName"></span>
      <span class="Timer__value">{{getCounter | formatSecond2Human}}</span>
      <span class="BtnAudio">
        <input type="checkbox" :id="`AudioCheck-${getSong.id}`" :name="`audioCheck_${getSong.id}`" @change="playSound()" :checked="isPlaySong">
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

<script lang="ts">
import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'
import {EventBus} from '../EventBus'

@Component
export default class TimerItemComponent extends Vue {

    @Prop(Number) readonly timerId!: number

    isPlaySong: boolean = false

    created() {
        // Обнулить состояние если была включена мелодия
        EventBus.$on(`stopSong`, () => {
            this.isPlaySong = false;
        });
    }

    get getTimer() {
        return this.$store.getters[`timer/findTimer`](this.timerId)
    }

    get getName() {
        return this.getTimer.name;
    }

    get getActive() {
        return this.getTimer.isActive;
    }

    get getPassed() {
        return this.getTimer.passed;
    }

    get getSong() {
        return this.getTimer.song;
    }

    get getCounter() {
        return this.getTimer.begin;
    }

    // Остаток времени
    get timeLeft() {
        let timeLeft = this.getTimer.begin - this.getTimer.passed;
        return timeLeft > 0 ? timeLeft : 0;
    }

    // Подсчет процента выполнения
    get progressValue() {
        return this.getTimer.passed
            ? 100 - Math.floor(this.getTimer.passed / (this.getTimer.begin / 100))
            : 100;
    }

    @Watch('timeLeft')
    onTimeLeftChanged(value: number) {
        if (!value) {
            // Включить звук уведомление
            this.playSound();

            // Favicon и title
            EventBus.$emit(`addNotify`);

            // Остановить таймер
            this.stop();
        }
    }

    edit() {
        EventBus.$emit(`openModal`, this.timerId);
    }

    remove() {
        if (confirm(`Вы действительно хотите удалить таймер?`)) {
            EventBus.$emit(`removeTimer`, this.timerId);
        }
    }

    toggle() {
        EventBus.$emit(`toggleTimer`, this.timerId);
    }

    stop() {
        EventBus.$emit(`stopTimer`, this.timerId);
    }

    reset() {
        EventBus.$emit(`resetTimer`, this.timerId);
    }

    // Управление звуком
    playSound() {
        // Признак включенного звука
        this.isPlaySong = this.isPlaySong !== true;

        // Включить звук уведомления
        EventBus.$emit(`playSong`, {
            songId: this.getSong.id,
            isPlay: this.isPlaySong
        });
    }
}
</script>
