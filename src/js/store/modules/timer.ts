/* eslint no-shadow: ["error", { "allow": ["state", "timers", "getters"] }]*/

import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {RootState, Timer, SaveData} from '../../types/store'
import StoreSelector from '../../StoreSelector'
import {IDGenerator, time2Second} from '../../functions'

// initial state
let state: RootState = {

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
const getters: GetterTree<RootState, RootState> = {

    // Получить настройки по умолчанию
    getDefaultParams: (state: RootState) => {
        return state.defaultParams;
    },

    // Поиск таймера
    findTimer: (state: RootState) => (id: number) => {
        return state.timers.find((item) => item.id === id);
    }

};

// actions
const actions: ActionTree<RootState, RootState> = {

    // Обновить пройденное время таймера
    updatePassed({commit, state}, timer: Timer) {
        let newTimers = state.timers.map((item: Timer) => {
            if (item.id === timer.id && timer.passed < item.begin) {
                item.passed = timer.passed + 1;
            }

            return item;
        });

        commit(`updateTimersStore`, newTimers);
    },

    // Смена состояния активности
    changeActivity({commit, state}, {id, isActive}) {
        let newTimers = state.timers.map((item: Timer) => {
            if (item.id === id) {
                item.isActive = isActive;
            }
            return item;
        });

        commit(`updateTimersStore`, newTimers);
    },

    // Сброс пройденного времени
    resetPassed({commit, state}, id: number) {
        let newTimers = state.timers.map((item: Timer) => {
            if (item.id === id) {
                item.passed = 0;
            }
            return item;
        });

        commit(`updateTimersStore`, newTimers);
    },

    // Удаление таймера
    removeTimer({commit, state}, id: number) {
        let newTimers = state.timers.filter((item: Timer) => item.id !== id);

        commit(`updateTimersStore`, newTimers);
    },

    // Сохранение таймера
    saveTimer({commit, state, getters }, data: SaveData) {
        let begin = time2Second(data.hour, data.minute, data.second);
        let timer = getters.findTimer(data.id);
        if (timer) {
            let newTimers = state.timers.map((item: Timer) => {
                if (item.id === data.id) {
                    item.name = data.name;
                    item.song = data.song;
                    item.begin = begin;
                    item.passed = 0; // Сброс пройденного времени
                }
                return item;
            });

            commit(`updateTimersStore`, newTimers);
        } else {
            const generator = new IDGenerator();
            commit(`addTimerStore`, Object.assign(state.defaultParams, {
                id: generator.generate(),
                name: data.name,
                song: data.song,
                begin: begin
            }));
        }
    }

};

// mutations
const mutations: MutationTree<RootState> = {

    // Обновить таймеры
    updateTimersStore(state: RootState, timers: Timer[]) {
        state.timers = timers;

        StoreTimers.set(`timers`, state.timers);
    },

    // Добавить таймер
    addTimerStore(state: RootState, timer: Timer) {
        state.timers.push(timer);

        StoreTimers.set(`timers`, state.timers);
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
