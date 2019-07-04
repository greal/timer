<template>
	<div class="Timer">
		<timer-item v-if="timers.length" v-for="item in timers" :key="item.id" :params="item"></timer-item>
		<div v-else class="Timer__item">
			<div class="Timer__empty">У вас нет ни одного таймера!</div>
		</div>
		<div class="Timer__footer">
			<a @click.prevent="openModal()" class="Btn Btn--default js-Modal-add" href="#"><span class="Icon Icon--add"></span> Добавить таймер</a>
		</div>
		<modal v-show="isShowModal" :songs="songs" :params="modalParams"></modal>
	</div>
</template>

<script>
	import { IDGenerator } from '../functions';
	import Modal from './ModalComponent';
	import TimerItem from './TimerItemComponent';

	export default {
		name: "TimerComponent",
		components: { TimerItem, Modal },
		created() {
			// Сохранить таймер
			this.$root.$on('saveTimer', (data) => {
				this.add(data);
			});

			// Закрыть окно
			this.$root.$on('closeModal', () => {
				this.isShowModal = false
			});

			// Прослушать звук
			this.$root.$on('listenSong', payload => {
				console.log(payload);
			});

			// Остановить прослушивание
			this.$root.$on('pauseSong', () => {
				// console.log(payload);
			});

			// Удалить таймер
			this.$root.$on('removeTimer', () => {
				// console.log(payload);
			});

			// Получаем сохраненные таймеры
			this.timers = this.$root.$store.get('timers', []);

			// Установка таймера по умолчанию, если нет таймеров
			if (!this.timers.length) {
				let generator = new IDGenerator();
				this.$root.$store.set('timers', [
					Object.assign(this.defaultParams, {
						id: generator.generate(),
						song: this.songs[0]
					})
				]);
			}
		},
		data: () => ({
			// Показать модальное окно
			isShowModal: false,

			songs: [{
				id: 1,
				title: 'Songs #1'
			},{
				id: 2,
				title: 'Alarm'
			},{
				id: 3,
				title: 'Дритатушечки'
			},{
				id: 4,
				title: 'Super Mario'
			},{
				id: 5,
				title: 'Roll Up'
			},{
				id: 6,
				title: 'Bitter sweet'
			},{
				id: 7,
				title: 'San Andreas'
			},{
				id: 8,
				title: 'Полиция'
			},{
				id: 9,
				title: 'Dubstep violin'
			},{
				id: 10,
				title: 'Symphonie (remix)'
			}],

			// Параметры по умолчанию
			defaultParams: {
				name: 'Таймер №1',
				song: null,
				isActive: false,
				begin: 600, // Начальное значение секунд
				passed: 0, // Прошло секунд
			},

			modalParams: null,


			timers: []
		}),
		methods: {

			openModal(params) {
				console.log(params);
				this.isShowModal = true;
				this.modalParams = !!params ? params : this.defaultParams;
			},

			add(data) {
				console.log(data);
			}
		}
	}
</script>

<style scoped>

</style>
