<template>
	<div class="Timer__item">
		<div class="Timer__row">
			<div class="Timer__counter js-Timer-counter" v-text="counter"></div>
			<div class="Timer__controls">
				<button @click="toggle" class="Btn Btn--green">Старт</button>
				<button @click="reset" class="Btn Btn--default" disabled>Сброс</button>
			</div>
		</div>
		<div class="Timer__row Timer__row--info">
			<span class="Timer__name" v-text="name"></span>
			<span class="Timer__value" v-text="counterDyn"></span>
			<span class="BtnAudio">
				<input v-model="song.id" type="checkbox" :id="`AudioCheck-${song.id}`" :name="`audioCheck_${song.id}`">
				<label :for="`AudioCheck-${song.id}`">{{ song.title }}</label>
			</span>
			<button @click="edit($data)" class="Btn Btn--link Btn--edit">
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
	// import { AdjustingInterval } from '../functions';
	import { timeSecond2Human } from '../functions';

	export default {
		name: "TimerItemComponent",
		created() {
			this.counter = timeSecond2Human(this.params.begin);
			this.begin = this.params.begin;
			this.id = this.params.id;
			this.name = this.params.name;
			this.song = this.params.song;
		},
		props: {
			params: Object
		},
		computed: {
			counterDyn: function () {
				return this.counter;
			}
		},
		data: () => ({
			counter: '--:--:--',
			begin: 0,
			id: null,
			name: '',
			song: null,
		}),
		methods: {
			edit(data) {
				this.$root.$emit('openModal', data);
			},
			remove() {
				if (confirm('Вы действительно хотите удалить таймер?')) {
					this.$root.$emit('removeTimer', this.id);
				}
			},
			toggle() {
				this.$root.$emit('toggleTimer', this.id);
			},
			reset() {},
		}
	};
</script>
