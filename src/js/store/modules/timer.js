/* eslint no-shadow: ["error", { "allow": ["state", "timers"] }]*/

import StoreSelector from '../../StoreSelector';
import {IDGenerator} from '../../functions';

// initial state
const state = {

    // Таймеры
    timers: [],

    // Параметры по умолчанию
    defaultParams: {
        name: `Таймер №1`,
        song: null,
        isActive: false,
        begin: 600, // Начальное значение секунд
        passed: 0, // Прошло секунд
    },

    // Список звуков уведомлений
    songs: [
        {
            id: 1,
            title: `Songs #1`
        }, {
            id: 2,
            title: `Alarm`
        }, {
            id: 3,
            title: `Дритатушечки`
        }, {
            id: 4,
            title: `Super Mario`
        }, {
            id: 5,
            title: `Roll Up`
        }, {
            id: 6,
            title: `Bitter sweet`
        }, {
            id: 7,
            title: `San Andreas`
        }, {
            id: 8,
            title: `Полиция`
        }, {
            id: 9,
            title: `Dubstep violin`
        }, {
            id: 10,
            title: `Symphonie (remix)`
        }
    ]
};

// Получаем сохраненные таймеры
const StoreTimers = new StoreSelector(`local`);

// Получение сохраненных таймеров
let timers = StoreTimers.get(`timers`, []);

// Установка таймера по умолчанию, если нет таймеров
if (!timers.length) {
    let generator = new IDGenerator();
    timers.push(
        Object.assign(state.defaultParams, {
            id: generator.generate(),
            song: state.songs[0]
        })
    );

    // @TODO - Вынести в commit
    StoreTimers.set(`timers`, timers);
}

// Установка таймеров в state
state = Object.assign(state, {timers});

// getters
const getters = {

    // Поиск таймера
    findTimer: (state) => (id) => {
        return state.timers.find((item) => item.id === id);
    },

};

// actions
const actions = {

    // Обновить пройденное время таймера
    updatePassedTimer({commit, state}, timer) {
        let newTimers = state.timers.map((item) => {
            if (item.id === timer.id && timer.passed <= item.begin) {
                item.passed = timer.passed + 1;
            }

            return item;
        });

        commit(`updateTimersStore`, newTimers);
    },

    // Смена состояния активности
    changeActivity({commit, state}, {id, isActive}) {
        let newTimers = state.timers.map((item) => {
            if (item.id === id) {
                item.isActive = isActive;
            }
            return item;
        });

        commit(`updateTimersStore`, newTimers);
    }

};

// mutations
const mutations = {

    // Обновить таймеры
    updateTimersStore(state, timers) {
        state.timers = timers;

        StoreTimers.set(`timers`, timers);
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
