import Vue from 'vue';
// import 'es6-promise/auto';
import Vuex from 'vuex';
import timer from './modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        timer
    },
});
