import Vue from 'vue'
// import 'es6-promise/auto'
import Vuex, {StoreOptions} from 'vuex'
import {RootState} from '../types/store'
import timer from './modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        timer
    },
} as StoreOptions<RootState>);
