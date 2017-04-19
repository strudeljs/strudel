/*!
 * Strudel.js v0.1.3
 * (c) 2016-2017 Mateusz Łuczak
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Strudel = global.Strudel || {})));
}(this, (function (exports) { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DOMElement = function () {
  function DOMElement(element) {
    classCallCheck(this, DOMElement);

    this["0"] = element;
  }

  createClass(DOMElement, [{
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
    key: "on",
    value: function on(eventName, delegate, listener) {
      this["0"].addEventListener(eventName, function (e) {
        if (e.target && e.target.matches(delegate)) {
          listener(e);
        }
      }, false);
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this["0"].removeEventListener(eventName, listener, false);
    }
  }, {
    key: "trigger",
    value: function trigger(eventName, data) {
      this["0"].dispatchEvent(new CustomEvent(eventName, {
        detail: data,
        bubbles: true
      }));
    }
  }, {
    key: "data",
    value: function data() {
      return this["0"].dataset;
    }
  }]);
  return DOMElement;
}();

/**
 * Class linking components with DOM
 */

var Linker = function () {
  /**
   * @constructor
   * @param {Registry} component registry
   */
  function Linker(registry) {
    classCallCheck(this, Linker);

    this.registry = registry;
  }

  /**
   *
   */


  createClass(Linker, [{
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
              var el = new DOMElement(element);
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

/**
 * Registry
 * @type {Map}
 */
var registry$1 = new Map();

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
    classCallCheck(this, Registry);

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Returns keys from registry
   * @returns {Iterator.<string>}
     */


  createClass(Registry, [{
    key: "getSelectors",
    value: function getSelectors() {
      return registry$1.keys();
    }

    /**
     * Clears registry
     */

  }, {
    key: "clear",
    value: function clear() {
      registry$1.clear();
    }

    /**
     * Returns component constructor for selector from map
     * @param {string} selector
     * @returns {Function} constructor
       */

  }, {
    key: "getComponent",
    value: function getComponent(selector) {
      return registry$1.get(selector);
    }

    /**
     * Adds selector/constructor pair to map
     * @param {string} selector
     * @param {Function} constructor
       */

  }, {
    key: "registerComponent",
    value: function registerComponent(selector, klass) {
      registry$1.set(selector, klass);
    }
  }]);
  return Registry;
}();

var registry = new Registry();
var linker = new Linker(registry);

var bootstrap = function bootstrap() {
  document.addEventListener('DOMContentLoaded', function () {
    return linker.linkAll();
  });
  document.addEventListener('contentloaded', function () {
    return linker.linkAll();
  });
};

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
    classCallCheck(this, EventEmitter);

    this._listeners = new Map();
  }

  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */


  createClass(EventEmitter, [{
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

var DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

var delegateEvents = function delegateEvents(context, events) {
  for (var key in events) {
    var method = events[key];
    var match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.element) {
      delegate(context.element, match[1], match[2], method.bind(context));
    }
  }
};

var delegate = function delegate(element, eventName, selector, listener) {
  element.on(eventName, selector, listener);
};

var emitter = new EventEmitter();

/**
 * Base class for all components, implementing event emitter
 */

var Component = function () {
  function Component() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        element = _ref.element,
        data = _ref.data;

    classCallCheck(this, Component);

    this.element = element;
    this.data = data;

    delegateEvents(this, this._events);

    this.beforeInit && this.beforeInit();
    this.init && this.init();
  }

  /**
   * Facade for EventEmitter addListener
   * @link EventEmitter#addListener
   */


  createClass(Component, [{
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

var registry$2 = new Registry();

var component = function component(target, selector) {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  var component = function (_Component) {
    inherits(component, _Component);

    function component() {
      var _ref;

      classCallCheck(this, component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return possibleConstructorReturn(this, (_ref = component.__proto__ || Object.getPrototypeOf(component)).call.apply(_ref, [this].concat(args)));
    }

    return component;
  }(Component);

  mixin(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  registry$2.registerComponent(selector, component);

  return component;
};

var component$1 = (function (selector) {
  return function (target) {
    return component(target, selector);
  };
});

/**
 * Component decorator for functions
 * @param {Object} params
 * @returns (Function} decorator
 */
function decorator(event) {
  return function _decorator(klass, method) {
    if (!event) {
      throw new Error('Event descriptor must be provided for Evt decorator');
    }
    if (!klass._events) {
      klass._events = [];
    }
    klass._events[event] = klass[method];
  };
}

bootstrap();

exports.Component = component$1;
exports.EventEmitter = EventEmitter;
exports.Evt = decorator;

Object.defineProperty(exports, '__esModule', { value: true });

})));
