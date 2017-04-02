(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Strudel", [], factory);
	else if(typeof exports === 'object')
		exports["Strudel"] = factory();
	else
		root["Strudel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Check if passed parameter is a function
 * @param obj
 * @returns {boolean}
 */
var isFunction = function isFunction(obj) {
  return typeof obj == 'function' || false;
};

/**
 * Simple Event Emitter implementation
 */

var EventEmitter = function () {
  /**
   * @constructor
   */
  function EventEmitter() {
    babelHelpers.classCallCheck(this, EventEmitter);

    this._listeners = new Map();
  }

  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */


  babelHelpers.createClass(EventEmitter, [{
    key: 'addListener',
    value: function addListener(label, callback) {
      this._listeners.has(label) || this._listeners.set(label, []);
      this._listeners.get(label).push(callback);
    }

    /**
     * Remove event listener from registry
     * @param {string} label
     * @param {Function} callback
     * @returns {boolean}
     */

  }, {
    key: 'removeListener',
    value: function removeListener(label, callback) {
      var listeners = this._listeners.get(label),
          index = void 0;

      if (listeners && listeners.length) {
        index = listeners.reduce(function (i, listener, index) {
          return isFunction(listener) && listener === callback ? i = index : i;
        }, -1);

        if (index > -1) {
          listeners.splice(index, 1);
          this._listeners.set(label, listeners);
          return true;
        }
      }
      return false;
    }

    /**
     * Notifies liteners attached to event
     * @param {string} label
     * @param args
     * @returns {boolean}
     */

  }, {
    key: 'emit',
    value: function emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this._listeners.get(label);

      if (listeners && listeners.length) {
        listeners.forEach(function (listener) {
          listener.apply(undefined, args);
        });
        return true;
      }
      return false;
    }
  }]);
  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["a"] = EventEmitter;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Registry
 * @type {Map}
 */
var registry = new Map();

/**
 * Singleton instance
 * @type {Object}
 */
var instance = null;

/**
 * Simple registry for storing selector-constructor pairs
 */

var Registry = function () {

  /**
   * @constructor
   */
  function Registry() {
    babelHelpers.classCallCheck(this, Registry);

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Returns keys from registry
   * @returns {Iterator.<string>}
     */


  babelHelpers.createClass(Registry, [{
    key: "getSelectors",
    value: function getSelectors() {
      return registry.keys();
    }

    /**
     * Clears registry
     */

  }, {
    key: "clear",
    value: function clear() {
      registry.clear();
    }

    /**
     * Returns component constructor for selector from map
     * @param {string} selector
     * @returns {Function} constructor
       */

  }, {
    key: "getComponent",
    value: function getComponent(selector) {
      return registry.get(selector);
    }

    /**
     * Adds selector/constructor pair to map
     * @param {string} selector
     * @param {Function} constructor
       */

  }, {
    key: "registerComponent",
    value: function registerComponent(selector, klass) {
      registry.set(selector, klass);
    }
  }]);
  return Registry;
}();

/* harmony default export */ __webpack_exports__["a"] = Registry;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linker__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__registry__ = __webpack_require__(1);



var registry = new __WEBPACK_IMPORTED_MODULE_1__registry__["a" /* default */]();
var linker = new __WEBPACK_IMPORTED_MODULE_0__linker__["a" /* default */](registry);

var bootstrap = function bootstrap() {
  document.addEventListener('DOMContentLoaded', function () {
    return linker.linkAll();
  });
  document.addEventListener('contentloaded', function () {
    return linker.linkAll();
  });
};

/* harmony default export */ __webpack_exports__["a"] = bootstrap;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_registry__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_mixin__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["a"] = decorator;




var registry = new __WEBPACK_IMPORTED_MODULE_0__core_registry__["a" /* default */]();

/**
 * Component decorator for classes
 * @param {Object} params
 * @returns (Function} decorator
 */
function decorator(selector) {
  return function _decorator(klass) {
    if (!selector) {
      throw new Error('Selector must be provided for Component decorator');
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_mixin__["a" /* default */])(klass, __WEBPACK_IMPORTED_MODULE_1__core_component__["a" /* default */]);
    Object.defineProperty(klass.prototype, '_selector', { value: selector });
    registry.registerComponent(selector, klass);
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_eventemitter__ = __webpack_require__(0);


var emitter = new __WEBPACK_IMPORTED_MODULE_0__util_eventemitter__["a" /* default */]();

/**
 * Base class for all components, implementing event emitter
 */

var Component = function () {
  function Component(_ref) {
    var element = _ref.element,
        data = _ref.data;
    babelHelpers.classCallCheck(this, Component);

    this.element = element;
    this.data = data;
  }

  /**
   * Facade for EventEmitter addListener
   * @link EventEmitter#addListener
   */


  babelHelpers.createClass(Component, [{
    key: 'on',
    value: function on(label, callback) {
      emitter.addListener(label, callback);
    }

    /**
     * Facade for EventEmitter removeListener
     * @link EventEmitter#removeListener
     */

  }, {
    key: 'off',
    value: function off(label, callback) {
      emitter.removeListener(label, callback);
    }

    /**
     * Facade for EventEmitter emit
     * @link EventEmitter#emit
     */

  }, {
    key: 'emit',
    value: function emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      emitter.emit.apply(emitter, [label].concat(args));
    }
  }]);
  return Component;
}();

/* harmony default export */ __webpack_exports__["a"] = Component;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var DOMElement = function () {
  function DOMElement(element) {
    babelHelpers.classCallCheck(this, DOMElement);

    this["0"] = element;
  }

  babelHelpers.createClass(DOMElement, [{
    key: "html",
    value: function html(_html) {
      if (!arguments.length) {
        return this["0"].innerHTML;
      }
      this["0"].innerHTML = _html;
      return this;
    }
  }, {
    key: "detach",
    value: function detach() {
      this["0"].remove();
      return this;
    }
  }, {
    key: "append",
    value: function append(element) {
      this["0"].appendChild(element);
      return this;
    }
  }, {
    key: "find",
    value: function find(selector) {
      return this["0"].querySelector(selector);
    }
  }, {
    key: "addClass",
    value: function addClass() {
      this["0"].classList.add(className);
      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this["0"].classList.remove(className);
      return this;
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className, condition) {
      this["0"].classList.toggle(className, condition);
      return this;
    }
  }, {
    key: "data",
    value: function data() {
      return this["0"].dataset;
    }
  }]);
  return DOMElement;
}();

/* harmony default export */ __webpack_exports__["a"] = DOMElement;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(5);


/**
 * Class linking components with DOM
 */

var Linker = function () {
  /**
   * @constructor
   * @param {Registry} component registry
   */
  function Linker(registry) {
    babelHelpers.classCallCheck(this, Linker);

    this.registry = registry;
  }

  /**
   *
   */


  babelHelpers.createClass(Linker, [{
    key: 'linkAll',
    value: function linkAll() {
      this.link(document);
    }

    /**
     * Iterates over selectors in registry, find occurrences in container and initialize components
     * @param {DOMElement} container
     */

  }, {
    key: 'link',
    value: function link(container) {
      var _this = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var selector = _step.value;

          [].forEach.call(container.querySelectorAll(selector), function (element) {
            if (!element._instance) {
              var el = new __WEBPACK_IMPORTED_MODULE_0__dom__["a" /* default */](element);
              element._instance = _this.createComponent(el, _this.registry.getComponent(selector));
            }
          });
        };

        for (var _iterator = this.registry.getSelectors()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Creates instance of {Component} for provided DOM element
     * @param {DOMElement} element
     * @param {Function} constructor
       */

  }, {
    key: 'createComponent',
    value: function createComponent(element, klass) {
      var data = element.data();
      return new klass({ element: element, data: data });
    }
  }]);
  return Linker;
}();

/* harmony default export */ __webpack_exports__["a"] = Linker;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
var mixin = function mixin(target, source) {
  target = target.prototype;
  source = source.prototype;

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (name !== "constructor") {
      Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    }
  });
};

/* harmony default export */ __webpack_exports__["a"] = mixin;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_bootstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__decorators_component__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_1__decorators_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_eventemitter__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return __WEBPACK_IMPORTED_MODULE_2__util_eventemitter__["a"]; });


var Strudel = {};
Strudel.version = '0.1.0';

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_bootstrap__["a" /* default */])();




/***/ })
/******/ ]);
});