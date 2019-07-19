/**
 * Реакция на определённое время
 */

interface Checks {

    // Id таймера
    id?: number,

    // если check вернёт true
    // сработает action
    // date — объект текущего времени
    check: (date?: Date) => boolean,

    // Обработчик
    action: () => void
}

interface Config {

    // true - выполнять бесконечно, false - только один раз
    infinity: boolean, 

    // если эта функция вернёт true, проверки сбросятся в исходное состояние
    // dateOld — объект даты прошлой проверки
    // dateNew — объект даты текущей проверки
    updateCheck: (dateOld?: Date, date?: Date) => boolean,

    // массив проверок
    checks: Checks[]
}

// полнейшее клонирование объекта
// http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
function clone(obj: any): any {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== `object`) {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());

        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }

        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }

        return copy;
    }

    throw new Error(`Unable to copy obj! Its type isn't supported.`);
}

export default class {

    cfg: Config
    cfgTmp: Config
    dateOld: Date

    constructor(cfg: Config = {
        // Бесконечно выполнять
        infinity: true,

        // если эта функция вернёт true, проверки сбросятся в исходное состояние
        updateCheck: () => false,

        // Массив с проверками
        checks: []
    }) {
        this.cfg = this.cfgTmp = this.config(cfg);
        this.dateOld = this.getDate(); // дата предыдущей проверки
    }

    // получение и установка настроек
    config(cfg: Config): Config {
        this.cfg = clone(cfg); // кеш настроек
        this.cfgTmp = clone(cfg); // настройки, с которыми работаем

        return this.cfg;
    }

    // обновление проверок
    update(): void {
        this.cfgTmp = clone(this.cfg);
    }

    // получение даты
    getDate(): Date {
        return new Date();
    }

    check(): void {
        if (!this.cfg) {
            return;
        }

        let date = this.getDate();

        if (this.cfg.updateCheck(this.dateOld, date)) {
            this.update();
        }

        this.cfgTmp.checks.forEach((item: Checks, i: number) => {
            if (item.check(date)) {
                item.action();

                // Нужно ли выполнять бесконечно
                if (!this.cfg.infinity) {
                    this.cfgTmp.checks.splice(i, 1);
                }
            }
        });

        this.dateOld = this.getDate();
    }
}
