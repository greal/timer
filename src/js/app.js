import Vue from 'vue';
import Timer from './components/TimerComponent';
import StoreSelector from './plugins/StoreSelector';

Vue.use(StoreSelector);

new Vue({
	el: '#app',
	data: () => ({
		isShowModal: false
	}),
	render: h => h(Timer)
});
