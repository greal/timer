/* eslint no-console: ["error", {allow: ["log"]}]*/

import Vue from 'vue';
import store from './store';
import Timer from './components/TimerComponent';
import Favico from 'favico.js';

// Set the name of the hidden property and the change event for visibility
let hidden;
let visibilityChange;
if (typeof document.hidden !== `undefined`) { // Opera 12.10 and Firefox 18 and later support
    hidden = `hidden`;
    visibilityChange = `visibilitychange`;
} else if (typeof document.msHidden !== `undefined`) {
    hidden = `msHidden`;
    visibilityChange = `msvisibilitychange`;
} else if (typeof document.webkitHidden !== `undefined`) {
    hidden = `webkitHidden`;
    visibilityChange = `webkitvisibilitychange`;
}

// Добавление в иконку уведомление о количестве просроченных таймеров
let faviconBadge = 0;
let favicon = new Favico({
    animation: `fade`
});

const app = new Vue({
    store,
    created() {
        // Уведомление
        this.$root.$on(`addNotify`, () => {
            console.log(`addNotify`);
            faviconBadge++;
            this.handlerNotify();
        });

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === `undefined` || hidden === undefined) {
            console.log(`This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.`);
        } else {
            document.addEventListener(visibilityChange, () => {
                this.handlerNotify();
            }, false);
        }
    },
    methods: {
        handlerNotify() {
            let title = document.getElementsByTagName(`title`);
            if (document[hidden] && faviconBadge) {
                favicon.badge(faviconBadge);
                title.textContent = `Пропущенные уведомления - Таймер`;
            } else if (faviconBadge) {
                faviconBadge = 0;
                favicon.reset();
                title.textContent = `Таймер`;
            }
        }
    },
    data: () => ({
        isShowModal: false
    }),
    render: (h) => h(Timer)
});

app.$mount(`#app`);
