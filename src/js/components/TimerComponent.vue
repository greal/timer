<template>
	<div class="Timer">
		<template v-if="timers.length">
			<timer-item v-for="item in timers" :key="item.id" :timer-id="item.id"></timer-item>
		</template>
		<div v-else class="Timer__item">
			<div class="Timer__empty">У вас нет ни одного таймера!</div>
		</div>
		<div class="Timer__footer">
			<a @click.prevent="openModal()" class="Btn Btn--default js-Modal-add" href="#"><span class="Icon Icon--add"></span> Добавить таймер</a>
		</div>
		<modal v-show="isShowModal" :timerId="modalTimerId"></modal>
	</div>
</template>

<script>

	import { mapState, mapActions } from 'vuex'

	import { AdjustingInterval } from '../functions';
	import timeChecker from '../timeChecker';
	import Modal from './ModalComponent';
	import TimerItem from './TimerItemComponent';

	const timeCheck = new timeChecker();
	const timerInstance = new AdjustingInterval(() => {
		timeCheck.check()
	}, 1000, () => {
		console.warn('The drift exceeded the interval.');
	});

	export default {
		name: "TimerComponent",
		components: {
			TimerItem,
			Modal
		},
		created() {

			// Запуск общего таймера
			timerInstance.start();

			// Сохранить таймер
			this.$root.$on('saveTimer', (data) => {
				this.add(data);
			});

			// Открыть окно
			this.$root.$on('openModal', timerId => {
				this.openModal(timerId);
			});

			// Закрыть окно
			this.$root.$on('closeModal', () => {
				this.isShowModal = false
			});

			// Прослушать звук
			this.$root.$on('playSong', payload => {
				console.log(payload);
			});

			// Вкл./Выкл. таймер
			this.$root.$on('toggleTimer', id => {
				this.toggleTimer(id);
			});

			// Удалить таймер
			this.$root.$on('removeTimer', () => {
				// console.log(payload);
			});

			// Если страница была перезагружена
			this.timers.filter(timer => timer.isActive === true).forEach(function (timer) {
				// timerState(timer.id, true);

				console.log('Reloaded: ', timer);
			});

		},

		computed: mapState({
			timers: state => state.timer.timers,
		}),

		data: () => ({
			// Показать модальное окно
			isShowModal: false,

			modalTimerId: null
		}),

		methods: {

			...mapActions({
				changeActivity: 'timer/changeActivity',
				updatePassedTimer: 'timer/updatePassedTimer',
			}),

			// Поиск запущенного таймера
			issetStartedTimer(id) {
				return timeCheck.cfg.checks.findIndex(item => item.id === id) !== -1;
			},

			// Процесс выполнения таймера
			timerProcess(id) {

				// Поиск таймера
				let timer = this.$store.getters['timer/findTimer'](id);

				// Обновить пройденное время таймера
				this.updatePassedTimer(timer);

				console.log(id);

				// Прогресс бар
				//var timeLeft = progressTimer(timer);
				//if (timeLeft <= 0) {

					// var timerItem = $('.Timer__item[data-id="' + timer.id + '"]');

					// Включить уведомление
					// timerItem
					// 	.find('.js-Timer-song')
					// 	.prop('checked', true)
					// 	.change();

					// Добавить уведомление в favicon и title
					// faviconBadge++;
					// handlerNotify();

					// Цвет просрочки
					// timerItem.addClass('Timer__item--overdue');

					// Остановить таймер
					// timerState(timer.id, false);
				//}
			},

			toggleTimer(id) {
				let that = this;
				const isIssetTimer = that.issetStartedTimer(id);

				// Установка активности
				that.changeActivity({ id, isActive: !isIssetTimer });

				// Включить таймер
				if (!isIssetTimer) {

					// Добавление таймера
					timeCheck.cfg.checks.push({
						id: id,
						check: () => true,
						action: () => {
							that.timerProcess(id);
							// console.log(timeCheck.cfg.checks, id);
						}
					});

					// обновление
					timeCheck.renew();
				}

				// Отключить таймер
				else {

					// Удаление таймера
					timeCheck.cfg.checks.splice(timeCheck.cfg.checks.findIndex(item =>item.id === id), 1);

					// обновление
					timeCheck.renew();
				}
			},

			// Смена состояния таймера
			timerState(id, state) {

				// Управление таймером
				// state
				// 	? storeTimer.start(id)
				// 	: storeTimer.stop(id);

				let timers = this.$root.$store.get('timers', []);
				timers.map((item) => {
					if (item.id === id) {
						item.isActive = state;
					}
					return item;
				});
				this.$root.$store.set('timers', timers);

				// Смена состояния кнопки
				// actionBtnState(id, state);
			},

			// Открыть окно
			openModal(timerId = null) {
				this.modalTimerId = timerId;
				this.isShowModal = true;
			},



			add(data) {
				console.log(data);
			}
		}
	}
</script>
