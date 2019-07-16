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

<script>
import {mapState, mapActions} from "vuex";
import {AdjustingInterval, TimerSound} from "../functions";
import timeChecker from "../timeChecker";
import Modal from "./ModalComponent";
import TimerItem from "./TimerItemComponent";

const timeCheck = new timeChecker();
const timerInstance = new AdjustingInterval(() => {
    timeCheck.check();
}, 1000, () => {
    console.warn(`The drift exceeded the interval.`);
});

const timerSound = new TimerSound('../audio/');

export default {
    name: `TimerComponent`,
    components: {
        TimerItem,
        Modal
    },
    created() {
        // Запуск общего таймера
        timerInstance.start();

        // Сохранить таймер
        this.$root.$on(`saveTimer`, (data) => {
            this.save(data);
        });

        // Открыть окно
        this.$root.$on(`openModal`, (timerId) => {
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

        // Вкл./Выкл. таймер
        this.$root.$on(`toggleTimer`, (id) => {
            this.toggleTimer(id);
            this.stopSoundTimer(id);
        });

        // Удалить таймер
        this.$root.$on(`removeTimer`, (id) => {
            if (this.issetStartedTimer(id)) {
                this.removeStartedTimer(id);
            }
            this.stopSoundTimer(id);
            this.removeTimer(id);            
        });

        // Сброс таймера
        this.$root.$on(`resetTimer`, (id) => {
            this.timerState(id, false);
            this.resetPassed(id);
            this.stopSoundTimer(id);
        });

        // Если страница была перезагружена
        let that = this;
        this.timers
            .filter((timer) => timer.isActive === true)
            .forEach((timer) => {
                that.timerState(timer.id, true);

                console.log(`Reloaded: `, timer);
            });
    },
    computed: mapState({
        timers: (state) => state.timer.timers
    }),
    data: () => ({
        // Показать модальное окно
        isShowModal: false,
        modalTimerId: null
    }),
    methods: {
        ...mapActions({
            changeActivity: `timer/changeActivity`,
            resetPassed: `timer/resetPassed`,
            updatePassed: `timer/updatePassed`,
            saveTimer: `timer/saveTimer`,
            removeTimer: `timer/removeTimer`
        }),

        // Выключение мелодии
        stopSoundTimer(id) {
            let timer = this.getTimer(id);
            timerSound.stop(timer.song.id);
        },

        // Поиск запущенного таймера
        issetStartedTimer(id) {
            return timeCheck.cfg.checks.findIndex((item) => item.id === id) !== -1;
        },

        // Процесс выполнения таймера
        timerProcess(id) {
            // Поиск таймера
            let timer = this.getTimer(id);

            // Обновить пройденное время таймера
            this.updatePassed(timer);
        },

        // Получить данные таймера
        getTimer(id) {
            return this.$store.getters[`timer/findTimer`](id);
        },

        // Добавить таймер
        startTimer(id) {
            let that = this;
            timeCheck.cfg.checks.push({
                id: id,
                check: () => true,
                action: () => {
                    that.timerProcess(id);
                }
            });

            // обновление
            timeCheck.update();
        },

        // Удаление таймера
        removeStartedTimer(id) {
            timeCheck.cfg.checks.splice(
                timeCheck.cfg.checks.findIndex((item) => item.id === id),
                1
            );

            // обновление
            timeCheck.update();
        },

        toggleTimer(id) {
            let isIssetTimer = this.issetStartedTimer(id);

            this.timerState(id, !isIssetTimer);
        },

        // Смена состояния таймера
        timerState(id, state) {
            // Установка активности
            this.changeActivity({id, isActive: state});

            state
                ? this.startTimer(id) // Включить таймер
                : this.removeStartedTimer(id); // Отключить таймер
        },

        // Открыть окно
        openModal(timerId = null) {
            this.modalTimerId = timerId;
            this.isShowModal = true;
        },

        // Сохранение таймера
        save(data) {
            this.saveTimer(data);
            this.$root.$emit(`closeModal`);
        }
    }
};
</script>
