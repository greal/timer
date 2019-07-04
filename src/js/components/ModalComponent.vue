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
							<input class="AddTimer__input AddTimer__input--name" v-model="name" id="timerName" type="text" maxlength="255">
						</div>
						<div class="Modal__box">
							<label class="AddTimer__label" for="timerSongs">Звук уведомления</label>
							<select v-model.number="songId" class="AddTimer__select" id="timerSongs">
								<option v-for="song in songs" :value="song.id">{{ song.title }}</option>
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

	const moment = require("moment");
	require("moment-duration-format");

	export default {
		name: "ModalComponent",
		props: {
			songs: {
				type: Array,
				required: true
			},
			params: {
				type: Object,
				default: function () {
					return {
						name: '',
						id: null,
						songId: null,
						hour: 0,
						minute: 10,
						second: 0
					}
				}
			}
		},
		created() {

			console.log(this.params);

			if (this.params) {
				const timeFormat = moment
					.duration(this.params.begin, 'seconds')
					.format('hh:mm:ss', { trim: false })
					.split(':')
					.map(Number);

				this.id = this.params.id;
				this.hour = timeFormat[0];
				this.minute = timeFormat[1];
				this.second = timeFormat[2];
				this.songId = !!this.params.song ? this.params.song.id : this.songs[0].id;
				this.name = this.params.name;
			}

		},
		watch: {
			songId() {
				// console.log(value);
				this.$root.$emit('pauseSong');
			}
		},
		data: () => ({
			name: '',
			id: null,
			songId: null,
			hour: 0,
			minute: 0,
			second: 0
		}),
		methods: {
			saveTimer() {
				this.$root.$emit('saveTimer', this.$data);
			},

			closeModal() {
				this.$root.$emit('closeModal');
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
