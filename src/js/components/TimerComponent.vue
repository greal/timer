<template>
  <div class="Timer">
    <template v-if="timers.length">
      <timer-item v-for="item in timers" :key="item.id" :timer-id="item.id"></timer-item>
    </template>
    <div v-else class="Timer__item">
      <div class="Timer__empty">У вас нет ни одного таймера!</div>
    </div>
    <div class="Timer__footer">
      <a @click.prevent="openModal()" class="Btn Btn--default js-Modal-add" href="#">
        <span class="Icon Icon--add"></span> Добавить таймер
      </a>
    </div>
    <modal v-show="isShowModal" :timerId="modalTimerId"></modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// import {mapState, mapActions} from "vuex";
import {State, Action} from 'vuex-class';
import {RootState, Timer} from '../types/store'
import {AdjustingInterval, TimerSound} from '../functions'
import timeChecker from "../timeChecker"
import Modal from './ModalComponent.vue'
import TimerItem from './TimerItemComponent.vue'
const namespace: string = 'timer'

const timeCheck = new timeChecker();
const timerInstance = new AdjustingInterval(() => {
    timeCheck.check();
}, 1000, () => {
    console.warn(`The drift exceeded the interval.`);
});

const timerSound = new TimerSound('../audio/');

@Component({
    name: "TimerComponent",
    components: {
        TimerItem,
        Modal
    }
})
export default class TimerComponent extends Vue {

    @State('timers', {namespace}) timers
    @Action('changeActivity', {namespace}) changeActivity
    @Action('resetPassed', {namespace}) resetPassed
    @Action('updatePassed', {namespace}) updatePassed
    @Action('saveTimer', {namespace}) saveTimer
    @Action('removeTimer', {namespace}) removeTimer

    isShowModal = false
    modalTimerId = null

    created() {
        // Запуск общего таймера
        timerInstance.start();

        // Сохранить таймер
        this.$root.$on(`saveTimer`, (data) => {
            this.save(data);
        });

        // Открыть окно
        this.$root.$on(`openModal`, (timerId: number) => {
            this.openModal(timerId);
        });

        // Закрыть окно
        this.$root.$on(`closeModal`, () => {
            this.isShowModal = false;
        });

        // Прослушать звук
        this.$root.$on(`playSong`, (payload) => {
            payload.isPlay 
                ? timerSound.play(payload.songId)
                : timerSound.stop(payload.songId);
        });

        // Отключить звук
        this.$root.$on(`stopSong`, () => {
            timerSound.stopAll();
        });

        // Вкл./Выкл. таймер
        this.$root.$on(`toggleTimer`, (id: number) => {
            this.toggleTimer(id);
            this.stopSoundTimer(id);
        });

        // Удалить таймер
        this.$root.$on(`removeTimer`, (id: number) => {
            this.removeStartedTimer(id);
            this.stopSoundTimer(id);
            this.removeTimer(id);
        });

        // Сброс таймера
        this.$root.$on(`resetTimer`, (id: number) => {
            this.timerState(id, false);
            this.resetPassed(id);
            this.stopSoundTimer(id);
        });

        // Остановка таймера
        this.$root.$on(`stopTimer`, (id: number) => {
            this.timerState(id, false);
        });

        // Если страница была перезагружена
        this.timers
            .filter((timer: Timer) => timer.isActive === true)
            .forEach((timer: Timer) => {
                this.timerState(timer.id, true);
            });
    }   

    // data: () => ({
    //     isShowModal: false,
    //     modalTimerId: null
    // }),
    
    // Выключение мелодии
        stopSoundTimer(id: number) {
            let timer = this.getTimer(id);
            timerSound.stop(timer.song.id);
        }

        // Поиск запущенного таймера
        issetStartedTimer(id: number) {
            return timeCheck.cfg.checks.findIndex((item: Timer) => item.id === id) !== -1;
        }

        // Процесс выполнения таймера
        timerProcess(id: number) {
            // Обновить пройденное время таймера
            this.updatePassed(this.getTimer(id));
        }

        // Получить данные таймера
        getTimer(id: number) {
            return this.$store.getters[`timer/findTimer`](id);
        }

        // Добавить таймер
        startTimer(id: number) {
            timeCheck.cfg.checks.push({
                id: id,
                check: () => true,
                action: () => {
                    this.timerProcess(id);
                }
            });

            // обновление
            timeCheck.update();
        }

        // Удаление таймера
        removeStartedTimer(id: number) {
            if (this.issetStartedTimer(id)) {
                timeCheck.cfg.checks.splice(
                    timeCheck.cfg.checks.findIndex((item: Timer) => item.id === id),
                    1
                );

                // обновление
                timeCheck.update();
            }
        }

        // Тумблер
        toggleTimer(id: number) {
            this.timerState(id, !this.issetStartedTimer(id));
        }

        // Смена состояния таймера
        timerState(id: number, state: boolean) {
            state
                ? this.startTimer(id) // Включить таймер
                : this.removeStartedTimer(id); // Отключить таймер

            // Установка активности
            this.changeActivity({id, isActive: state});
        }

        // Открыть окно
        openModal(timerId = null) {
            this.modalTimerId = timerId;
            this.isShowModal = true;
        }

        // Сохранение таймера
        save(data) {
            this.saveTimer(data);
            this.$root.$emit(`closeModal`);
        }
};
</script>
