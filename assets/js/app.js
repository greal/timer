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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./src/js/functions.ts");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ModalComponent",
  props: {
    timerId: Number
  },
  created: function created() {
    if (!this.timerId) {
      var defaultParams = this.$store.getters["timer/getDefaultParams"];
      this.hour = 0;
      this.minute = 10;
      this.second = 0;
      this.song = this.songs[0];
      this.name = defaultParams.name;
    }
  },
  watch: {
    getTimer: function getTimer(value) {
      if (value) {
        var timeFormat = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["timeStr2Array"])(value.begin);
        this.hour = timeFormat[0];
        this.minute = timeFormat[1];
        this.second = timeFormat[2];
        this.song = value.song ? value.song : this.songs[0];
        this.name = value.name;
      } else {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.song = this.songs[0];
        this.name = "";
      }
    },
    song: function song() {
      this.$root.$emit("stopSong");
      this.isPlaySong = false;
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
      song: null,
      hour: 0,
      minute: 0,
      second: 0,
      isPlaySong: false
    };
  },
  methods: {
    saveTimer: function saveTimer() {
      // @TODO Валидация
      this.$root.$emit("saveTimer", Object.assign(this.$data, {
        id: this.timerId
      }));
    },
    closeModal: function closeModal() {
      this.$root.$emit("closeModal");
    },
    // Управление звуком
    playSound: function playSound() {
      // Признак включенного звука
      this.isPlaySong ^= true; // Включить звук уведомления

      this.$root.$emit("playSong", {
        songId: this.song.id,
        isPlay: this.isPlaySong
      });
    }
  }
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
  name: "TimerItemComponent",
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
      return this.getTimer.begin;
    },
    // Остаток времени
    timeLeft: function timeLeft() {
      var timeLeft = this.getTimer.begin - this.getTimer.passed;
      return timeLeft > 0 ? timeLeft : 0;
    },
    // Подсчет процента выполнения
    progressValue: function progressValue() {
      return this.getTimer.passed ? 100 - Math.floor(this.getTimer.passed / (this.getTimer.begin / 100)) : 100;
    }
  },
  data: function data() {
    return {
      isPlaySong: false
    };
  },
  watch: {
    timeLeft: function timeLeft(value) {
      if (!value) {
        // Включить звук уведомление
        this.playSound(); // Favicon и title

        this.$root.$emit("addNotify"); // Остановить таймер

        this.stop();
      }
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
    stop: function stop() {
      this.$root.$emit("stopTimer", this.timerId);
    },
    reset: function reset() {
      this.$root.$emit("resetTimer", this.timerId);
    },
    // Управление звуком
    playSound: function playSound() {
      // Признак включенного звука
      this.isPlaySong ^= true; // Включить звук уведомления

      this.$root.$emit("playSong", {
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

/***/ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=script&lang=ts&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/js/components/TimerComponent.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.esm.js");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions */ "./src/js/functions.ts");
/* harmony import */ var _timeChecker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../timeChecker */ "./src/js/timeChecker.ts");
/* harmony import */ var _ModalComponent_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ModalComponent.vue */ "./src/js/components/ModalComponent.vue");
/* harmony import */ var _TimerItemComponent_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimerItemComponent.vue */ "./src/js/components/TimerItemComponent.vue");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import {mapState, mapActions} from "vuex";





var namespace = 'timer';
var timeCheck = new _timeChecker__WEBPACK_IMPORTED_MODULE_4__["default"]();
var timerInstance = new _functions__WEBPACK_IMPORTED_MODULE_3__["AdjustingInterval"](function () {
    timeCheck.check();
}, 1000, function () {
    console.warn("The drift exceeded the interval.");
});
var timerSound = new _functions__WEBPACK_IMPORTED_MODULE_3__["TimerSound"]('../audio/');
var TimerComponent = /** @class */ (function (_super) {
    __extends(TimerComponent, _super);
    function TimerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isShowModal = false;
        _this.modalTimerId = null;
        return _this;
    }
    TimerComponent.prototype.created = function () {
        var _this = this;
        // Запуск общего таймера
        timerInstance.start();
        // Сохранить таймер
        this.$root.$on("saveTimer", function (data) {
            _this.save(data);
        });
        // Открыть окно
        this.$root.$on("openModal", function (timerId) {
            _this.openModal(timerId);
        });
        // Закрыть окно
        this.$root.$on("closeModal", function () {
            _this.isShowModal = false;
        });
        // Прослушать звук
        this.$root.$on("playSong", function (payload) {
            payload.isPlay
                ? timerSound.play(payload.songId)
                : timerSound.stop(payload.songId);
        });
        // Отключить звук
        this.$root.$on("stopSong", function () {
            timerSound.stopAll();
        });
        // Вкл./Выкл. таймер
        this.$root.$on("toggleTimer", function (id) {
            _this.toggleTimer(id);
            _this.stopSoundTimer(id);
        });
        // Удалить таймер
        this.$root.$on("removeTimer", function (id) {
            _this.removeStartedTimer(id);
            _this.stopSoundTimer(id);
            _this.removeTimer(id);
        });
        // Сброс таймера
        this.$root.$on("resetTimer", function (id) {
            _this.timerState(id, false);
            _this.resetPassed(id);
            _this.stopSoundTimer(id);
        });
        // Остановка таймера
        this.$root.$on("stopTimer", function (id) {
            _this.timerState(id, false);
        });
        // Если страница была перезагружена
        this.timers
            .filter(function (timer) { return timer.isActive === true; })
            .forEach(function (timer) {
            _this.timerState(timer.id, true);
        });
    };
    // data: () => ({
    //     isShowModal: false,
    //     modalTimerId: null
    // }),
    // Выключение мелодии
    TimerComponent.prototype.stopSoundTimer = function (id) {
        var timer = this.getTimer(id);
        timerSound.stop(timer.song.id);
    };
    // Поиск запущенного таймера
    TimerComponent.prototype.issetStartedTimer = function (id) {
        return timeCheck.cfg.checks.findIndex(function (item) { return item.id === id; }) !== -1;
    };
    // Процесс выполнения таймера
    TimerComponent.prototype.timerProcess = function (id) {
        // Обновить пройденное время таймера
        this.updatePassed(this.getTimer(id));
    };
    // Получить данные таймера
    TimerComponent.prototype.getTimer = function (id) {
        return this.$store.getters["timer/findTimer"](id);
    };
    // Добавить таймер
    TimerComponent.prototype.startTimer = function (id) {
        var _this = this;
        timeCheck.cfg.checks.push({
            id: id,
            check: function () { return true; },
            action: function () {
                _this.timerProcess(id);
            }
        });
        // обновление
        timeCheck.update();
    };
    // Удаление таймера
    TimerComponent.prototype.removeStartedTimer = function (id) {
        if (this.issetStartedTimer(id)) {
            timeCheck.cfg.checks.splice(timeCheck.cfg.checks.findIndex(function (item) { return item.id === id; }), 1);
            // обновление
            timeCheck.update();
        }
    };
    // Тумблер
    TimerComponent.prototype.toggleTimer = function (id) {
        this.timerState(id, !this.issetStartedTimer(id));
    };
    // Смена состояния таймера
    TimerComponent.prototype.timerState = function (id, state) {
        state
            ? this.startTimer(id) // Включить таймер
            : this.removeStartedTimer(id); // Отключить таймер
        // Установка активности
        this.changeActivity({ id: id, isActive: state });
    };
    // Открыть окно
    TimerComponent.prototype.openModal = function (timerId) {
        if (timerId === void 0) { timerId = null; }
        this.modalTimerId = timerId;
        this.isShowModal = true;
    };
    // Сохранение таймера
    TimerComponent.prototype.save = function (data) {
        this.saveTimer(data);
        this.$root.$emit("closeModal");
    };
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["State"])('timers', { namespace: namespace })
    ], TimerComponent.prototype, "timers", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('changeActivity', { namespace: namespace })
    ], TimerComponent.prototype, "changeActivity", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('resetPassed', { namespace: namespace })
    ], TimerComponent.prototype, "resetPassed", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('updatePassed', { namespace: namespace })
    ], TimerComponent.prototype, "updatePassed", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('saveTimer', { namespace: namespace })
    ], TimerComponent.prototype, "saveTimer", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_2__["Action"])('removeTimer', { namespace: namespace })
    ], TimerComponent.prototype, "removeTimer", void 0);
    TimerComponent = __decorate([
        Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: "TimerComponent",
            components: {
                TimerItem: _TimerItemComponent_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
                Modal: _ModalComponent_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
            }
        })
    ], TimerComponent);
    return TimerComponent;
}(vue__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (TimerComponent);
;


/***/ }),

/***/ "./node_modules/vue-class-component/dist/vue-class-component.esm.js":
/*!**************************************************************************!*\
  !*** ./node_modules/vue-class-component/dist/vue-class-component.esm.js ***!
  \**************************************************************************/
/*! exports provided: default, createDecorator, mixins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDecorator", function() { return createDecorator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return mixins; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/**
  * vue-class-component v7.1.0
  * (c) 2015-present Evan You
  * @license MIT
  */


// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Ctors[_i] = arguments[_i];
    }
    return vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({ mixins: Ctors });
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (true) {
        if (!(Component.prototype instanceof vue__WEBPACK_IMPORTED_MODULE_0__["default"]) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured',
    'serverPrefetch' // 2.6
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof vue__WEBPACK_IMPORTED_MODULE_0__["default"]
        ? superProto.constructor
        : vue__WEBPACK_IMPORTED_MODULE_0__["default"];
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
var shouldIgnore = {
    prototype: true,
    arguments: true,
    callee: true,
    caller: true
};
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if ( true &&
            reservedPropertyNames.indexOf(key) >= 0) {
            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
};

/* harmony default export */ __webpack_exports__["default"] = (Component);



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
                      value: _vm.song,
                      expression: "song",
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
                      _vm.song = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.songs, function(song) {
                  return _c(
                    "option",
                    { key: "song-modal-" + song.id, domProps: { value: song } },
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
                    id: "BtnAudio",
                    name: "listenAudio"
                  },
                  domProps: { checked: _vm.isPlaySong },
                  on: {
                    change: function($event) {
                      return _vm.playSound()
                    }
                  }
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
            _vm._v(" Добавить таймер\n    ")
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
        _c("div", { staticClass: "Timer__counter" }, [
          _vm._v(_vm._s(_vm._f("formatSecond2Human")(_vm.timeLeft)))
        ]),
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
        _c("span", { staticClass: "Timer__value" }, [
          _vm._v(_vm._s(_vm._f("formatSecond2Human")(_vm.getCounter)))
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "BtnAudio" }, [
          _c("input", {
            attrs: {
              type: "checkbox",
              id: "AudioCheck-" + _vm.getSong.id,
              name: "audioCheck_" + _vm.getSong.id
            },
            domProps: { checked: _vm.isPlaySong },
            on: {
              change: function($event) {
                return _vm.playSound()
              }
            }
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

/***/ "./node_modules/vuex-class/lib/bindings.js":
/*!*************************************************!*\
  !*** ./node_modules/vuex-class/lib/bindings.js ***!
  \*************************************************/
/*! exports provided: State, Getter, Action, Mutation, namespace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Getter", function() { return Getter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mutation", function() { return Mutation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return namespace; });
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


var State = createBindingHelper('computed', vuex__WEBPACK_IMPORTED_MODULE_1__["mapState"]);
var Getter = createBindingHelper('computed', vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"]);
var Action = createBindingHelper('methods', vuex__WEBPACK_IMPORTED_MODULE_1__["mapActions"]);
var Mutation = createBindingHelper('methods', vuex__WEBPACK_IMPORTED_MODULE_1__["mapMutations"]);
function namespace(namespace, helper) {
    function createNamespacedHelper(helper) {
        function namespacedHelper(a, b) {
            if (typeof b === 'string') {
                var key = b;
                var proto = a;
                return helper(key, { namespace: namespace })(proto, key);
            }
            var type = a;
            var options = merge(b || {}, { namespace: namespace });
            return helper(type, options);
        }
        return namespacedHelper;
    }
    if (helper) {
        console.warn('[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead.');
        return createNamespacedHelper(helper);
    }
    return {
        State: createNamespacedHelper(State),
        Getter: createNamespacedHelper(Getter),
        Mutation: createNamespacedHelper(Mutation),
        Action: createNamespacedHelper(Action)
    };
}
function createBindingHelper(bindTo, mapFn) {
    function makeDecorator(map, namespace) {
        return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_0__["createDecorator"])(function (componentOptions, key) {
            if (!componentOptions[bindTo]) {
                componentOptions[bindTo] = {};
            }
            var mapObject = (_a = {}, _a[key] = map, _a);
            componentOptions[bindTo][key] = namespace !== undefined
                ? mapFn(namespace, mapObject)[key]
                : mapFn(mapObject)[key];
            var _a;
        });
    }
    function helper(a, b) {
        if (typeof b === 'string') {
            var key = b;
            var proto = a;
            return makeDecorator(key, undefined)(proto, key);
        }
        var namespace = extractNamespace(b);
        var type = a;
        return makeDecorator(type, namespace);
    }
    return helper;
}
function extractNamespace(options) {
    var n = options && options.namespace;
    if (typeof n !== 'string') {
        return undefined;
    }
    if (n[n.length - 1] !== '/') {
        return n + '/';
    }
    return n;
}
function merge(a, b) {
    var res = {};
    [a, b].forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            res[key] = obj[key];
        });
    });
    return res;
}


/***/ }),

/***/ "./node_modules/vuex-class/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/vuex-class/lib/index.js ***!
  \**********************************************/
/*! exports provided: State, Getter, Action, Mutation, namespace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bindings */ "./node_modules/vuex-class/lib/bindings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "State", function() { return _bindings__WEBPACK_IMPORTED_MODULE_0__["State"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Getter", function() { return _bindings__WEBPACK_IMPORTED_MODULE_0__["Getter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return _bindings__WEBPACK_IMPORTED_MODULE_0__["Action"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mutation", function() { return _bindings__WEBPACK_IMPORTED_MODULE_0__["Mutation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return _bindings__WEBPACK_IMPORTED_MODULE_0__["namespace"]; });




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

/***/ "./src/js/StoreSelector.ts":
/*!*********************************!*\
  !*** ./src/js/StoreSelector.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * localStorage - не имеют срока годности
 * sessionStorage - очищаются по окончании сеанса страницы, то есть при закрытии страницы.
 *
 * @export
 * @class StoreSelector
 */
var StoreSelector = /** @class */ (function () {
    function StoreSelector(type) {
        if (type === void 0) { type = "local"; }
        if (type === "local") { // localStorage
            this.storage = localStorage;
        }
        else if (type === "session") { // sessionStorage
            this.storage = sessionStorage;
        }
        else {
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
    StoreSelector.prototype._serialize = function (value) {
        return JSON.stringify(value);
    };
    /**
     * Получение значения
     *
     * @param {*} value
     * @param {*} defaultValue
     * @return {*}
     * @memberof StoreSelector
     */
    StoreSelector.prototype._unserialize = function (value, defaultValue) {
        if (!value && !!defaultValue) {
            return defaultValue;
        }
        var val = "";
        try {
            val = JSON.parse(value);
        }
        catch (e) {
            val = value;
        }
        return val !== undefined ? val : defaultValue;
    };
    /**
     * Чтение
     *
     * @param {String} key Ключ
     * @param {*} defaultOptionalValue Значение по умолчанию
     * @return {*}
     * @memberof StoreSelector
     */
    StoreSelector.prototype.get = function (key, defaultOptionalValue) {
        var value = this.storage.getItem(key);
        return this._unserialize(value, defaultOptionalValue);
    };
    /**
     * Запись
     *
     * @param {String} key Ключ
     * @param {*} value Значение
     * @return {*}
     * @memberof StoreSelector
     */
    StoreSelector.prototype.set = function (key, value) {
        this.storage.setItem(key, this._serialize(value));
        return value;
    };
    /**
     * Удаление записи
     *
     * @param {String} key
     * @memberof StoreSelector
     */
    StoreSelector.prototype.remove = function (key) {
        this.storage.removeItem(key);
    };
    /**
     * Очистка хранилища
     *
     * @memberof StoreSelector
     */
    StoreSelector.prototype.clear = function () {
        this.storage.clear();
    };
    return StoreSelector;
}());
/* harmony default export */ __webpack_exports__["default"] = (StoreSelector);


/***/ }),

/***/ "./src/js/app.ts":
/*!***********************!*\
  !*** ./src/js/app.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/js/store/index.js");
/* harmony import */ var _filters_formatSecond2Human__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filters/formatSecond2Human */ "./src/js/filters/formatSecond2Human.ts");
/* harmony import */ var _components_TimerComponent_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/TimerComponent.vue */ "./src/js/components/TimerComponent.vue");
/* eslint no-console: ["error", {allow: ["log"]}]*/




var Favico = __webpack_require__(/*! favico.js */ "./node_modules/favico.js/favico.js");
vue__WEBPACK_IMPORTED_MODULE_0__["default"].filter('formatSecond2Human', _filters_formatSecond2Human__WEBPACK_IMPORTED_MODULE_2__["formatSecond2Human"]);
// Set the name of the hidden property and the change event for visibility
var hidden;
var visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
}
else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
}
else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}
// Добавление в иконку уведомление о количестве просроченных таймеров
var faviconBadge = 0;
var favicon = new Favico({
    animation: "fade"
});
var app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    store: _store__WEBPACK_IMPORTED_MODULE_1__["default"],
    created: function () {
        var _this = this;
        // Уведомление
        this.$root.$on("addNotify", function () {
            faviconBadge++;
            _this.handlerNotify();
        });
        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || hidden === undefined) {
            console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
        }
        else {
            document.addEventListener(visibilityChange, function () {
                _this.handlerNotify();
            }, false);
        }
    },
    methods: {
        handlerNotify: function () {
            var title = document.getElementsByTagName("title")[0];
            if (Object.prototype.hasOwnProperty.call(document, hidden) && faviconBadge) {
                favicon.badge(faviconBadge);
                title.text = "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F - \u0422\u0430\u0439\u043C\u0435\u0440";
            }
            else if (faviconBadge) {
                faviconBadge = 0;
                favicon.reset();
                title.text = "\u0422\u0430\u0439\u043C\u0435\u0440";
            }
        }
    },
    data: function () { return ({
        isShowModal: false
    }); },
    render: function (h) { return h(_components_TimerComponent_vue__WEBPACK_IMPORTED_MODULE_3__["default"]); }
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
/* harmony import */ var _TimerComponent_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimerComponent.vue?vue&type=script&lang=ts& */ "./src/js/components/TimerComponent.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimerComponent_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
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

/***/ "./src/js/components/TimerComponent.vue?vue&type=script&lang=ts&":
/*!***********************************************************************!*\
  !*** ./src/js/components/TimerComponent.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./TimerComponent.vue?vue&type=script&lang=ts& */ "./node_modules/ts-loader/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/components/TimerComponent.vue?vue&type=script&lang=ts&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_TimerComponent_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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

/***/ "./src/js/filters/formatSecond2Human.ts":
/*!**********************************************!*\
  !*** ./src/js/filters/formatSecond2Human.ts ***!
  \**********************************************/
/*! exports provided: formatSecond2Human */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSecond2Human", function() { return formatSecond2Human; });
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
__webpack_require__(/*! moment-duration-format */ "./node_modules/moment-duration-format/lib/moment-duration-format.js");
/**
 * Преобразовать секунды в 00:00:00
 *
 * @export
 * @param {Number} seconds
 * @return {String}
 */
function formatSecond2Human(seconds) {
    var duration = moment.duration(seconds, "seconds");
    return duration.format("hh:mm:ss", { trim: false });
}


/***/ }),

/***/ "./src/js/functions.ts":
/*!*****************************!*\
  !*** ./src/js/functions.ts ***!
  \*****************************/
/*! exports provided: IDGenerator, AdjustingInterval, timeStr2Array, time2Second, TimerSound, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDGenerator", function() { return IDGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdjustingInterval", function() { return AdjustingInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeStr2Array", function() { return timeStr2Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time2Second", function() { return time2Second; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerSound", function() { return TimerSound; });
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
__webpack_require__(/*! moment-duration-format */ "./node_modules/moment-duration-format/lib/moment-duration-format.js");
/**
 * Генератор ID
 *
 * @export
 * @class IDGenerator
 */
var IDGenerator = /** @class */ (function () {
    function IDGenerator() {
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
    IDGenerator.prototype._getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Создание случайного ID
     *
     * @returns {number}
     * @memberof IDGenerator
     */
    IDGenerator.prototype.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";
        for (var i = 0; i < this.length; ++i) {
            var index = this._getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        return Number(id);
    };
    return IDGenerator;
}());

/**
 * Саморегулирующийся интервал для учета дрейфа
 *
 * @export
 * @class AdjustingInterval
 */
var AdjustingInterval = /** @class */ (function () {
    /**
     * Creates an instance of AdjustingInterval.
     *
     * @param {AdjustingInterval~callback} callback
     * @param {*} interval
     * @param {AdjustingInterval~errorCallback} [errorCallback=null]
     * @memberof AdjustingInterval
     */
    function AdjustingInterval(callback, interval, errorCallback) {
        this.errorCallback = null;
        this._running = false;
        this.interval = interval;
        this.callback = callback;
        this.errorCallback = errorCallback;
        this._expected = 0;
        this._timeout = 0;
    }
    AdjustingInterval.prototype.start = function () {
        var _this = this;
        this._running = true;
        this._expected = Date.now() + this.interval;
        this._timeout = window.setTimeout(function () { return _this._step(); }, this.interval);
    };
    AdjustingInterval.prototype.stop = function () {
        this._running = false;
        window.clearTimeout(this._timeout);
    };
    AdjustingInterval.prototype._step = function () {
        var _this = this;
        var drift = Date.now() - this._expected;
        if (drift > this.interval) {
            if (this.errorCallback) {
                this.errorCallback();
            }
        }
        this.callback();
        if (this._running) {
            this._expected += this.interval;
            this._timeout = window.setTimeout(function () { return _this._step(); }, Math.max(0, this.interval - drift));
        }
    };
    return AdjustingInterval;
}());

/**
 * Преобразовать секунды в массив [час, минута, секунда]
 *
 * @export
 * @param {number} time
 * @returns {number[]}
 */
function timeStr2Array(time) {
    return moment
        .duration(time, "seconds")
        .format("hh:mm:ss", { trim: false })
        .split(":")
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
function time2Second(hour, minute, second) {
    var begin = moment.duration({
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
var TimerSound = /** @class */ (function () {
    /**
     * Creates an instance of TimerSound.

     * @param {string} [path=``]
     * @memberof TimerSound
     */
    function TimerSound(path) {
        if (path === void 0) { path = ""; }
        this.path = path;
    }
    /**
     * Запуск аудио
     *
     * @param {Number|String} id
     * @memberof TimerSound
     */
    TimerSound.prototype.play = function (id) {
        var _this = this;
        this.stopAll(function () {
            var el = document.getElementById("sound-" + id);
            if (el) {
                el.play();
            }
            else {
                var a = document.createElement("audio");
                a.src = "" + _this.path + id + ".mp3";
                a.volume = 0.75;
                a.setAttribute("autoplay", "true");
                a.setAttribute("loop", "true");
                a.setAttribute("id", "sound-" + id);
                document.body.appendChild(a);
            }
        });
    };
    /**
     * Остановка аудио
     *
     * @param {Number|String} id
     * @memberof TimerSound
     */
    TimerSound.prototype.stop = function (id) {
        var el = document.getElementById("sound-" + id);
        this._stopSong(el);
    };
    /**
     * Остановка аудио
     *
     * @param {HTMLMediaElement} el
     * @memberof TimerSound
     */
    TimerSound.prototype._stopSong = function (el) {
        if (el && el.duration > 0 && !el.paused) {
            el.pause();
            el.currentTime = 0;
        }
    };
    /**
     * Остановка всех аудио
     *
     * @param {TimerSound~callback} fn
     * @memberof TimerSound
     */
    TimerSound.prototype.stopAll = function (fn) {
        var _this = this;
        document.querySelectorAll("audio[id^=sound-]").forEach(function (el) {
            _this._stopSong(el);
        });
        if (fn) {
            fn();
        }
    };
    return TimerSound;
}());

/* harmony default export */ __webpack_exports__["default"] = ({ IDGenerator: IDGenerator, AdjustingInterval: AdjustingInterval, timeStr2Array: timeStr2Array, time2Second: time2Second, TimerSound: TimerSound });


/***/ }),

/***/ "./src/js/store/index.js":
/*!*******************************!*\
  !*** ./src/js/store/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/store/modules/timer.ts");
 // import 'es6-promise/auto';



vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    timer: _modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}));

/***/ }),

/***/ "./src/js/store/modules/timer.ts":
/*!***************************************!*\
  !*** ./src/js/store/modules/timer.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StoreSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StoreSelector */ "./src/js/StoreSelector.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functions */ "./src/js/functions.ts");
/* eslint no-shadow: ["error", { "allow": ["state", "timers", "getters"] }]*/


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
        passed: 0,
    },
    // Список звуков уведомлений
    songs: [
        {
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
        }
    ]
};
// Получаем сохраненные таймеры
var StoreTimers = new _StoreSelector__WEBPACK_IMPORTED_MODULE_0__["default"]("local");
// Получение сохраненных таймеров
var timers = StoreTimers.get("timers", []);
// Установка таймера по умолчанию, если нет таймеров
if (!timers.length) {
    var generator = new _functions__WEBPACK_IMPORTED_MODULE_1__["IDGenerator"]();
    timers.push(Object.assign(state.defaultParams, {
        id: generator.generate(),
        song: state.songs[0]
    }));
    // @TODO - Вынести в commit
    StoreTimers.set("timers", timers);
}
// Установка таймеров в state
state = Object.assign(state, { timers: timers });
// getters
var getters = {
    // Получить настройки по умолчанию
    getDefaultParams: function (state) {
        return state.defaultParams;
    },
    // Поиск таймера
    findTimer: function (state) { return function (id) {
        return state.timers.find(function (item) { return item.id === id; });
    }; }
};
// actions
var actions = {
    // Обновить пройденное время таймера
    updatePassed: function (_a, timer) {
        var commit = _a.commit, state = _a.state;
        var newTimers = state.timers.map(function (item) {
            if (item.id === timer.id && timer.passed < item.begin) {
                item.passed = timer.passed + 1;
            }
            return item;
        });
        commit("updateTimersStore", newTimers);
    },
    // Смена состояния активности
    changeActivity: function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var id = _b.id, isActive = _b.isActive;
        var newTimers = state.timers.map(function (item) {
            if (item.id === id) {
                item.isActive = isActive;
            }
            return item;
        });
        commit("updateTimersStore", newTimers);
    },
    // Сброс пройденного времени
    resetPassed: function (_a, id) {
        var commit = _a.commit, state = _a.state;
        var newTimers = state.timers.map(function (item) {
            if (item.id === id) {
                item.passed = 0;
            }
            return item;
        });
        commit("updateTimersStore", newTimers);
    },
    // Удаление таймера
    removeTimer: function (_a, id) {
        var commit = _a.commit, state = _a.state;
        var newTimers = state.timers.filter(function (item) { return item.id !== id; });
        commit("updateTimersStore", newTimers);
    },
    // Сохранение таймера
    saveTimer: function (_a, data) {
        var commit = _a.commit, state = _a.state, getters = _a.getters;
        var begin = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["time2Second"])(data.hour, data.minute, data.second);
        var timer = getters.findTimer(data.id);
        if (timer) {
            var newTimers = state.timers.map(function (item) {
                if (item.id === data.id) {
                    item.name = data.name;
                    item.song = data.song;
                    item.begin = begin;
                    item.passed = 0; // Сброс пройденного времени
                }
                return item;
            });
            commit("updateTimersStore", newTimers);
        }
        else {
            var generator = new _functions__WEBPACK_IMPORTED_MODULE_1__["IDGenerator"]();
            commit("addTimerStore", Object.assign(state.defaultParams, {
                id: generator.generate(),
                name: data.name,
                song: data.song,
                begin: begin
            }));
        }
    }
};
// mutations
var mutations = {
    // Обновить таймеры
    updateTimersStore: function (state, timers) {
        state.timers = timers;
        StoreTimers.set("timers", state.timers);
    },
    // Добавить таймер
    addTimerStore: function (state, timer) {
        state.timers.push(timer);
        StoreTimers.set("timers", state.timers);
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

/***/ "./src/js/timeChecker.ts":
/*!*******************************!*\
  !*** ./src/js/timeChecker.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Реакция на определённое время
 */
// полнейшее клонирование объекта
// http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== "object") {
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
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
var default_1 = /** @class */ (function () {
    function default_1(cfg) {
        if (cfg === void 0) { cfg = {
            // Бесконечно выполнять
            infinity: true,
            // если эта функция вернёт true, проверки сбросятся в исходное состояние
            updateCheck: function () { return false; },
            // Массив с проверками
            checks: []
        }; }
        this.cfg = this.cfgTmp = this.config(cfg);
        this.dateOld = this.getDate(); // дата предыдущей проверки
    }
    // получение и установка настроек
    default_1.prototype.config = function (cfg) {
        this.cfg = clone(cfg); // кеш настроек
        this.cfgTmp = clone(cfg); // настройки, с которыми работаем
        return this.cfg;
    };
    // обновление проверок
    default_1.prototype.update = function () {
        this.cfgTmp = clone(this.cfg);
    };
    // получение даты
    default_1.prototype.getDate = function () {
        return new Date();
    };
    default_1.prototype.check = function () {
        var _this = this;
        if (!this.cfg) {
            return;
        }
        var date = this.getDate();
        if (this.cfg.updateCheck(this.dateOld, date)) {
            this.update();
        }
        this.cfgTmp.checks.forEach(function (item, i) {
            if (item.check(date)) {
                item.action();
                // Нужно ли выполнять бесконечно
                if (!_this.cfg.infinity) {
                    _this.cfgTmp.checks.splice(i, 1);
                }
            }
        });
        this.dateOld = this.getDate();
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/js/app.ts ./src/css/styles.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\var\opt\apache\htdocs\timer-vue\src\js\app.ts */"./src/js/app.ts");
module.exports = __webpack_require__(/*! E:\var\opt\apache\htdocs\timer-vue\src\css\styles.css */"./src/css/styles.css");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);