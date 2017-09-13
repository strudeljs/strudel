/*!
 * Strudel.js v0.3.3
 * (c) 2016-2017 Mateusz Łuczak
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Strudel = global.Strudel || {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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

var select = function select(selector, context) {
  if (context) {
    return byCss(selector, context);
  }

  return byCss(selector);
};

var byCss = function byCss(selector, context) {
  return (context || document).querySelectorAll(selector);
};

var Element = function () {
  function Element(selector, context) {
    classCallCheck(this, Element);

    if (selector instanceof Element) {
      return selector;
    }

    if (typeof selector === 'string') {
      selector = select(selector, context);
    }

    if (selector && selector.nodeName) {
      selector = [selector];
    }

    this._nodes = this.slice(selector);
  }

  createClass(Element, [{
    key: 'array',
    value: function array(callback) {
      callback = callback;
      var self = this;
      return this._nodes.reduce(function (list, node, i) {
        var val;
        if (callback) {
          val = callback.call(self, node, i);
          if (!val) val = false;
          if (typeof val === 'string') val = u(val);
          if (val instanceof Element) val = val._nodes;
        } else {
          val = node.innerHTML;
        }
        return list.concat(val !== false ? val : []);
      }, []);
    }
  }, {
    key: 'str',
    value: function str(node, i) {
      return function (arg) {
        if (typeof arg === 'function') {
          return arg.call(this, node, i);
        }

        return arg.toString();
      };
    }
  }, {
    key: 'filter',
    value: function filter(selector) {
      var callback = function callback(node) {
        node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
        return node.matches(selector || '*');
      };

      if (typeof selector === 'function') callback = selector;

      if (selector instanceof Element) {
        callback = function callback(node) {
          return selector._nodes.indexOf(node) !== -1;
        };
      }

      return new Element(this._nodes.filter(callback));
    }
  }, {
    key: 'first',
    value: function first() {
      return this._nodes[0] || false;
    }
  }, {
    key: 'slice',
    value: function slice(pseudo) {
      if (!pseudo || pseudo.length === 0 || typeof pseudo === 'string' || pseudo.toString() === '[object Function]') return [];

      return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
    }
  }, {
    key: 'unique',
    value: function unique() {
      return new Element(this._nodes.reduce(function (clean, node) {
        var isTruthy = node !== null && node !== undefined && node !== false;
        return isTruthy && clean.indexOf(node) === -1 ? clean.concat(node) : clean;
      }, []));
    }
  }, {
    key: 'args',
    value: function args(_args, node, i) {
      if (typeof _args === 'function') {
        _args = _args(node, i);
      }

      if (typeof _args !== 'string') {
        _args = this.slice(_args).map(this.str(node, i));
      }

      return _args.toString().split(/[\s,]+/).filter(function (e) {
        return e.length;
      });
    }
  }, {
    key: 'each',
    value: function each(callback) {
      this._nodes.forEach(callback.bind(this));
      return this;
    }
  }, {
    key: 'eacharg',
    value: function eacharg(args, callback) {
      return this.each(function (node, i) {
        this.args(args, node, i).forEach(function (arg) {
          callback.call(this, node, arg);
        }, this);
      });
    }
  }, {
    key: 'isInPage',
    value: function isInPage(node) {
      return node === document.body ? false : document.body.contains(node);
    }
  }, {
    key: 'map',
    value: function map(callback) {
      return callback ? new Element(this.array(callback)).unique() : this;
    }
  }, {
    key: 'adjacent',
    value: function adjacent(html, data, callback) {
      if (typeof data === 'number') {
        if (data === 0) {
          data = [];
        } else {
          data = new Array(data).join().split(',').map(Number.call, Number);
        }
      }

      return this.each(function (node, j) {
        var fragment = document.createDocumentFragment();

        new Element(data || {}).map(function (el, i) {
          var part = typeof html === 'function' ? html.call(this, el, i, node, j) : html;

          if (typeof part === 'string') {
            return this.generate(part);
          }

          return u(part);
        }).each(function (n) {
          this.isInPage(n) ? fragment.appendChild(u(n).clone().first()) : fragment.appendChild(n);
        });

        callback.call(this, node, fragment);
      });
    }
  }, {
    key: 'html',
    value: function html(text) {
      if (text === undefined) {
        return this.first().innerHTML || '';
      }

      return this.each(function (node) {
        node.innerHTML = text;
      });
    }
  }, {
    key: 'text',
    value: function text(_text) {
      if (_text === undefined) {
        return this.first().textContent || '';
      }

      return this.each(function (node) {
        node.textContent = _text;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      return this.each(function (node) {
        node.parentNode.removeChild(node);
      });
    }
  }, {
    key: 'append',
    value: function append(html, data) {
      return this.adjacent(html, data, function (node, fragment) {
        node.appendChild(fragment);
      });
    }
  }, {
    key: 'find',
    value: function find(selector) {
      return this.map(function (node) {
        return new Element(selector || '*', node);
      });
    }
  }, {
    key: 'addClass',
    value: function addClass() {
      return this.eacharg(arguments, function (el, name) {
        el.classList.add(name);
      });
    }
  }, {
    key: 'removeClass',
    value: function removeClass() {
      return this.eacharg(arguments, function (el, name) {
        el.classList.remove(name);
      });
    }
  }, {
    key: 'on',
    value: function on(events, cb, cb2) {
      if (typeof cb === 'string') {
        var sel = cb;
        cb = function cb(e) {
          var args = arguments;
          new Element(e.currentTarget).find(sel).each(function (target) {
            if (target === e.target || target.contains(e.target)) {
              try {
                Object.defineProperty(e, 'currentTarget', {
                  get: function get$$1() {
                    return target;
                  }
                });
              } catch (err) {}
              cb2.apply(target, args);
            }
          });
        };
      }

      var callback = function callback(e) {
        return cb.apply(this, [e].concat(e.detail || []));
      };

      return this.eacharg(events, function (node, event) {
        node.addEventListener(event, callback);

        node._e = node._e || {};
        node._e[event] = node._e[event] || [];
        node._e[event].push(callback);
      });
    }
  }, {
    key: 'off',
    value: function off(eventName, listener) {
      this['0'].removeEventListener(eventName, listener, false);
    }
  }, {
    key: 'trigger',
    value: function trigger(events) {
      var data = this.slice(arguments).slice(1);

      return this.eacharg(events, function (node, event) {
        var ev;
        var opts = { bubbles: true, cancelable: true, detail: data };

        try {
          ev = new window.CustomEvent(event, opts);
        } catch (e) {
          ev = document.createEvent('CustomEvent');
          ev.initCustomEvent(event, true, true, data);
        }

        node.dispatchEvent(ev);
      });
    }
  }, {
    key: 'attr',
    value: function attr(name, value, data) {
      data = data ? 'data-' : '';

      if (value !== undefined) {
        var nm = name;
        name = {};
        name[nm] = value;
      }

      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        return this.each(function (node) {
          for (var key in name) {
            node.setAttribute(data + key, name[key]);
          }
        });
      }

      return this.length ? this.first().getAttribute(data + name) : '';
    }
  }, {
    key: 'data',
    value: function data(name, value) {
      if (!name) {
        return this.first().dataset;
      }
      return this.attr(name, value, true);
    }
  }]);
  return Element;
}();

var $ = (function (selector, element) {
  return new Element(selector, element);
});

/**
 * @classdesc Class linking components with DOM
 * @class
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
              var el = $(element);
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
  return typeof obj === 'function' || false;
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
      var listeners = this._listeners.get(label);

      if (listeners && listeners.length) {
        var index = listeners.reduce(function (i, listener, index) {
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

var delegate = function delegate(element, eventName, selector, listener) {
  element.on(eventName, selector, listener);
};

var delegateEvents = function delegateEvents(context, events) {
  if (!events) {
    return false;
  }

  return Object.keys(events).forEach(function (key) {
    var method = events[key];
    var match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.$element) {
      delegate(context.$element, match[1], match[2], method.bind(context));
    }
  });
};

var bindElements = function bindElements(context, elements) {
  if (!elements) {
    return false;
  }

  return Object.keys(elements).forEach(function (key) {
    var property = elements[key];
    if (context.$element) {
      context[property] = context.$element.find(key);
    }
  });
};

var emitter = new EventEmitter();

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */

var Component = function () {
  function Component() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        element = _ref.element,
        data = _ref.data;

    classCallCheck(this, Component);

    this.$element = element;
    this.$data = data;

    delegateEvents(this, this._events);
    bindElements(this, this._els);

    this.beforeInit();
    this.init();
  }

  /**
   * Facade for EventEmitter addListener
   * @link EventEmitter#addListener
   */


  createClass(Component, [{
    key: '$on',
    value: function $on(label, callback) {
      emitter.addListener(label, callback);
    }

    /**
     * Facade for EventEmitter removeListener
     * @link EventEmitter#removeListener
     */

  }, {
    key: '$off',
    value: function $off(label, callback) {
      emitter.removeListener(label, callback);
    }

    /**
     * Facade for EventEmitter emit
     * @link EventEmitter#emit
     */

  }, {
    key: '$emit',
    value: function $emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      emitter.emit.apply(emitter, [label].concat(args));
    }

    /**
     * Function called before component is initialized
     * @interface
     */

  }, {
    key: 'beforeInit',
    value: function beforeInit() {}

    /**
     * Function called when component is initialized
     * @interface
     */

  }, {
    key: 'init',
    value: function init() {}

    /**
     * Function called before component is destroyed
     * @interface
     */

  }, {
    key: 'finalize',
    value: function finalize() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$element._instance = null;
      this.finalize();
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
  var targetProto = target.prototype;
  var sourceProto = source.prototype;

  Object.getOwnPropertyNames(sourceProto).forEach(function (name) {
    if (name !== 'constructor') {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
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

/**
 * Element decorator for functions
 * @param {Object} params
 * @returns (Function} decorator
 */
function decorator$1(selector) {
  return function _decorator(klass, property) {
    if (!selector) {
      throw new Error('Selector must be provided for El decorator');
    }
    if (!klass._els) {
      klass._els = [];
    }
    klass._els[selector] = property;
  };
}

bootstrap();

exports.Component = component$1;
exports.EventEmitter = EventEmitter;
exports.Evt = decorator;
exports.El = decorator$1;
exports.element = $;

Object.defineProperty(exports, '__esModule', { value: true });

})));
