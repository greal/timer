
/**
 * localStorage - не имеют срока годности
 * sessionStorage - очищаются по окончании сеанса страницы, то есть при закрытии страницы.
 *
 * @export
 * @class StoreSelector
 */
export default class StoreSelector {

    constructor(type = `local`) {
        if (type === `local`) { // localStorage
            this.storage = localStorage;
        } else if (type === `session`) { // sessionStorage
            this.storage = sessionStorage;
        } else {
            throw new Error(`Не верно указан тип хранения данных.`);
        }
    }


    /**
     * Подготовка значения
     *
     * @param {*} value
     * @return {String}
     * @memberof StoreSelector
     */
    _serialize(value) {
        return JSON.stringify(value);
    }


    /**
     * Получение значения
     *
     * @param {*} value
     * @param {*} defaultValue
     * @return {*}
     * @memberof StoreSelector
     */
    _unserialize(value, defaultValue) {
        if (!value && !!defaultValue) {
            return defaultValue;
        }

        let val = ``;
        try {
            val = JSON.parse(value);
        } catch (e) {
            val = value;
        }

        return val !== undefined ? val : defaultValue;
    }


    /**
     * Чтение
     *
     * @param {String} key Ключ
     * @param {*} defaultOptionalValue Значение по умолчанию
     * @return {*}
     * @memberof StoreSelector
     */
    get(key, defaultOptionalValue) {
        const value = this.storage.getItem(key);

        return this._unserialize(value, defaultOptionalValue);
    }


    /**
     * Запись
     *
     * @param {String} key Ключ
     * @param {*} value Значение
     * @return {*}
     * @memberof StoreSelector
     */
    set(key, value) {
        this.storage.setItem(key, this._serialize(value));

        return value;
    }


    /**
     * Удаление записи
     *
     * @param {String} key
     * @memberof StoreSelector
     */
    remove(key) {
        this.storage.removeItem(key);
    }


    /**
     * Очистка хранилища
     *
     * @memberof StoreSelector
     */
    clear() {
        this.storage.clear();
    }

}
