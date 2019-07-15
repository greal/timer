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
 * Преобразовать секунды в 00:00:00
 *
 * @export
 * @param {Number} seconds
 * @return {String}
 */
export function timeSecond2Human(seconds) {
    let duration = moment.duration(seconds, `seconds`);
    return duration.format(`hh:mm:ss`, {trim: false});
}


export default {IDGenerator, AdjustingInterval, timeStr2Array, timeSecond2Human};
