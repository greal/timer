/* eslint no-console: ["error", {allow: ["log"]}]*/

import Vue, { CreateElement, VNode } from 'vue';
import store from './store';
import {formatSecond2Human} from './filters/formatSecond2Human';
import Timer from './components/TimerComponent.vue';
const Favico = require('favico.js');

Vue.filter('formatSecond2Human', formatSecond2Human);

declare global {
    interface Document {
        readonly msHidden: boolean;
        readonly webkitHidden: boolean;
    }
}

// Set the name of the hidden property and the change event for visibility
let hidden: string;
let visibilityChange: string;
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
            const title = document.getElementsByTagName(`title`)[0] as HTMLTitleElement;
            if (Object.prototype.hasOwnProperty.call(document, hidden) && faviconBadge) {
                favicon.badge(faviconBadge);
                title.text = `Пропущенные уведомления - Таймер`;
            } else if (faviconBadge) {
                faviconBadge = 0;
                favicon.reset();
                title.text = `Таймер`;
            }
        }
    },
    data: () => ({
        isShowModal: false
    }),
    render: (h: CreateElement): VNode => h(Timer)
});

app.$mount(`#app`);
