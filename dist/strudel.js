/*!
 * Strudel.js v0.7.0
 * (c) 2016-2018 Mateusz Łuczak
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

/* eslint-disable */

var selectors = {};

selectors[/^\.[\w\-]+$/] = function (param) {
  return document.getElementsByClassName(param.substring(1));
};

selectors[/^\w+$/] = function (param) {
  return document.getElementsByTagName(param);
};

selectors[/^\#[\w\-]+$/] = function (param) {
  return document.getElementById(param.substring(1));
};

selectors[/^</] = function (param) {
  return new Element().generate(param);
};

/**
 * Wrapper for query selector
 * @param {String} selector - CSS selector
 * @param {Node} context - Node to select from
 * @returns {NodeList}
 */
var byCss = function byCss(selector, context) {
  return (context || document).querySelectorAll(selector);
};

/**
 * Wrapper for byCss
 * @param {String} selector
 * @param {Node} context
 * @returns {NodeList}
 */
var select = function select(selector, context) {
  selector = selector.replace(/^\s*/, '').replace(/\s*$/, '');

  if (context) {
    return byCss(selector, context);
  }

  for (var key in selectors) {
    context = key.split('/');
    if (new RegExp(context[1], context[2]).test(selector)) {
      return selectors[key](selector);
    }
  }

  return byCss(selector);
};

// Store all of the operations to perform when cloning elements
var mirror = {
  /**
   * Copy all JavaScript events of source node to destination node.
   */
  events: function events(src, dest) {
    if (!src._e) return;

    for (var type in src._e) {
      src._e[type].forEach(function (event) {
        new Element(dest).on(type, event);
      });
    }
  },

  /**
   * Copy select input value to its clone.
   */
  select: function select(src, dest) {
    if (new Element(src).is('select')) {
      dest.value = src.value;
    }
  },

  /**
   * Copy textarea input value to its clone
   */
  textarea: function textarea(src, dest) {
    if (new Element(src).is('textarea')) {
      dest.value = src.value;
    }
  }
};

/**
 * @classdesc Element class used for DOM manipulation
 * @class
 */

var Element = function () {
  /**
   * @constructor
   * @param {string} selector - CSS selector
   * @param {Node} context - Node to wrap into Element
   * @returns {Element}
   */
  function Element(selector, context) {
    classCallCheck(this, Element);

    if (selector instanceof Element) {
      return selector;
    }

    if (typeof selector === 'string') {
      selector = select(selector, context);
    }

    if (selector && selector.nodeName || selector && selector === window) {
      selector = [selector];
    }

    this._nodes = this.slice(selector);
  }

  /**
   * Returns size of nodes
   */


  createClass(Element, [{
    key: 'array',


    /**
     * Extracts structured data from DOM
     * @param {Function} callback - A callback to be called on each node. Returned value is added to the set
     * @returns {*}
     */
    value: function array(callback) {
      var self = this;
      return this._nodes.reduce(function (list, node, i) {
        var val = void 0;
        if (callback) {
          val = callback.call(self, node, i);
          if (!val) val = false;
          if (typeof val === 'string') val = new Element(val);
          if (val instanceof Element) val = val._nodes;
        } else {
          val = node.innerHTML;
        }
        return list.concat(val !== false ? val : []);
      }, []);
    }

    /**
     * Create a string from different things
     * @private
     */

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

    /**
     * Check the current matched set of elements against a selector and return true if at least one of these elements matches the given arguments.
     * @param {selector} selector - A string containing a selector expression to match elements against.
     * @returns {boolean}
     */

  }, {
    key: 'is',
    value: function is(selector) {
      return this.filter(selector).length > 0;
    }

    /**
     * Reduce the set of matched elements to those that match the selector or pass the function's test.
     * @param {selector} selector A string containing a selector expression to match elements against.
     * @returns {Element}
     */

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

    /**
     * Reduce the set of matched elements to the one at the specified index.
     * @param {Number} index - An integer indicating the 0-based position of the element.
     * @returns {Element|boolean}
     */

  }, {
    key: 'eq',
    value: function eq(index) {
      return new Element(this._nodes[index]) || false;
    }

    /**
     * Reduce the set of matched elements to the HTMLElement at the specified index.
     * @param {Number} index - An integer indicating the 0-based position of the element.
     * @returns {HTMLElement}
     */

  }, {
    key: 'get',
    value: function get$$1(index) {
      return index && index <= this._nodes.length ? this._nodes[index] : this._nodes;
    }

    /**
     * Reduce the set of matched elements to the first in the set.
     * @returns {HTMLElement}
     */

  }, {
    key: 'first',
    value: function first() {
      return this._nodes[0] || false;
    }

    /**
     * Converts Arraylike to array
     * @private
     */

  }, {
    key: 'slice',
    value: function slice(pseudo) {
      if (!pseudo || pseudo.length === 0 || typeof pseudo === 'string' || pseudo.toString() === '[object Function]') return [];

      return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
    }

    /**
     * Removes duplicated nodes
     * @private
     */

  }, {
    key: 'unique',
    value: function unique() {
      return new Element(this._nodes.reduce(function (clean, node) {
        var isTruthy = node !== null && node !== undefined && node !== false;
        return isTruthy && clean.indexOf(node) === -1 ? clean.concat(node) : clean;
      }, []));
    }

    /**
     * Get the direct children of all of the nodes with an optional filter
     * @param [string] selector - Filter what children to get
     * @returns {Element}
     */

  }, {
    key: 'children',
    value: function children(selector) {
      return this.map(function (node) {
        return this.slice(node.children);
      }).filter(selector);
    }

    /**
     * Generates element from htmlString
     * @private
     */

  }, {
    key: 'generate',
    value: function generate(html) {
      if (/^\s*<t(h|r|d)/.test(html)) {
        return new Element(document.createElement('table')).html(html).children()._nodes;
      } else if (/^\s*</.test(html)) {
        return new Element(document.createElement('div')).html(html).children()._nodes;
      } else {
        return document.createTextNode(html);
      }
    }

    /**
     * Normalize the arguments to an array of strings
     * @private
     */

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

    /**
     * Loops through the nodes and executes callback for each
     * @param {Function} callback - The function that will be called
     * @returns {Element}
     */

  }, {
    key: 'each',
    value: function each(callback) {
      this._nodes.forEach(callback.bind(this));
      return this;
    }

    /**
     * Loop through the combination of every node and every argument passed
     * @private
     */

  }, {
    key: 'eacharg',
    value: function eacharg(args, callback) {
      return this.each(function (node, i) {
        this.args(args, node, i).forEach(function (arg) {
          callback.call(this, node, arg);
        }, this);
      });
    }

    /**
     * Checks if node exists on a page
     * @private
     */

  }, {
    key: 'isInPage',
    value: function isInPage(node) {
      return node === document.body ? false : document.body.contains(node);
    }

    /**
     * Changes the content of the current instance by running a callback for each Element
     * @param {Function} callback - A callback that returns an element that are going to be kept
     * @returns {Element}
     */

  }, {
    key: 'map',
    value: function map(callback) {
      return callback ? new Element(this.array(callback)).unique() : this;
    }

    /**
     * Add texts in specific position
     * @private
     */

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

          return new Element(part);
        }).each(function (n) {
          this.isInPage(n) ? fragment.appendChild(new Element(n).clone().first()) : fragment.appendChild(n);
        });

        callback.call(this, node, fragment);
      });
    }

    /**
     * Return an array of DOM nodes of a source node and its children.
     * @private
     */

  }, {
    key: 'getAll',
    value: function getAll(context) {
      return new Element([context].concat(new Element('*', context)._nodes));
    }

    /**
     * Deep clone a DOM node and its descendants.
     * @returns {Element}
     */

  }, {
    key: 'clone',
    value: function clone() {
      return this.map(function (node) {
        var clone = node.cloneNode(true);
        var dest = this.getAll(clone);

        this.getAll(node).each(function (src, i) {
          for (var key in mirror) {
            mirror[key](src, dest._nodes[i]);
          }
        });

        return clone;
      });
    }

    /**
     * Gets the HTML contents of the first element in a set.
     * When parameter is provided set the HTML contents of each element in the set.
     * @param {htmlString} [text] - A string of HTML to set as the content of each matched element
     * @returns {htmlString|Element}
     */

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

    /**
     * Gets the text contents of the first element in a set.
     * When parameter is provided set the text contents of each element in the set.
     * @param {string} [text] - A string to set as the text content of each matched element.
     * @returns {string|Element}
     */

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

    /**
     * Remove the set of matched elements from the DOM.
     * @returns {Element}
     */

  }, {
    key: 'remove',
    value: function remove() {
      return this.each(function (node) {
        node.parentNode.removeChild(node);
      });
    }

    /**
     * Travel the matched elements one node up
     * @param {selector} CSS Selector
     * @returns {Element}
     */

  }, {
    key: 'parent',
    value: function parent(selector) {
      return this.map(function (node) {
        return node.parentNode;
      }).filter(selector);
    }

    /**
     * Find the first ancestor that matches the selector for each node
     * @param {selector} CSS Selector
     * @returns {Element}
     */

  }, {
    key: 'closest',
    value: function closest(selector) {
      return this.map(function (node) {
        do {
          if (new Element(node).is(selector)) {
            return node;
          }
        } while ((node = node.parentNode) && node !== document);
      });
    }

    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements
     * Additional data can be provided, which will be used for populating the html
     * @param {string|Element} html - Html string or Element
     * @param [data]
     * @returns {Element}
     */

  }, {
    key: 'append',
    value: function append(html, data) {
      return this.adjacent(html, data, function (node, fragment) {
        node.appendChild(fragment);
      });
    }

    /**
     * Insert content, specified by the parameter, to the begining of each element in the set of matched elements
     * Additional data can be provided, which will be used for populating the html
     * @param {string|Element} html - Html string or Element
     * @param [data]
     * @returns {Element}
     */

  }, {
    key: 'prepend',
    value: function prepend(html, data) {
      return this.adjacent(html, data, function (node, fragment) {
        node.insertBefore(fragment, node.firstChild);
      });
    }

    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector.
     * @param {selector} selector - A string containing a selector expression to match elements against.
     * @returns {Element}
     */

  }, {
    key: 'find',
    value: function find(selector) {
      return this.map(function (node) {
        return new Element(selector || '*', node);
      });
    }

    /**
     * Adds the specified class(es) to each element in the set of matched elements.
     * @param {...string} className - Class(es) to be added
     * @returns {Element}
     */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      return this.eacharg(arguments, function (el, name) {
        el.classList.add(name);
      });
    }

    /**
     * Toggles the specified class(es) to each element in the set of matched elements.
     * @param {...string} className - Class(es) to be toggled
     * @returns {Element}
     */

  }, {
    key: 'toggleClass',
    value: function toggleClass(className) {
      return this.eacharg(arguments, function (el, name) {
        el.classList.toggle(name);
      });
    }

    /**
     * Removes the specified class(es) from each element in the set of matched elements.
     * @param {...string} className - Class(es) to be removed
     * @returns {Element}
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      return this.eacharg(arguments, function (el, name) {
        el.classList.remove(name);
      });
    }

    /**
     * Attach event handlers
     * @param {string} events - Events to attach handlers for - can be space separated or comma separated list, or array of strings
     * @param {string|Function} cb - Callback or CSS selector
     * @param [Function] cb2 - Callback when second parameter is a selector
     * @returns {Element}
     */

  }, {
    key: 'on',
    value: function on(events, cb, cb2) {
      if (typeof cb === 'string') {
        var sel = cb;
        cb = function cb(e) {
          var args = arguments;
          var el = new Element(e.currentTarget);
          var set$$1 = el.is(sel) ? el : el.find(sel);
          set$$1.each(function (target) {
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

    /**
     * Remove an event handler
     * @param {string} events
     */

  }, {
    key: 'off',
    value: function off(events) {
      if (events === undefined) {
        this.each(function (node) {
          for (var evt in node._e) {
            node._e[evt].forEach(function (cb) {
              node.removeEventListener(evt, cb);
            });
          }
        });
      }

      return this.eacharg(events, function (node, event) {
        new Element(node._e ? node._e[event] : []).each(function (cb) {
          node.removeEventListener(event, cb);
        });
      });
    }

    /**
     * Execute all handlers attached to the event type
     * @param {string} events - Event types to be executed
     * @returns {*}
     */

  }, {
    key: 'trigger',
    value: function trigger(events) {
      var data = this.slice(arguments).slice(1);

      return this.eacharg(events, function (node, event) {
        var ev = void 0;
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

    /**
     * Get the value of an attribute for the each element in the set of matched elements or set one or more attributes for every matched element.
     * @param [string|object] name - Name of the attribute to be retrieved/set. Can be object of attributes/values.
     * @param [string] value - Value of the attribute to be set.
     * @returns {string|Element}
     */

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
            if (name[key] !== null) {
              node.setAttribute(data + key, name[key]);
            } else {
              node.removeAttribute(data + key);
            }
          }
        });
      }

      return this.length ? this.first().getAttribute(data + name) : '';
    }

    /**
     * Get the prop for the each element in the set of matched elements or set one or more attributes for every matched element.
     * @param [string|object] name - Name of the property to be retrieved/set. Can be object of attributes/values.
     * @param [string] value - Value of the property to be set.
     * @returns {string|Element}
     */

  }, {
    key: 'prop',
    value: function prop(name, value) {
      if (value !== undefined) {
        var nm = name;
        name = {};
        name[nm] = value;
      }

      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        return this.each(function (node) {
          for (var key in name) {
            node[key] = name[key];
          }
        });
      }

      return this.length ? this.first()[name] : '';
    }

    /**
     * Get the value of an daata attribute for the each element in the set of matched elements or set one or more attributes for every matched element.
     * @param [string|object] name - Name of the data attribute to be retrieved/set. Can be object of attributes/values.
     * @param [string] value - Value of the data attribute to be set.
     * @returns {object|Element}
     */

  }, {
    key: 'data',
    value: function data(name, value) {
      if (!name) {
        return this.first().dataset;
      }
      return this.attr(name, value, true);
    }
  }, {
    key: 'length',
    get: function get$$1() {
      return this._nodes.length;
    }
  }]);
  return Element;
}();

function $(selector, element) {
  return new Element(selector, element);
}

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
   * Finds all components within selector and destroy them
   * @param {DOMElement} container
   */


  createClass(Linker, [{
    key: 'unlink',
    value: function unlink() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      Object.keys(this.registry.getData()).forEach(function (selector) {
        [].forEach.call(container.querySelectorAll(selector), function (el) {
          if (el.component) {
            el.component.$teardown();
          }
        });
      });
    }

    /**
     * Iterates over selectors in registry, find occurrences in container and initialize components
     * @param {DOMElement} container
     */

  }, {
    key: 'link',
    value: function link() {
      var _this = this;

      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      this.registry.getRegisteredSelectors().forEach(function (selector) {
        var elements = Array.prototype.slice.call(container.querySelectorAll(selector));
        if (container !== document && $(container).is(selector)) {
          elements.push(container);
        }
        [].forEach.call(elements, function (el) {
          if (!el.component) {
            var element = $(el);
            var data = element.data();
            var Instance = _this.registry.getComponent(selector);
            el.component = new Instance({ element: element, data: data });
          }
        });
      });
    }
  }]);
  return Linker;
}();

/**
 * Simple registry for storing selector-constructor pairs
 */
var Registry = function () {
  /**
   * @constructor
   */
  function Registry() {
    classCallCheck(this, Registry);

    this._registry = {};
  }

  /**
   * Retunrs all registry data
   * @returns {{}|*}
   */


  createClass(Registry, [{
    key: "getData",
    value: function getData() {
      return this._registry;
    }
  }, {
    key: "getRegisteredSelectors",
    value: function getRegisteredSelectors() {
      return Object.keys(this._registry);
    }

    /**
     * Returns component constructor for selector from map
     * @param {string} selector
     * @returns {Function} constructor
     */

  }, {
    key: "getComponent",
    value: function getComponent(selector) {
      return this._registry[selector];
    }

    /**
     * Adds selector/constructor pair to map
     * @param {string} selector
     * @param {Function} constructor
       */

  }, {
    key: "registerComponent",
    value: function registerComponent(selector, klass) {
      this._registry[selector] = klass;
    }
  }]);
  return Registry;
}();

var registry = new Registry();

var onChildrenAddition = function onChildrenAddition(mutations, callback) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      callback(mutation);
    }
  });
};

var attachNewMutationObserver = function attachNewMutationObserver(observerRoot, callback) {
  var observer = new MutationObserver(function (mutations) {
    onChildrenAddition(mutations, callback);
  });
  var observerConfig = {
    childList: true,
    subtree: true
  };
  observer.observe(observerRoot, observerConfig);
};

var attachNewMutationObserver$1 = (function (observerRoot, callback) {
  return attachNewMutationObserver(observerRoot, callback);
});

var linker = new Linker(registry);
var channel = $(document);

var getElement = function getElement(detail) {
  var element = void 0;

  if (detail && detail.length > 0) {
    element = detail[0] instanceof HTMLElement ? detail[0] : detail[0].first();
  }

  return element;
};

var bootstrap = function bootstrap(root) {
  linker.link(getElement(root));
  channel.trigger('strudel:loaded');
};

var bindContentEvents = function bindContentEvents() {
  channel.on('content:loaded', function (evt) {
    bootstrap(evt.detail);
  });

  channel.on('content:unload', function (evt) {
    linker.unlink(getElement(evt.detail));
  });
};

var onMutationCallback = function onMutationCallback(mutation) {
  var registeredSelectors = registry.getRegisteredSelectors();

  Array.prototype.slice.call(mutation.addedNodes).filter(function (node) {
    return node.nodeName !== 'SCRIPT' && node.nodeType === 1;
  }).forEach(function (node) {
    if (registeredSelectors.find(function (el) {
      return $(node).is(el);
    })) {
      bootstrap([node]);
    }
  });
};

var init = function init() {
  if (/comp|inter|loaded/.test(document.readyState)) {
    setTimeout(bootstrap, 0);
  } else {
    channel.on('DOMContentLoaded', bootstrap);
  }

  bindContentEvents();
  attachNewMutationObserver$1(channel._nodes[0], onMutationCallback);
};

var config$1 = {
  /**
   * Class added on components when initialised
   */
  initializedClassName: 'strudel-init'
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
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
var mixPrototypes = function mixPrototypes(target, source) {
  var targetProto = target.prototype;
  var sourceProto = source.prototype;
  var inst = (typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' ? source : new source(); // eslint-disable-line new-cap

  Object.getOwnPropertyNames(inst).forEach(function (name) {
    var desc = Object.getOwnPropertyDescriptor(inst, name);
    desc.writable = true;
    Object.defineProperty(targetProto, name, desc);
  });

  Object.getOwnPropertyNames(sourceProto).forEach(function (name) {
    if (name !== 'constructor') {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
    }
  });
};

/**
 * Event listeners
 * @type {{}}
 */
var events = {};

/**
 * @classdesc Simple Event Emitter implementation - global
 * @class
 */

var EventEmitter = function () {
  function EventEmitter() {
    classCallCheck(this, EventEmitter);
  }

  createClass(EventEmitter, [{
    key: '$on',


    /**
     * Add event listener to the map
     * @param {string} label
     * @param {Function} callback
     */
    value: function $on(label, callback) {
      if (!events[label]) {
        events[label] = [];
      }
      events[label].push(callback);
    }

    /**
     * Remove event listener from registry
     * @param {string} label
     * @param {Function} callback
     * @returns {boolean}
     */

  }, {
    key: '$off',
    value: function $off(label, callback) {
      var listeners = events[label];

      if (listeners && listeners.length) {
        var index = listeners.reduce(function (i, listener, ind) {
          return isFunction(listener) && listener === callback ? i = ind : i;
        }, -1);

        if (index > -1) {
          listeners.splice(index, 1);
          events[label] = listeners;
          return true;
        }
      }
      return false;
    }

    /**
     * Notifies listeners attached to event
     * @param {string} label
     * @param args
     * @returns {boolean}
     */

  }, {
    key: '$emit',
    value: function $emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = events[label];

      if (listeners && listeners.length) {
        listeners.forEach(function (listener) {
          listener.apply(undefined, args);
        });
        return true;
      }
      return false;
    }
  }], [{
    key: 'getEvents',
    value: function getEvents() {
      return events;
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      Object.keys(events).forEach(function (prop) {
        delete events[prop];
      });
    }
  }]);
  return EventEmitter;
}();

var DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

/**
 * Wrapper for Element on method
 * @param {Element} element - element that will receive listener
 * @param {string} eventName - name of the event eg. click
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - function listener
 */
var delegate = function delegate(element, eventName, selector, listener) {
  if (selector) {
    element.on(eventName, selector, listener);
  } else {
    element.on(eventName, listener);
  }
};

/**
 * Utility for binding events to class methods
 * @param {Component} context - context Component to bind elements for
 * @param {object} events - map of event strings / methods
 * @returns {*}
 */
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

/**
 * Utility for binding elements to class properties
 * @param {Component} context Component to bind elements for
 * @param {object} elements Map of elements / properties of class
 * @returns {*}
 */
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

var mix = function mix(target, source) {
  Object.keys(source).forEach(function (prop) {
    if (!target[prop]) {
      target[prop] = source[prop];
    }
  });
};

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */

var Component = function (_EventEmitter) {
  inherits(Component, _EventEmitter);

  function Component() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        element = _ref.element,
        data = _ref.data;

    classCallCheck(this, Component);

    var _this = possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this.beforeInit();

    _this.$element = element;
    _this.$data = data;

    delegateEvents(_this, _this._events);
    bindElements(_this, _this._els);

    if (_this.mixins && _this.mixins.length) {
      _this.mixins.forEach(function (mixin) {
        if (isFunction(mixin.init)) {
          mixin.init.call(_this);
        }
        mix(_this, mixin);
      });
    }

    _this.init();

    _this.$element.addClass(config$1.initializedClassName);
    return _this;
  }

  /**
   * Function called before component is initialized
   * @interface
   */


  createClass(Component, [{
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
    key: 'beforeDestroy',
    value: function beforeDestroy() {}

    /**
     * Function called after component is destroyed
     * @interface
     */

  }, {
    key: 'destroy',
    value: function destroy() {}

    /**
     * Teardown the component and clear events
     */

  }, {
    key: '$teardown',
    value: function $teardown() {
      this.beforeDestroy();
      this.$element.off();
      this.$element.removeClass(config$1.initializedClassName);
      delete this.$element.first().scope;
      delete this.$element;
      this.destroy();
    }
  }]);
  return Component;
}(EventEmitter);

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
var register = function register(target, selector) {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  if (!target.prototype) {
    throw new Error('Decorator works only for classes');
  }

  var component = function (_Component) {
    inherits(component, _Component);

    function component() {
      var _ref;

      classCallCheck(this, component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /* eslint no-useless-constructor: 0 */
      return possibleConstructorReturn(this, (_ref = component.__proto__ || Object.getPrototypeOf(component)).call.apply(_ref, [this].concat(args)));
    }

    return component;
  }(Component);

  mixPrototypes(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  Object.defineProperty(component.prototype, 'isStrudelClass', { value: true });
  registry.registerComponent(selector, component);

  return component;
};

function decorator(selector) {
  return function _decorator(target) {
    return register(target, selector);
  };
}

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
function decorator$1(event, preventDefault) {
  return function _decorator(klass, method) {
    if (!event) {
      throw new Error('Event descriptor must be provided for Evt decorator');
    }

    if (!klass._events) {
      klass._events = [];
    }

    var cb = !preventDefault ? klass[method] : function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      klass[method].apply(this, args);
      args[0].preventDefault();
    };

    klass._events[event] = cb;
  };
}

/**
 * Element decorator - Creates {@link Element} for matching selector and assigns to decorated property.
 * @param {string} CSS selector
 * @returns (Function} decorator
 */
function decorator$2(selector) {
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

var version = '0.7.0';
var config = config$1;
var options = {
  components: registry.getData()
};

init();

exports.version = version;
exports.options = options;
exports.config = config;
exports.EventEmitter = EventEmitter;
exports.Component = decorator;
exports.Evt = decorator$1;
exports.El = decorator$2;
exports.element = $;
exports.$ = $;

Object.defineProperty(exports, '__esModule', { value: true });

})));
