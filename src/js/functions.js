const moment = require(`moment`);
require(`moment-duration-format`);


/**
 * Генератор Id
 *
 * @export
 * @class IDGenerator
 */
export class IDGenerator {
    constructor() {
        this.length = 8;
        this.timestamp = +new Date();
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generate() {
        let ts = this.timestamp.toString();
        let parts = ts.split(``).reverse();
        let id = ``;
        for (let i = 0; i < this.length; ++i) {
            let index = this._getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return Number(id);
    }
}


/**
 * Саморегулирующийся интервал для учета дрейфа
 *
 * @export
 * @class AdjustingInterval
 */
export class AdjustingInterval {

    /**
     * Creates an instance of AdjustingInterval.
     * @param {AdjustingInterval~callback} callback
     * @param {*} interval
     * @param {AdjustingInterval~errorCallback} [errorCallback=null]
     * @memberof AdjustingInterval
     */
    constructor(callback, interval, errorCallback = null) {
        this.running = false;
        this.interval = interval;
        this.callback = callback;
        this.errorCallback = errorCallback;
    }

    start() {
        this.running = true;
        this.expected = Date.now() + this.interval;
        this.timeout = setTimeout(() => this._step(), this.interval);
    }

    stop() {
        this.running = false;
        clearTimeout(this.timeout);
    }

    _step() {
        let drift = Date.now() - this.expected;
        if (drift > this.interval) {
            if (this.errorCallback) {
                this.errorCallback();
            }
        }

        this.callback();

        if (this.running) {
            this.expected += this.interval;
            this.timeout = setTimeout(() => this._step(), Math.max(0, this.interval - drift));
        }
    }
}


/**
 * Преобразовать секунды в массив [час, минута, секунда]
 *
 * @export
 * @param {Number} time
 * @return {Array}
 */
export function timeStr2Array(time) {
    return moment
        .duration(time, `seconds`)
        .format(`hh:mm:ss`, {trim: false})
        .split(`:`)
        .map(Number);
}


/**
 * Преобразовать время в секунды
 *
 * @export
 * @param {Number} hour
 * @param {Number} minute
 * @param {Number} second
 * @return {Number}
 */
export function time2Second(hour, minute, second) {
    let begin = moment.duration({ 
        hours: hour, 
        minutes: minute, 
        seconds: second 
    }).asSeconds();

    return begin;
}


/**
 * Управление аудио
 *
 * @export
 * @class TimerSound
 */
export class TimerSound {

    /**
     * Creates an instance of TimerSound.
     * @param {String} [path='']
     * @memberof TimerSound
     */
    constructor(path = '') {
        this.path = path;
    }

    /**
     * Запуск аудио
     *
     * @param {Number|String} id
     * @memberof TimerSound
     */
    play(id) {
        this.stopAll(() => {
            let el = document.getElementById(`sound-${id}`);
            if (el) {
                el.play();
            } else {
                let a = document.createElement(`audio`);
                a.src = `${this.path}${id}.mp3`;
                a.volume = 0.75;
                a.setAttribute(`autoplay`, true);
                a.setAttribute(`loop`, true);
                a.setAttribute(`id`, `sound-${id}`);
                document.body.appendChild(a);
            }
        });
    }

    
    /**
     * Остановка аудио
     *
     * @param {Number|String} id
     * @memberof TimerSound
     */
    stop(id) {
        let sound = document.getElementById(`sound-${id}`);
        this._stopSong(sound);
    }


    /**
     * Остановка аудио
     *
     * @param {HTMLElement|null} el
     * @memberof TimerSound
     */
    _stopSong(el) {
        if (el && el.duration > 0 && !el.paused) {
            el.pause();
            el.currentTime = 0;
        }
    }


    /**
     * Остановка всех аудио
     *
     * @param {TimerSound~callback} fn
     * @memberof TimerSound
     */
    stopAll(fn) {
        let sounds = document.querySelectorAll(`audio[id^=sound-]`);
        sounds = [].slice.call(sounds); // IE
        sounds.forEach((sound) => {
            this._stopSong(sound);
        });

        if (fn) {
            fn();
        }
    }
}

export default {IDGenerator, AdjustingInterval, timeStr2Array, time2Second, TimerSound};
