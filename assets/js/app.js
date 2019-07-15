(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./src/js/functions.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ModalComponent",
  props: {
    timerId: Number
  },
  watch: {
    getTimer: function getTimer(value) {
      if (value) {
        var timeFormat = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["timeStr2Array"])(value.begin);
        this.hour = timeFormat[0];
        this.minute = timeFormat[1];
        this.second = timeFormat[2];
        this.songId = !!value.song ? value.song.id : this.songs[0].id;
        this.name = value.name;
      } else {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.songId = this.songs[0].id;
        this.name = "";
      }
    },
    songId: function songId() {
      this.$root.$emit("pauseSong");
    }
  },
  computed: _objectSpread({
    getTimer: function getTimer() {
      return this.$store.getters["timer/findTimer"](this.timerId);
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    songs: function songs(state) {
      return state.timer.songs;
    }
  })),
  data: function data() {
    return {
      name: "",
      songId: null,
      hour: 0,
      minute: 0,
      second: 0
    };
  },
  methods: {
    saveTimer: function saveTimer() {
      this.$root.$emit("saveTimer", this.$data);
    },
    closeModal: function closeModal() {
      this.$root.$emit("closeModal");
    },
    listenSong: function listenSong(e) {
      this.$root.$emit("listenSong", {
        isPlay: e.target.checked,
        songId: this.songId
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/TimerComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./src/js/functions.js");
/* harmony import */ var _timeChecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../timeChecker */ "./src/js/timeChecker.js");
/* harmony import */ var _ModalComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ModalComponent */ "./src/js/components/ModalComponent.vue");
/* harmony import */ var _TimerItemComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimerItemComponent */ "./src/js/components/TimerItemComponent.vue");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var timeCheck = new _timeChecker__WEBPACK_IMPORTED_MODULE_2__["default"]();
var timerInstance = new _functions__WEBPACK_IMPORTED_MODULE_1__["AdjustingInterval"](function () {
  timeCheck.check();
}, 1000, function () {
  console.warn('The drift exceeded the interval.');
});
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "TimerComponent",
  components: {
    TimerItem: _TimerItemComponent__WEBPACK_IMPORTED_MODULE_4__["default"],
    Modal: _ModalComponent__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  created: function created() {
    var _this = this;

    // Запуск общего таймера
    timerInstance.start(); // Сохранить таймер

    this.$root.$on('saveTimer', function (data) {
      _this.add(data);
    }); // Открыть окно

    this.$root.$on('openModal', function (timerId) {
      _this.openModal(timerId);
    }); // Закрыть окно

    this.$root.$on('closeModal', function () {
      _this.isShowModal = false;
    }); // Прослушать звук

    this.$root.$on('playSong', function (payload) {
      console.log(payload);
    }); // Вкл./Выкл. таймер

    this.$root.$on('toggleTimer', function (id) {
      _this.toggleTimer(id);
    }); // Удалить таймер

    this.$root.$on('removeTimer', function () {// console.log(payload);
    }); // Если страница была перезагружена

    this.timers.filter(function (timer) {
      return timer.isActive === true;
    }).forEach(function (timer) {
      // timerState(timer.id, true);
      console.log('Reloaded: ', timer);
    });
  },
  computed: Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    timers: function timers(state) {
      return state.timer.timers;
    }
  }),
  data: function data() {
    return {
      // Показать модальное окно
      isShowModal: false,
      modalTimerId: null
    };
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])({
    changeActivity: 'timer/changeActivity',
    updatePassedTimer: 'timer/updatePassedTimer'
  }), {
    // Поиск запущенного таймера
    issetStartedTimer: function issetStartedTimer(id) {
      return timeCheck.cfg.checks.findIndex(function (item) {
        return item.id === id;
      }) !== -1;
    },
    // Процесс выполнения таймера
    timerProcess: function timerProcess(id) {
      // Поиск таймера
      var timer = this.$store.getters['timer/findTimer'](id); // Обновить пройденное время таймера

      this.updatePassedTimer(timer);
      console.log(id); // Прогресс бар
      //var timeLeft = progressTimer(timer);
      //if (timeLeft <= 0) {
      // var timerItem = $('.Timer__item[data-id="' + timer.id + '"]');
      // Включить уведомление
      // timerItem
      // 	.find('.js-Timer-song')
      // 	.prop('checked', true)
      // 	.change();
      // Добавить уведомление в favicon и title
      // faviconBadge++;
      // handlerNotify();
      // Цвет просрочки
      // timerItem.addClass('Timer__item--overdue');
      // Остановить таймер
      // timerState(timer.id, false);
      //}
    },
    toggleTimer: function toggleTimer(id) {
      var that = this;
      var isIssetTimer = that.issetStartedTimer(id); // Установка активности

      that.changeActivity({
        id: id,
        isActive: !isIssetTimer
      }); // Включить таймер

      if (!isIssetTimer) {
        // Добавление таймера
        timeCheck.cfg.checks.push({
          id: id,
          check: function check() {
            return true;
          },
          action: function action() {
            that.timerProcess(id); // console.log(timeCheck.cfg.checks, id);
          }
        }); // обновление

        timeCheck.renew();
      } // Отключить таймер
      else {
          // Удаление таймера
          timeCheck.cfg.checks.splice(timeCheck.cfg.checks.findIndex(function (item) {
            return item.id === id;
          }), 1); // обновление

          timeCheck.renew();
        }
    },
    // Смена состояния таймера
    timerState: function timerState(id, state) {
      // Управление таймером
      // state
      // 	? storeTimer.start(id)
      // 	: storeTimer.stop(id);
      var timers = this.$root.$store.get('timers', []);
      timers.map(function (item) {
        if (item.id === id) {
          item.isActive = state;
        }

        return item;
      });
      this.$root.$store.set('timers', timers); // Смена состояния кнопки
      // actionBtnState(id, state);
    },
    // Открыть окно
    openModal: function openModal() {
      var timerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.modalTimerId = timerId;
      this.isShowModal = true;
    },
    add: function add(data) {
      console.log(data);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ "./src/js/store/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./src/js/functions.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { mapState, mapActions } from 'vuex'


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "TimerItemComponent",
  store: _store__WEBPACK_IMPORTED_MODULE_0__["default"],
  created: function created() {// this.$store.dispatch('timer/getRequisites')
    // console.log(this.getTimer);
  },
  props: {
    timerId: Number
  },
  computed: {
    getTimer: function getTimer() {
      return this.$store.getters["timer/findTimer"](this.timerId);
    },
    getName: function getName() {
      return this.getTimer.name;
    },
    getActive: function getActive() {
      return this.getTimer.isActive;
    },
    getPassed: function getPassed() {
      return this.getTimer.passed;
    },
    getSong: function getSong() {
      return this.getTimer.song;
    },
    getCounter: function getCounter() {
      return Object(_functions__WEBPACK_IMPORTED_MODULE_1__["timeSecond2Human"])(this.getTimer.begin);
    },
    getCounterDyn: function getCounterDyn() {
      return Object(_functions__WEBPACK_IMPORTED_MODULE_1__["timeSecond2Human"])(this.timeLeft);
    },
    timeLeft: function timeLeft() {
      var timeLeft = this.getTimer.begin - this.getTimer.passed;
      return timeLeft > 0 ? timeLeft : 0;
    }
  },
  data: function data() {
    return {
      progressValue: 100,
      isPlaySong: false
    };
  },
  watch: {
    getTimer: function getTimer(timer) {
      this.calcProgressValue();

      if (!this.timeLeft) {
        // Включить уведомление
        this.notify(); // Добавить уведомление в favicon и title
        // faviconBadge++;
        // handlerNotify();
        // Остановить таймер
        // timerState(timer.id, false);
      } // console.log("getTimer: ", timer);

    },
    getActive: function getActive(value) {// console.log("getActive: ", value);
    }
  },
  methods: {
    edit: function edit() {
      this.$root.$emit("openModal", this.timerId);
    },
    remove: function remove() {
      if (confirm("\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0430\u0439\u043C\u0435\u0440?")) {
        this.$root.$emit("removeTimer", this.timerId);
      }
    },
    toggle: function toggle() {
      this.$root.$emit("toggleTimer", this.timerId);
    },
    reset: function reset() {// Убрать цвет просрочки
      // timerItem.removeClass('Timer__item--overdue');
      // Остановка таймера
      // if (storeTimer.isset(id)) {
      // 	timerState(id, false);
      // }
      // Сброс
      // var timers = store.get('timers', []);
      // timers.map(function (timer) {
      // 	if (timer.id === id) {
      // 		timer.isActive = false;
      // 		timer.passed = 0;
      //
      // 		// Выключение мелодии
      // 		timerAlert.stop(timer.songId);
      // 	}
      // 	return timer;
      // });
      // store.set('timers', timers);
    },
    // Подсчет процента выполнения
    calcProgressValue: function calcProgressValue() {
      this.progressValue = this.getTimer.passed ? 100 - Math.floor(this.getTimer.passed / (this.getTimer.begin / 100)) : 100;
    },
    // Добавить уведомление в favicon и title
    notify: function notify() {
      // Признак включенного звука
      this.isPlaySong ^= true; // Включить звук уведомления

      this.$root.$emit("playSong", {
        timerId: this.timerId,
        songId: this.getSong.id,
        isPlay: this.isPlaySong
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "Modal" } }, [
    _c("div", { staticClass: "Modal" }, [
      _c("div", { staticClass: "Modal__wrapper" }, [
        _c("div", { staticClass: "Modal__container" }, [
          _c("a", {
            staticClass: "Modal__close",
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.closeModal($event)
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "Modal__header" }, [_vm._v("Таймер")]),
          _vm._v(" "),
          _c("div", { staticClass: "Modal__content" }, [
            _c("div", { staticClass: "Modal__box" }, [
              _c("div", { staticClass: "AddTimer" }, [
                _c("div", { staticClass: "AddTimer__col" }, [
                  _c(
                    "label",
                    {
                      staticClass: "AddTimer__label",
                      attrs: { for: "timerHours" }
                    },
                    [_vm._v("Часы")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.number",
                        value: _vm.hour,
                        expression: "hour",
                        modifiers: { number: true }
                      }
                    ],
                    staticClass: "AddTimer__input AddTimer__input--time",
                    attrs: {
                      id: "timerHours",
                      type: "number",
                      value: "0",
                      min: "0",
                      max: "99"
                    },
                    domProps: { value: _vm.hour },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.hour = _vm._n($event.target.value)
                      },
                      blur: function($event) {
                        return _vm.$forceUpdate()
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "AddTimer__col" }, [
                  _c(
                    "label",
                    {
                      staticClass: "AddTimer__label",
                      attrs: { for: "timerMinutes" }
                    },
                    [_vm._v("Минуты")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.number",
                        value: _vm.minute,
                        expression: "minute",
                        modifiers: { number: true }
                      }
                    ],
                    staticClass: "AddTimer__input AddTimer__input--time",
                    attrs: {
                      id: "timerMinutes",
                      type: "number",
                      value: "0",
                      min: "0",
                      max: "59"
                    },
                    domProps: { value: _vm.minute },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.minute = _vm._n($event.target.value)
                      },
                      blur: function($event) {
                        return _vm.$forceUpdate()
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "AddTimer__col" }, [
                  _c(
                    "label",
                    {
                      staticClass: "AddTimer__label",
                      attrs: { for: "timerSeconds" }
                    },
                    [_vm._v("Секунды")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.number",
                        value: _vm.second,
                        expression: "second",
                        modifiers: { number: true }
                      }
                    ],
                    staticClass: "AddTimer__input AddTimer__input--time",
                    attrs: {
                      id: "timerSeconds",
                      type: "number",
                      value: "0",
                      min: "0",
                      max: "59"
                    },
                    domProps: { value: _vm.second },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.second = _vm._n($event.target.value)
                      },
                      blur: function($event) {
                        return _vm.$forceUpdate()
                      }
                    }
                  })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "Modal__box" }, [
              _c(
                "label",
                { staticClass: "AddTimer__label", attrs: { for: "timerName" } },
                [_vm._v("Название")]
              ),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.name,
                    expression: "name"
                  }
                ],
                staticClass: "AddTimer__input AddTimer__input--name",
                attrs: { id: "timerName", type: "text", maxlength: "255" },
                domProps: { value: _vm.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.name = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "Modal__box" }, [
              _c(
                "label",
                {
                  staticClass: "AddTimer__label",
                  attrs: { for: "timerSongs" }
                },
                [_vm._v("Звук уведомления")]
              ),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.number",
                      value: _vm.songId,
                      expression: "songId",
                      modifiers: { number: true }
                    }
                  ],
                  staticClass: "AddTimer__select",
                  attrs: { id: "timerSongs" },
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return _vm._n(val)
                        })
                      _vm.songId = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.songs, function(song) {
                  return _c(
                    "option",
                    {
                      key: "song-modal-" + song.id,
                      domProps: { value: song.id }
                    },
                    [_vm._v(_vm._s(song.title))]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c("span", { staticClass: "BtnAudio" }, [
                _c("input", {
                  attrs: {
                    type: "checkbox",
                    value: "1",
                    id: "BtnAudio",
                    name: "listenAudio"
                  },
                  on: { change: _vm.listenSong }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "BtnAudio" } }, [
                  _vm._v("Прослушать")
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "Modal__controls" }, [
            _c(
              "button",
              {
                staticClass: "Btn Btn--default",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.saveTimer($event)
                  }
                }
              },
              [_vm._v("Сохранить")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "Btn Btn--link",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.closeModal($event)
                  }
                }
              },
              [_vm._v("Отменить")]
            )
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "Timer" },
    [
      _vm.timers.length
        ? _vm._l(_vm.timers, function(item) {
            return _c("timer-item", {
              key: item.id,
              attrs: { "timer-id": item.id }
            })
          })
        : _c("div", { staticClass: "Timer__item" }, [
            _c("div", { staticClass: "Timer__empty" }, [
              _vm._v("У вас нет ни одного таймера!")
            ])
          ]),
      _vm._v(" "),
      _c("div", { staticClass: "Timer__footer" }, [
        _c(
          "a",
          {
            staticClass: "Btn Btn--default js-Modal-add",
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.openModal()
              }
            }
          },
          [
            _c("span", { staticClass: "Icon Icon--add" }),
            _vm._v(" Добавить таймер")
          ]
        )
      ]),
      _vm._v(" "),
      _c("modal", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.isShowModal,
            expression: "isShowModal"
          }
        ],
        attrs: { timerId: _vm.modalTimerId }
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: ["Timer__item", { "Timer__item--overdue": !_vm.timeLeft }] },
    [
      _c("div", { staticClass: "Timer__row" }, [
        _c(
          "div",
          {
            staticClass: "Timer__counter",
            domProps: { textContent: _vm._s(_vm.getCounterDyn) }
          },
          [_vm._v("--:--:--")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "Timer__controls" }, [
          _c("button", {
            class: [
              "Btn",
              { "Btn--green": !_vm.getActive },
              { "Btn--red": _vm.getActive }
            ],
            attrs: { disabled: !_vm.timeLeft },
            domProps: {
              textContent: _vm._s(!_vm.getActive ? "Старт" : "Стоп")
            },
            on: { click: _vm.toggle }
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "Btn Btn--default",
              attrs: { disabled: !_vm.getPassed },
              on: { click: _vm.reset }
            },
            [_vm._v("Сброс")]
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "Timer__row Timer__row--info" }, [
        _c("span", {
          staticClass: "Timer__name",
          domProps: { textContent: _vm._s(_vm.getName) }
        }),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "Timer__value",
            domProps: { textContent: _vm._s(_vm.getCounter) }
          },
          [_vm._v("--:--:--")]
        ),
        _vm._v(" "),
        _c("span", { staticClass: "BtnAudio" }, [
          _c("input", {
            attrs: {
              type: "checkbox",
              id: "AudioCheck-" + _vm.getSong.id,
              name: "audioCheck_" + _vm.getSong.id
            },
            domProps: { checked: _vm.isPlaySong },
            on: { change: _vm.notify }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: "AudioCheck-" + _vm.getSong.id } }, [
            _vm._v(_vm._s(_vm.getSong.title))
          ])
        ]),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "Btn Btn--link Btn--edit", on: { click: _vm.edit } },
          [
            _c("span", { staticClass: "Icon Icon--edit" }),
            _vm._v("\n      Редактировать\n    ")
          ]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "Btn Btn--link Btn--remove",
            on: { click: _vm.remove }
          },
          [
            _c("span", { staticClass: "Icon Icon--remove" }),
            _vm._v("\n      Удалить\n    ")
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "Timer__row" }, [
        _c(
          "div",
          {
            class: [
              "Timer__progress",
              { "Timer__progress--textHide": _vm.progressValue < 5 },
              { "Timer__progress--alert": _vm.progressValue <= 10 }
            ]
          },
          [
            _c("div", {
              style: [{ width: _vm.progressValue + "%" }],
              domProps: {
                textContent: _vm._s(
                  _vm.getPassed ? _vm.progressValue + "%" : "(не запущено)"
                )
              }
            })
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/StoreSelector.js":
/*!*********************************!*\
  !*** ./src/js/StoreSelector.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StoreSelector; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * localStorage - не имеют срока годности
 * sessionStorage - очищаются по окончании сеанса страницы, то есть при закрытии страницы.
 *
 * @export
 * @class StoreSelector
 */
var StoreSelector =
/*#__PURE__*/
function () {
  function StoreSelector() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "local";

    _classCallCheck(this, StoreSelector);

    if (type === "local") {
      // localStorage
      this.storage = localStorage;
    } else if (type === "session") {
      // sessionStorage
      this.storage = sessionStorage;
    } else {
      throw new Error("\u041D\u0435 \u0432\u0435\u0440\u043D\u043E \u0443\u043A\u0430\u0437\u0430\u043D \u0442\u0438\u043F \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445.");
    }
  }
  /**
   * Подготовка значения
   *
   * @param {*} value
   * @return {String}
   * @memberof StoreSelector
   */


  _createClass(StoreSelector, [{
    key: "_serialize",
    value: function _serialize(value) {
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

  }, {
    key: "_unserialize",
    value: function _unserialize(value, defaultValue) {
      if (!value && !!defaultValue) {
        return defaultValue;
      }

      var val = "";

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

  }, {
    key: "get",
    value: function get(key, defaultOptionalValue) {
      var value = this.storage.getItem(key);
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

  }, {
    key: "set",
    value: function set(key, value) {
      this.storage.setItem(key, this._serialize(value));
      return value;
    }
    /**
     * Удаление записи
     *
     * @param {String} key
     * @memberof StoreSelector
     */

  }, {
    key: "remove",
    value: function remove(key) {
      this.storage.removeItem(key);
    }
    /**
     * Очистка хранилища
     *
     * @memberof StoreSelector
     */

  }, {
    key: "clear",
    value: function clear() {
      this.storage.clear();
    }
  }]);

  return StoreSelector;
}();



/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/js/store/index.js");
/* harmony import */ var _components_TimerComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TimerComponent */ "./src/js/components/TimerComponent.vue");
/* harmony import */ var favico_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! favico.js */ "./node_modules/favico.js/favico.js");
/* harmony import */ var favico_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(favico_js__WEBPACK_IMPORTED_MODULE_3__);
/* eslint no-console: ["error", {allow: ["log"]}]*/



 // Set the name of the hidden property and the change event for visibility

var hidden;
var visibilityChange;

if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} // Добавление в иконку уведомление о количестве просроченных таймеров


var faviconBadge = 0;
var favicon = new favico_js__WEBPACK_IMPORTED_MODULE_3___default.a({
  animation: "fade"
}); // Управление аудио

/* const timerAlert = {
    start(id) {
        this.stopAll(() => {
            if (document.getElementById(`song` + id)) {
                document.getElementById(`song` + id).play();
            } else {
                let a = document.createElement(`audio`);
                a.src = `../audio/${id}.mp3`;
                a.volume = 0.75;
                a.setAttribute(`autoplay`, true);
                a.setAttribute(`loop`, true);
                a.setAttribute(`id`, `song${id}`);
                document.body.appendChild(a);
            }
        });
    },
    stop(id) {
        let song = document.getElementById(`song${id}`);
        if (song && song.duration > 0 && !song.paused) {
            song.pause();
            song.currentTime = 0;
        }
    },
    stopAll(fn) {
        let songs = document.querySelectorAll(`audio[id^=song]`);
        songs = [].slice.call(songs); // IE
        songs.forEach(function (song) {
            if (song.duration > 0 && !song.paused) {
                song.pause();
                song.currentTime = 0;

                // var songId = /[\d]+/g.exec(song.getAttribute('id'));
                // $('.js-Timer-song[value=' + songId + ']').prop('checked', false);
            }
        });

        fn();
    }
}; */

var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  store: _store__WEBPACK_IMPORTED_MODULE_1__["default"],
  created: function created() {
    var _this = this;

    // Уведомление
    this.$root.$on("addNotify", function () {
      console.log("addNotify");
      faviconBadge++;

      _this.handlerNotify();
    }); // Warn if the browser doesn't support addEventListener or the Page Visibility API

    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
      console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
      document.addEventListener(visibilityChange, function () {
        _this.handlerNotify();
      }, false);
    }
  },
  methods: {
    handlerNotify: function handlerNotify() {
      var title = document.getElementsByTagName("title");

      if (document[hidden] && faviconBadge) {
        favicon.badge(faviconBadge);
        title.textContent = "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F - \u0422\u0430\u0439\u043C\u0435\u0440";
      } else if (faviconBadge) {
        faviconBadge = 0;
        favicon.reset();
        title.textContent = "\u0422\u0430\u0439\u043C\u0435\u0440";
      }
    }
  },
  data: function data() {
    return {
      isShowModal: false
    };
  },
  render: function render(h) {
    return h(_components_TimerComponent__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }
});
app.$mount("#app");

/***/ }),

/***/ "./src/js/components/ModalComponent.vue":
/*!**********************************************!*\
  !*** ./src/js/components/ModalComponent.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=template&id=054686c8& */ "./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8&");
/* harmony import */ var _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=script&lang=js& */ "./src/js/components/ModalComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/ModalComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/js/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/ModalComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8&":
/*!*****************************************************************************!*\
  !*** ./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ModalComponent.vue?vue&type=template&id=054686c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/ModalComponent.vue?vue&type=template&id=054686c8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_054686c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/TimerComponent.vue":
/*!**********************************************!*\
  !*** ./src/js/components/TimerComponent.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimerComponent.vue?vue&type=template&id=1a1fe704& */ "./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704&");
/* harmony import */ var _TimerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimerComponent.vue?vue&type=script&lang=js& */ "./src/js/components/TimerComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/TimerComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/TimerComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/js/components/TimerComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TimerComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704&":
/*!*****************************************************************************!*\
  !*** ./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./TimerComponent.vue?vue&type=template&id=1a1fe704& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=template&id=1a1fe704&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_template_id_1a1fe704___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/components/TimerItemComponent.vue":
/*!**************************************************!*\
  !*** ./src/js/components/TimerItemComponent.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimerItemComponent.vue?vue&type=template&id=c216399e& */ "./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e&");
/* harmony import */ var _TimerItemComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimerItemComponent.vue?vue&type=script&lang=js& */ "./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimerItemComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/TimerItemComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerItemComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TimerItemComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerItemComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerItemComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e&":
/*!*********************************************************************************!*\
  !*** ./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./TimerItemComponent.vue?vue&type=template&id=c216399e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerItemComponent.vue?vue&type=template&id=c216399e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerItemComponent_vue_vue_type_template_id_c216399e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/functions.js":
/*!*****************************!*\
  !*** ./src/js/functions.js ***!
  \*****************************/
/*! exports provided: IDGenerator, AdjustingInterval, timeStr2Array, timeSecond2Human, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDGenerator", function() { return IDGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdjustingInterval", function() { return AdjustingInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeStr2Array", function() { return timeStr2Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeSecond2Human", function() { return timeSecond2Human; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

__webpack_require__(/*! moment-duration-format */ "./node_modules/moment-duration-format/lib/moment-duration-format.js");
/**
 * Генератор Id
 *
 * @export
 * @class IDGenerator
 */


var IDGenerator =
/*#__PURE__*/
function () {
  function IDGenerator() {
    _classCallCheck(this, IDGenerator);

    this.length = 8;
    this.timestamp = +new Date();
  }

  _createClass(IDGenerator, [{
    key: "_getRandomInt",
    value: function _getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "generate",
    value: function generate() {
      var ts = this.timestamp.toString();
      var parts = ts.split("").reverse();
      var id = "";

      for (var i = 0; i < this.length; ++i) {
        var index = this._getRandomInt(0, parts.length - 1);

        id += parts[index];
      }

      return Number(id);
    }
  }]);

  return IDGenerator;
}();
/**
 * Саморегулирующийся интервал для учета дрейфа
 *
 * @export
 * @class AdjustingInterval
 */

var AdjustingInterval =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of AdjustingInterval.
   * @param {AdjustingInterval~callback} callback
   * @param {*} interval
   * @param {AdjustingInterval~errorCallback} [errorCallback=null]
   * @memberof AdjustingInterval
   */
  function AdjustingInterval(callback, interval) {
    var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, AdjustingInterval);

    this.running = false;
    this.interval = interval;
    this.callback = callback;
    this.errorCallback = errorCallback;
  }

  _createClass(AdjustingInterval, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.running = true;
      this.expected = Date.now() + this.interval;
      this.timeout = setTimeout(function () {
        return _this._step();
      }, this.interval);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      clearTimeout(this.timeout);
    }
  }, {
    key: "_step",
    value: function _step() {
      var _this2 = this;

      var drift = Date.now() - this.expected;

      if (drift > this.interval) {
        if (this.errorCallback) {
          this.errorCallback();
        }
      }

      this.callback();

      if (this.running) {
        this.expected += this.interval;
        this.timeout = setTimeout(function () {
          return _this2._step();
        }, Math.max(0, this.interval - drift));
      }
    }
  }]);

  return AdjustingInterval;
}();
/**
 * Преобразовать секунды в массив [час, минута, секунда]
 *
 * @export
 * @param {Number} time
 * @return {Array}
 */

function timeStr2Array(time) {
  return moment.duration(time, "seconds").format("hh:mm:ss", {
    trim: false
  }).split(":").map(Number);
}
/**
 * Преобразовать секунды в 00:00:00
 *
 * @export
 * @param {Number} seconds
 * @return {String}
 */

function timeSecond2Human(seconds) {
  var duration = moment.duration(seconds, "seconds");
  return duration.format("hh:mm:ss", {
    trim: false
  });
}
/* harmony default export */ __webpack_exports__["default"] = ({
  IDGenerator: IDGenerator,
  AdjustingInterval: AdjustingInterval,
  timeStr2Array: timeStr2Array,
  timeSecond2Human: timeSecond2Human
});

/***/ }),

/***/ "./src/js/store/index.js":
/*!*******************************!*\
  !*** ./src/js/store/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/store/modules/timer.js");
 // import 'es6-promise/auto';



vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    timer: _modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}));

/***/ }),

/***/ "./src/js/store/modules/timer.js":
/*!***************************************!*\
  !*** ./src/js/store/modules/timer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StoreSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StoreSelector */ "./src/js/StoreSelector.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functions */ "./src/js/functions.js");
function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

/* eslint no-shadow: ["error", { "allow": ["state", "timers"] }]*/

 // initial state

var state = {
  // Таймеры
  timers: [],
  // Параметры по умолчанию
  defaultParams: {
    name: "\u0422\u0430\u0439\u043C\u0435\u0440 \u21161",
    song: null,
    isActive: false,
    begin: 600,
    // Начальное значение секунд
    passed: 0 // Прошло секунд

  },
  // Список звуков уведомлений
  songs: [{
    id: 1,
    title: "Songs #1"
  }, {
    id: 2,
    title: "Alarm"
  }, {
    id: 3,
    title: "\u0414\u0440\u0438\u0442\u0430\u0442\u0443\u0448\u0435\u0447\u043A\u0438"
  }, {
    id: 4,
    title: "Super Mario"
  }, {
    id: 5,
    title: "Roll Up"
  }, {
    id: 6,
    title: "Bitter sweet"
  }, {
    id: 7,
    title: "San Andreas"
  }, {
    id: 8,
    title: "\u041F\u043E\u043B\u0438\u0446\u0438\u044F"
  }, {
    id: 9,
    title: "Dubstep violin"
  }, {
    id: 10,
    title: "Symphonie (remix)"
  }]
}; // Получаем сохраненные таймеры

var StoreTimers = new _StoreSelector__WEBPACK_IMPORTED_MODULE_0__["default"]("local"); // Получение сохраненных таймеров

var timers = StoreTimers.get("timers", []); // Установка таймера по умолчанию, если нет таймеров

if (!timers.length) {
  var generator = new _functions__WEBPACK_IMPORTED_MODULE_1__["IDGenerator"]();
  timers.push(Object.assign(state.defaultParams, {
    id: generator.generate(),
    song: state.songs[0]
  })); // @TODO - Вынести в commit

  StoreTimers.set("timers", timers);
} // Установка таймеров в state


state = (_readOnlyError("state"), Object.assign(state, {
  timers: timers
})); // getters

var getters = {
  // Поиск таймера
  findTimer: function findTimer(state) {
    return function (id) {
      return state.timers.find(function (item) {
        return item.id === id;
      });
    };
  }
}; // actions

var actions = {
  // Обновить пройденное время таймера
  updatePassedTimer: function updatePassedTimer(_ref, timer) {
    var commit = _ref.commit,
        state = _ref.state;
    var newTimers = state.timers.map(function (item) {
      if (item.id === timer.id && timer.passed <= item.begin) {
        item.passed = timer.passed + 1;
      }

      return item;
    });
    commit("updateTimersStore", newTimers);
  },
  // Смена состояния активности
  changeActivity: function changeActivity(_ref2, _ref3) {
    var commit = _ref2.commit,
        state = _ref2.state;
    var id = _ref3.id,
        isActive = _ref3.isActive;
    var newTimers = state.timers.map(function (item) {
      if (item.id === id) {
        item.isActive = isActive;
      }

      return item;
    });
    commit("updateTimersStore", newTimers);
  }
}; // mutations

var mutations = {
  // Обновить таймеры
  updateTimersStore: function updateTimersStore(state, timers) {
    state.timers = timers;
    StoreTimers.set("timers", timers);
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./src/js/timeChecker.js":
/*!*******************************!*\
  !*** ./src/js/timeChecker.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  var copy; // Handle the 3 simple types, and null or undefined

  if (obj === null || typeof obj !== "object") {
    return obj;
  } // Handle Date


  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  } // Handle Array


  if (obj instanceof Array) {
    copy = [];

    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }

    return copy;
  } // Handle Object


  if (obj instanceof Object) {
    copy = {};

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = clone(obj[attr]);
      }
    }

    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

var _default =
/*#__PURE__*/
function () {
  function _default() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      // Бесконечно выполнять
      infinity: true,
      // если эта функция вернёт true, проверки сбросятся в исходное состояние
      renewCheck: function renewCheck() {
        return false;
      },
      // Массив с проверками
      checks: []
    };

    _classCallCheck(this, _default);

    this.config(cfg);
    this.dateOld = new Date(); // дата предыдущей проверки

    return this;
  } // получение и установка настроек


  _createClass(_default, [{
    key: "config",
    value: function config() {
      var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (cfg) {
        this.cfg = clone(cfg); // кеш настроек

        this.cfgTmp = clone(cfg); // настройки, с которыми работаем
      }

      return this.cfg;
    } // обновление проверок

  }, {
    key: "renew",
    value: function renew() {
      this.cfgTmp = clone(this.cfg);
    } // получение даты

  }, {
    key: "getDate",
    value: function getDate() {
      return new Date();
    }
  }, {
    key: "check",
    value: function check() {
      if (!this.cfg) {
        return;
      }

      var that = this;
      var date = this.getDate();

      if (this.cfg.renewCheck(this.dateOld, date)) {
        this.renew();
      }

      this.cfgTmp.checks.forEach(function (item, i) {
        if (item.check(date)) {
          item.action(); // Нужно ли выполнять бесконечно

          if (!that.cfg.infinity) {
            that.cfgTmp.checks.splice(i, 1);
          }
        }
      });
      this.dateOld = new Date();
    }
  }]);

  return _default;
}();



/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/js/app.js ./src/css/styles.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\var\opt\apache\htdocs\timer-vue\src\js\app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! E:\var\opt\apache\htdocs\timer-vue\src\css\styles.css */"./src/css/styles.css");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);