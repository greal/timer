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
									<input class="AddTimer__input AddTimer__input--time" id="timerHours" type="number" value="0" min="0" max="99">
								</div>
								<div class="AddTimer__col">
									<label class="AddTimer__label" for="timerMinutes">Минуты</label>
									<input class="AddTimer__input AddTimer__input--time" id="timerMinutes" type="number" value="0" min="0" max="59">
								</div>
								<div class="AddTimer__col">
									<label class="AddTimer__label" for="timerSeconds">Секунды</label>
									<input class="AddTimer__input AddTimer__input--time" id="timerSeconds" type="number" value="0" min="0" max="59">
								</div>
							</div>
						</div>
						<div class="Modal__box">
							<label class="AddTimer__label" for="timerName">Название</label>
							<input class="AddTimer__input AddTimer__input--name" v-model="name" id="timerName" type="text" maxlength="255">
						</div>
						<div class="Modal__box">
							<label class="AddTimer__label" for="timerSongs">Звук уведомления</label>
							<select v-model="songId" class="AddTimer__select" id="timerSongs">
								<option v-for="song in songs" :value="song.id">{{ song.title }}</option>
							</select>
							<span class="BtnAudio">
								<input @change="listenSong" type="checkbox" value="1" id="BtnAudio" name="listenAudio">
								<label for="BtnAudio">Прослушать</label>
							</span>
						</div>
					</div>
					<div class="Modal__controls">
						<button class="Btn Btn--default">Сохранить</button>
						<button @click.prevent="closeModal" class="Btn Btn--link">Отменить</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "ModalComponent",
		props: {
			songs: {
				type: Array,
				required: true
			},
			params: {
				type: Object,
				required: true
			}
		},
		created() {
			// this.params.song;
		},
		watch: {
			songId() {
				// console.log(value);
				this.$root.$emit('pauseSong');
			}
		},
		data: () => ({
			name: 'Таймер №1',
			songId: null,
			isActive: false,
			begin: 600, // Начальное значение секунд
			passed: 0, // Прошло секунд
		}),
		methods: {
			closeModal() {
				this.$root.$emit('closeModal')
			},
			listenSong(e) {
				// console.log(e.target.checked);

				this.$root.$emit('listenSong', {
					isPlay: e.target.checked,
					songId: this.songId
				});
			}
		}
	}
</script>
