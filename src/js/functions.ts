import {Callback} from './types/custom'

const moment = require(`moment`);
require(`moment-duration-format`);

/**
 * Генератор ID
 *
 * @export
 * @class IDGenerator
 */
export class IDGenerator {

    length: number;
    timestamp: number;

    constructor() {
        this.length = 8;
        this.timestamp = +new Date();
    }

    /**
     * Получает случайное число из нужного диапазона
     *
     * @private
     * @param {number} min
     * @param {number} max
     * @returns {number}
     * @memberof IDGenerator
     */
    private _getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Создание случайного ID
     *
     * @returns {number}
     * @memberof IDGenerator
     */
    generate(): number {
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

    private _running: boolean;
    private _expected: number;
    private _timeout: number;

    /**
     * Creates an instance of AdjustingInterval.
     * 
     * @param {AdjustingInterval~callback} callback
     * @param {*} interval
     * @param {AdjustingInterval~errorCallback} errorCallback
     * @memberof AdjustingInterval
     */
    constructor(public callback: Callback, public interval: number, public errorCallback?: Callback) {
        this._running = false;
        this._expected = 0;
        this._timeout = 0;
    }

    start(): void {
        this._running = true;
        this._expected = Date.now() + this.interval;
        this._timeout = window.setTimeout(() => this._step(), this.interval);
    }

    stop(): void {
        this._running = false;
        window.clearTimeout(this._timeout);
    }

    private _step(): void {
        let drift = Date.now() - this._expected;
        if (drift > this.interval) {
            if (this.errorCallback) {
                this.errorCallback();
            }
        }

        this.callback();

        if (this._running) {
            this._expected += this.interval;
            this._timeout = window.setTimeout(() => this._step(), Math.max(0, this.interval - drift));
        }
    }
}

/**
 * Преобразовать секунды в массив [час, минута, секунда]
 *
 * @export
 * @param {number} time
 * @returns {number[]}
 */
export function timeStr2Array(time: number): number[] {
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
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 * @returns {number}
 */
export function time2Second(hour: number, minute: number, second: number): number {
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

     * @param {string} [path=``]
     * @memberof TimerSound
     */
    constructor(public path: string = ``) {}

    /**
     * Запуск аудио
     *
     * @param {Number|String} id
     * @memberof TimerSound
     */
    play(id: number): void {
        this.stopAll(() => {
            let el = document.getElementById(`sound-${id}`) as HTMLMediaElement;
            if (el) {
                el.play();
            } else {
                let a = document.createElement(`audio`) as HTMLMediaElement;
                a.src = `${this.path}${id}.mp3`;
                a.volume = 0.75;
                a.setAttribute(`autoplay`, `true`);
                a.setAttribute(`loop`, `true`);
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
    stop(id: number): void {
        let el = document.getElementById(`sound-${id}`) as HTMLMediaElement;
        this._stopSong(el);
    }

    /**
     * Остановка аудио
     *
     * @param {HTMLMediaElement} el
     * @memberof TimerSound
     */
    _stopSong(el: HTMLMediaElement) {
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
    stopAll(fn?: Callback) {
        document.querySelectorAll<HTMLMediaElement>(`audio[id^=sound-]`).forEach((el) => {
            this._stopSong(el);
        });

        if (fn) {
            fn();
        }
    }
}

export default {IDGenerator, AdjustingInterval, timeStr2Array, time2Second, TimerSound};
