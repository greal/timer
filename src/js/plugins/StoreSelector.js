/**
 * localStorage - не имеют срока годности
 * sessionStorage - очищаются по окончании сеанса страницы, то есть при закрытии страницы.
 */

export default {
	install(Vue, opts) {

		const optionsDefaults = {
			type: 'local'
		};
		const options = { ...optionsDefaults, ...opts };

		/**
		 * Подготовка занчения
		 * @param value
		 * @returns {string}
		 * @private
		 */
		const _serialize = function(value) {
			return JSON.stringify(value);
		};

		/**
		 * Получение значения
		 * @param value
		 * @param defaultValue
		 * @returns {*}
		 * @private
		 */
		const _unserialize = function(value, defaultValue) {
			if (!value && !!defaultValue) return defaultValue;
			var val = '';
			try {
				val = JSON.parse(value);
			} catch (e) {
				val = value;
			}
			return val !== undefined ? val : defaultValue;
		};

		let storage;
		switch (options.type) {
			// localStorage
			case 'local':
				storage = localStorage;
				break;
			// sessionStorage
			case 'session':
				storage = sessionStorage;
				break;
		}

		if (!storage) {
			console.error('Не верно указан тип хранения данных.');
			return;
		}

		Vue.prototype.$store = {

			/**
			 * Чтение
			 * @param key Ключ
			 * @param defaultOptionalValue Значение по умолчанию
			 * @returns {*}
			 */
			get: (key, defaultOptionalValue) => {
				const value = storage.getItem(key);
				return _unserialize(value, defaultOptionalValue);
			},

			/**
			 * Запись
			 * @param key Ключ
			 * @param value Значение
			 * @returns {*}
			 */
			set: (key, value) => {
				storage.setItem(key, _serialize(value));
				return value;
			},

			/**
			 * Удаление записи
			 * @param key Ключ
			 */
			remove: (key) => {
				storage.removeItem(key);
			},

			/**
			 * Очистка хранилища
			 */
			clear: () => {
				storage.clear();
			}
		};
	}
};
