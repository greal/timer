/**
 * Реакция на определённое время
 * @param {object} cfg объект с настройками
 * {
 *
 * infinity - boolean, true - выполнять бесконечно, false - только один раз

	// если эта функция вернёт true,
	// проверки сбросятся в исходное состояние
	// dateOld — объект даты прошлой проверки
	// dateNew — объект даты текущей проверки
	renewCheck: function (dateOld, dateNew) {},

	// массив проверок
	checks: [
		{

			// если check вернёт true
			// сработает action
			// date — объект текущего времени
			check: function (date) {},
			action: function () {}
		}
	]
}
 */

// полнейшее клонирование объекта
// http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
function clone(obj) {
    let copy;

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
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }

        return copy;
    }

    throw new Error(`Unable to copy obj! Its type isn't supported.`);
}

export default class {
    constructor(cfg = {
        // Бесконечно выполнять
        infinity: true,

        // если эта функция вернёт true, проверки сбросятся в исходное состояние
        renewCheck() {
            return false;
        },

        // Массив с проверками
        checks: []
    }) {
        this.config(cfg);
        this.dateOld = new Date(); // дата предыдущей проверки

        return this;
    }

    // получение и установка настроек
    config(cfg = null) {
        if (cfg) {
            this.cfg = clone(cfg); // кеш настроек
            this.cfgTmp = clone(cfg); // настройки, с которыми работаем
        }

        return this.cfg;
    }

    // обновление проверок
    renew() {
        this.cfgTmp = clone(this.cfg);
    }

    // получение даты
    getDate() {
        return new Date();
    }

    check() {
        if (!this.cfg) {
            return;
        }

        let that = this;
        let date = this.getDate();

        if (this.cfg.renewCheck(this.dateOld, date)) {
            this.renew();
        }

        this.cfgTmp.checks.forEach(function (item, i) {
            if (item.check(date)) {
                item.action();

                // Нужно ли выполнять бесконечно
                if (!that.cfg.infinity) {
                    that.cfgTmp.checks.splice(i, 1);
                }
            }
        });

        this.dateOld = new Date();
    }
}
