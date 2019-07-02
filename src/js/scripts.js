// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}

$(document).ready(function () {

	// Добавляем хранилище
	var store = StoreSelector('local');

	// Мелодии
	var songs = [{
		id: 1,
		title: 'Songs #1'
	},{
		id: 2,
		title: 'Alarm'
	},{
		id: 3,
		title: 'Дритатушечки'
	},{
		id: 4,
		title: 'Super Mario'
	},{
		id: 5,
		title: 'Roll Up'
	},{
		id: 6,
		title: 'Bitter sweet'
	},{
		id: 7,
		title: 'San Andreas'
	},{
		id: 8,
		title: 'Полиция'
	},{
		id: 9,
		title: 'Dubstep violin'
	},{
		id: 10,
		title: 'Symphonie (remix)'
	}];

	// Параметры по умолчанию
	var defaultParams = {
		name: 'Таймер №1',
		songId: songs[0].id,
		isActive: false,
		begin: 600, // Начальное значение секунд
		passed: 0, // Прошло секунд
	};

	// Установка таймера по умолчанию
	if (!store.get('timers', []).length) {
		var generator = new IDGenerator();
		var storeDefault = [
			$.extend(defaultParams, {
				id: generator.generate()
			})
		];

		store.set('timers', storeDefault);
	}

	// Добавление в иконку уведомление о количестве просроченных таймеров
	var faviconBadge = 0;
	var favicon = new Favico({
		animation: 'fade'
	});

	// Обработчик уведомлений в title и favicon
	var handlerNotify = function () {
		if (document[hidden] && faviconBadge) {
			favicon.badge(faviconBadge);
			$('title').text('Пропущенные уведомления - Таймер');
		} else if (faviconBadge) {
			faviconBadge = 0;
			favicon.reset();
			$('title').text('Таймер');
		}
	};

	// Warn if the browser doesn't support addEventListener or the Page Visibility API
	if (typeof document.addEventListener === "undefined" || hidden === undefined) {
		console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
	} else {
		document.addEventListener(visibilityChange, handlerNotify, false);
	}

	// Управление аудио
	var timerAlert = {
		start: function (id) {
			this.stopAll(function () {
				if (document.getElementById('song' + id)) {
					document.getElementById('song' + id).play();
				} else {
					var a = document.createElement('audio');
					a.src = '/audio/' + id + '.mp3';
					a.volume = .75;
					a.setAttribute('autoplay', true);
					a.setAttribute('loop', true);
					a.setAttribute('id', 'song' + id);
					document.body.appendChild(a);
				}
			});
		},
		stop: function (id) {
			var song = document.getElementById('song' + id);
			if (song && song.duration > 0 && !song.paused) {
				song.pause();
				song.currentTime = 0;
			}
		},
		stopAll: function (fn) {
			var songs = document.querySelectorAll('audio[id^=song]');
			songs = [].slice.call(songs); // IE
			songs.forEach(function (song) {
				if (song.duration > 0 && !song.paused) {
					song.pause();
					song.currentTime = 0;

					var songId = /[\d]+/g.exec(song.getAttribute('id'));
					$('.js-Timer-song[value=' + songId + ']').prop('checked', false);
				}
			});

			fn();
		}
	};

	// Сформировать счетчик
	var humanTimer = function (seconds) {
		var duration = moment.duration(seconds, 'seconds');
		var formatted = duration.format('hh:mm:ss', {
			trim: false
		});
		return formatted;
	};

	// Поиск нужного таймера в store
	var findTimer = function(id) {
		var timers = store.get('timers', []);
		var timer = timers.filter(function (item) {
			return id === item.id;
		});
		return timer[0] || null;
	};

	// Прогресс таймера
	var progressTimer = function (timer) {
		var timerItem = $('.Timer__item[data-id="' + timer.id + '"]');
		var progressBar = timerItem.find('.js-Timer-progress');
		var timeLeft = timer.begin - timer.passed;
		if (timer.passed) {
			var beginPercent = timer.begin / 100;
			var passedPercent = Math.floor(timer.passed / beginPercent);
			var progressValue = 100 - passedPercent;
			progressBar.find('div').css('width', progressValue + '%').text(progressValue + '%');

			// Скрыть текст
			progressValue < 5
				? progressBar.addClass('Timer__progress--textHide')
				: progressBar.removeClass('Timer__progress--textHide');
		} else {
			progressBar.find('div').css('width', '100%').text('(не запущено)');
		}

		if (progressValue <= 10) {
			progressBar.addClass('Timer__progress--alert');
		} else if (progressBar.hasClass('Timer__progress--alert')) {
			progressBar.removeClass('Timer__progress--alert');
		}

		// Активность кнопки сброса
		timerItem.find('.js-Timer-reset').prop('disabled', timer.passed <= 0);

		// Активность кнопки старт/стоп
		timerItem.find('.js-Timer-toggle').prop('disabled', timeLeft <= 0);

		// Цвет просрочки
		if (timeLeft <= 0) {
			timerItem.addClass('Timer__item--overdue');
		}

		// Пройденное время
		var countTimer = humanTimer(timeLeft >= 0 ? timeLeft : 0);
		timerItem.find('.js-Timer-counter').html(countTimer);

		return timeLeft;
	};

	// Обновить пройденное время таймера в store
	var updatePassedTimer = function (timer) {
		var timers = store.get('timers', []);
		timers.map(function (item) {
			if (item.id === timer.id && timer.passed <= item.begin) {
				item.passed = timer.passed + 1;
			}
			return item;
		});
		store.set('timers', timers);
	};

	// Управление таймерами
	var storeTimer = {
		timers: [],
		isset: function(id) {
			return (id in this.timers);
		},
		start: function (id) {
			if (!this.isset(id)) {
				this.timers[id] = new AdjustingInterval(timerProcess, id, 1000, function() {
					console.warn('The drift exceeded the interval.');
				});
			}
			this.timers[id].start();
		},
		stop: function (id) {
			this.isset(id) && this.timers[id].stop();
		}
	};

	// Процесс выполнения таймера
	var timerProcess = function (id) {

		var timer = findTimer(id);

		// Обновить таймер в store
		updatePassedTimer(timer);

		// Прогресс бар
		var timeLeft = progressTimer(timer);
		if (timeLeft <= 0) {

			var timerItem = $('.Timer__item[data-id="' + timer.id + '"]');

			// Включить уведомление
			timerItem
				.find('.js-Timer-song')
				.prop('checked', true)
				.change();

			// Добавить уведомление в favicon и title
			faviconBadge++;
			handlerNotify();

			// Цвет просрочки
			timerItem.addClass('Timer__item--overdue');

			// Остановить таймер
			timerState(timer.id, false);
		}
	};

	// Смена состояния кнопки
	var actionBtnState = function (id, state) {
		$('.Timer__item[data-id="' + id + '"]')
			.find('.js-Timer-toggle')
			.text(state ? 'Стоп' : 'Старт')
			.removeClass(state ? 'Btn--green' : 'Btn--red')
			.addClass(state ? 'Btn--red': 'Btn--green');
	};

	// Смена состояния таймера
	var timerState = function(id, state) {

		// Управление таймером
		state
			? storeTimer.start(id)
			: storeTimer.stop(id);

		var timers = store.get('timers', []);
		timers.map(function (item) {
			if (item.id === id) {
				item.isActive = state;
			}
			return item;
		});
		store.set('timers', timers);

		// Смена состояния кнопки
		actionBtnState(id, state);
	};

	// Рендер списка таймеров
	var renderTimer = function () {
		var box = $('.js-Timer-items');
		var timers = store.get('timers', []);

		box.empty();

		if (timers.length) {
			timers.forEach(function (item) {
				var songTitle = songs.filter(function (song) {
					return item.songId === song.id;
				})[0].title;

				$('#timerItemTpl').tmpl({
					id: item.id,
					timerCounter: humanTimer(item.begin - item.passed),
					name: item.name,
					timerBegin: humanTimer(item.begin),
					songId: item.songId,
					songTitle: songTitle,
				}).appendTo(box);

				// Прогресс бар
				progressTimer(item);
			});

			// Если страница была перезагружена
			store.get('timers', []).filter(function (timer) {
				return timer.isActive === true;
			}).forEach(function (timer) {
				timerState(timer.id, true);
			});

		} else {
			$('#timerEmptyItemTpl').tmpl().appendTo(box);
		}
	};

	renderTimer();

	// Рендер списка мелодий
	songs.forEach(function (song, index) {
		$('#songsOptionTpl').tmpl(song).appendTo('.js-addTimer-song');
		if (index === 0) {
			$('.Modal .js-Timer-song').val(song.id);
		}
	});



	$(document)

		// Тумблер таймера
		.on('click', '.js-Timer-toggle', function (e) {
			e.preventDefault();

			var btn = $(this);
			var id = Number(btn.closest('.Timer__item').data('id'));

			// Управление таймером
			timerState(id, btn.hasClass('Btn--green'));
		})

		// Открыть окно
		.on('click', '.js-Modal-add', function (e) {
			e.preventDefault();

			var timeFormat = humanTimer(defaultParams.begin).split(':').map(Number);

			$('.js-addTimer-id').val('');
			$('.js-addTimer-hour').val(timeFormat[0]);
			$('.js-addTimer-minute').val(timeFormat[1]);
			$('.js-addTimer-second').val(timeFormat[2]);
			$('.js-addTimer-name').val(defaultParams.name);
			$('.js-addTimer-song').val(defaultParams.songId);

			$('.Modal').fadeIn();
		})

		// Закрыть окно
		.on('click', '.js-Modal-close', function (e) {
			e.preventDefault();
			timerAlert.stopAll(function () {
				$('.Modal').fadeOut();
			});
		})

		// Добавить таймер
		.on('click', '.js-Modal-save', function (e) {
			e.preventDefault();

			var timers = store.get('timers', []);
			var id = Number($('.js-addTimer-id').val());
			var name = $('.js-addTimer-name').val();
			var songId = Number($('.js-addTimer-song').val());
			var hours = Number($('.js-addTimer-hour').val());
			var minutes = Number($('.js-addTimer-minute').val());
			var seconds = Number($('.js-addTimer-second').val());
			var begin = moment.duration({ hours: hours, minutes: minutes, seconds: seconds }).asSeconds();

			if (id) {
				timers.map(function (item) {
					if (item.id === id) {
						item.name = name;
						item.songId = songId;
						item.begin = begin;
						item.passed = 0; // Сброс пройденного времени
					}
					return item;
				});
			} else {
				var generator = new IDGenerator();
				timers.push(
					$.extend(defaultParams, {
						id: generator.generate(),
						name: name,
						songId: songId,
						begin: begin,
						isActive: false
					})
				);
			}

			store.set('timers', timers);

			renderTimer();

			$('.Modal').fadeOut();
		})

		// Редактировать таймер
		.on('click', '.js-Timer-edit', function (e) {
			e.preventDefault();

			var timerItem = $(this).closest('.Timer__item');
			var id = Number(timerItem.data('id'));
			var timer = findTimer(id);
			var timeFormat = humanTimer(timer.begin).split(':').map(Number);

			$('.js-addTimer-id').val(id);
			$('.js-addTimer-hour').val(timeFormat[0]);
			$('.js-addTimer-minute').val(timeFormat[1]);
			$('.js-addTimer-second').val(timeFormat[2]);
			$('.js-addTimer-name').val(timer.name);
			$('.js-addTimer-song').val(timer.songId);

			$('.Modal').fadeIn();
		})

		// Удалить таймер
		.on('click', '.js-Timer-delete', function (e) {
			e.preventDefault();

			if (confirm('Вы действительно хотите удалить таймер?')) {
				var timerItem = $(this).closest('.Timer__item');
				var id = Number(timerItem.data('id'));

				// Остановка таймера
				if (storeTimer.isset(id)) {
					timerState(id, false);
				}

				var timers = store.get('timers', []);
				var newTimers = timers.filter(function (item) {
					return id !== item.id;
				});

				store.set('timers', newTimers);

				timerItem.fadeOut(400, function () {
					$(this).remove();

					// Выключение мелодии
					timerAlert.stopAll(function () {
						renderTimer();
					});
				});
			}
		})

		// Сброс таймера
		.on('click', '.js-Timer-reset', function (e) {
			e.preventDefault();

			var timerItem = $(this).closest('.Timer__item');
			var id = Number(timerItem.data('id'));

			// Убрать цвет просрочки
			timerItem.removeClass('Timer__item--overdue');

			// Остановка таймера
			if (storeTimer.isset(id)) {
				timerState(id, false);
			}

			// Сброс
			var timers = store.get('timers', []);
			timers.map(function (timer) {
				if (timer.id === id) {
					timer.isActive = false;
					timer.passed = 0;

					// Выключение мелодии
					timerAlert.stop(timer.songId);
				}
				return timer;
			});
			store.set('timers', timers);

			// Рендеринг
			renderTimer();
		})

		// Прослушать звук уведомления
		.on('change', '.js-Timer-song', function () {
			var isPlay = $(this).is(':checked');
			var songId = $(this).val();
			if (isPlay) {
				timerAlert.start(songId);
			} else {
				timerAlert.stop(songId);
			}
		})

		// Переключить мелодию
		.on('change', '.js-addTimer-song', function () {
			var that = $(this);
			timerAlert.stopAll(function () {
				that.next('.BtnAudio').find('.js-Timer-song').val(that.val());
			});
		})
	;
});
