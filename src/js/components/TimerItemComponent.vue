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

<script>
export default {
    name: `TimerItemComponent`,

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
            return this.getTimer.begin;
        },

        // Остаток времени
        timeLeft() {
            let timeLeft = this.getTimer.begin - this.getTimer.passed;
            return timeLeft > 0 ? timeLeft : 0;
        },

        // Подсчет процента выполнения
        progressValue() {
            return this.getTimer.passed
                ? 100 - Math.floor(this.getTimer.passed / (this.getTimer.begin / 100))
                : 100;
        }
    },

    data: () => ({
        isPlaySong: false
    }),

    watch: {
        timeLeft(value) {
            if (!value) {
                // Включить звук уведомление
                this.playSound();

                // Favicon и title
                this.$root.$emit(`addNotify`);

                // Остановить таймер
                this.stop();
            }
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

        stop() {
            this.$root.$emit(`stopTimer`, this.timerId);
        },

        reset() {
            this.$root.$emit(`resetTimer`, this.timerId);
        },

        // Управление звуком
        playSound() {
            // Признак включенного звука
            this.isPlaySong ^= true;

            // Включить звук уведомления
            this.$root.$emit(`playSong`, {
                songId: this.getSong.id,
                isPlay: this.isPlaySong
            });
        }
    }
};
</script>
