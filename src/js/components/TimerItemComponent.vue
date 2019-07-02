<template>
	<div class="Timer__item" data-id="${id}">
		<div class="Timer__row">
			<div class="Timer__counter js-Timer-counter" v-text="counter"></div>
			<div class="Timer__controls">
				<button @click="toggle" class="Btn Btn--green">Старт</button>
				<button @click="reset" class="Btn Btn--default" disabled>Сброс</button>
			</div>
		</div>
		<div class="Timer__row Timer__row--info">
			<span class="Timer__name" v-text="name"></span>
			<span class="Timer__value" v-text="begin"></span>
			<span class="BtnAudio">
				<input class="js-Timer-song" type="checkbox" value="${songId}" id="AudioCheck-${songId}" name="audioCheck_${songId}">
				<label for="AudioCheck-${songId}">{{ song.title }}</label>
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
			<div class="Timer__progress">
				<div>(не запущено)</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { AdjustingInterval } from '../functions';

	export default {
		name: "TimerItemComponent",
		created() {
			this.counter = '00:00:00';
			this.begin = '00:00:00';
			this.name = this.params.name;
			this.song = this.params.song;
		},
		props: {
			params: {
				type: Object,
				required: true
			}
		},
		data: () => ({
			counter: '--:--:--',
			begin: '--:--:--',
			name: '',
			song: null,
		}),
		methods: {
			edit() {},
			remove() {},
			toggle() {},
			reset() {},
		}
	};
</script>
