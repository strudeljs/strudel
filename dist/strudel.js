/*!
 * Strudel.js v0.7.0
 * (c) 2016-2018 Mateusz Łuczak
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Strudel = {})));
}(this, (function (exports) { 'use strict';

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
  var byCss = function (selector, context) {
    return (context || document).querySelectorAll(selector);
  };

  /**
   * Wrapper for byCss
   * @param {String} selector
   * @param {Node} context
   * @returns {NodeList}
   */
  var select = function (selector, context) {
    selector = selector.replace(/^\s*/, '').replace(/\s*$/, '');

    if (context) {
      return byCss(selector, context);
    }

    for (var key in selectors) {
      context = key.split('/');
      if ((new RegExp(context[1], context[2])).test(selector)) {
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
    events: function (src, dest) {
      if (!src._e) { return; }

      for (var type in src._e) {
        src._e[type].forEach(function (event) {
          new Element(dest).on(type, event);
        });
      }
    },

    /**
     * Copy select input value to its clone.
     */
    select: function (src, dest) {
      if (new Element(src).is('select')) {
        dest.value = src.value;
      }
    },

    /**
     * Copy textarea input value to its clone
     */
    textarea: function (src, dest) {
      if (new Element(src).is('textarea')) {
        dest.value = src.value;
      }
    }
  };

  /**
   * @classdesc Element class used for DOM manipulation
   * @class
   */
  var Element = function Element(selector, context) {
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
  };

  var prototypeAccessors = { length: { configurable: true } };

  /**
   * Returns size of nodes
   */
  prototypeAccessors.length.get = function () {
    return this._nodes.length;
  };

  /**
   * Extracts structured data from DOM
   * @param {Function} callback - A callback to be called on each node. Returned value is added to the set
   * @returns {*}
   */
  Element.prototype.array = function array (callback) {
    var self = this;
    return this._nodes.reduce(function (list, node, i) {
      var val;
      if (callback) {
        val = callback.call(self, node, i);
        if (!val) { val = false; }
        if (typeof val === 'string') { val = new Element(val); }
        if (val instanceof Element) { val = val._nodes; }
      } else {
        val = node.innerHTML;
      }
      return list.concat(val !== false ? val : []);
    }, []);
  };

  /**
   * Create a string from different things
   * @private
   */
  Element.prototype.str = function str (node, i) {
    return function (arg) {
      if (typeof arg === 'function') {
        return arg.call(this, node, i);
      }

      return arg.toString();
    };
  };

  /**
   * Check the current matched set of elements against a selector and return true if at least one of these elements matches the given arguments.
   * @param {selector} selector - A string containing a selector expression to match elements against.
   * @returns {boolean}
   */
  Element.prototype.is = function is (selector) {
    return this.filter(selector).length > 0;
  };

  /**
   * Reduce the set of matched elements to those that match the selector or pass the function's test.
   * @param {selector} selector A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  Element.prototype.filter = function filter (selector) {
    var callback = function (node) {
      node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
      return node.matches(selector || '*');
    };

    if (typeof selector === 'function') { callback = selector; }

    if (selector instanceof Element) {
      callback = function (node) {
        return (selector._nodes).indexOf(node) !== -1;
      };
    }

    return new Element(this._nodes.filter(callback));
  };

  /**
   * Reduce the set of matched elements to the one at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {Element|boolean}
   */
  Element.prototype.eq = function eq (index) {
    return new Element(this._nodes[index]) || false;
  };

  /**
   * Reduce the set of matched elements to the HTMLElement at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {HTMLElement}
   */
  Element.prototype.get = function get (index) {
    return (index && index <= this._nodes.length) ? this._nodes[index] : this._nodes;
  };

  /**
   * Reduce the set of matched elements to the first in the set.
   * @returns {HTMLElement}
   */
  Element.prototype.first = function first () {
    return this._nodes[0] || false;
  };

  /**
   * Converts Arraylike to array
   * @private
   */
  Element.prototype.slice = function slice (pseudo) {
    if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') { return []; }

    return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
  };

  /**
   * Removes duplicated nodes
   * @private
   */
  Element.prototype.unique = function unique () {
    return new Element(this._nodes.reduce(function (clean, node) {
      var isTruthy = node !== null && node !== undefined && node !== false;
      return (isTruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
    }, []));
  };

  /**
   * Get the direct children of all of the nodes with an optional filter
   * @param [string] selector - Filter what children to get
   * @returns {Element}
   */
  Element.prototype.children = function children (selector) {
    return this.map(function (node) {
      return this.slice(node.children);
    }).filter(selector);
  };

  /**
   * Generates element from htmlString
   * @private
   */
  Element.prototype.generate = function generate (html) {
    if (/^\s*<t(h|r|d)/.test(html)) {
      return new Element(document.createElement('table')).html(html).children()._nodes;
    } else if (/^\s*</.test(html)) {
      return new Element(document.createElement('div')).html(html).children()._nodes;
    } else {
      return document.createTextNode(html);
    }
  };

  /**
   * Normalize the arguments to an array of strings
   * @private
   */
  Element.prototype.args = function args (args$1, node, i) {
    if (typeof args$1 === 'function') {
      args$1 = args$1(node, i);
    }

    if (typeof args$1 !== 'string') {
      args$1 = this.slice(args$1).map(this.str(node, i));
    }

    return args$1.toString().split(/[\s,]+/).filter(function (e) {
      return e.length;
    });
  };

  /**
   * Loops through the nodes and executes callback for each
   * @param {Function} callback - The function that will be called
   * @returns {Element}
   */
  Element.prototype.each = function each (callback) {
    this._nodes.forEach(callback.bind(this));
    return this;
  };

  /**
   * Loop through the combination of every node and every argument passed
   * @private
   */
  Element.prototype.eacharg = function eacharg (args, callback) {
    return this.each(function (node, i) {
      this.args(args, node, i).forEach(function (arg) {
        callback.call(this, node, arg);
      }, this);
    });
  };

  /**
   * Checks if node exists on a page
   * @private
   */
  Element.prototype.isInPage = function isInPage (node) {
    return (node === document.body) ? false : document.body.contains(node);
  };

  /**
   * Changes the content of the current instance by running a callback for each Element
   * @param {Function} callback - A callback that returns an element that are going to be kept
   * @returns {Element}
   */
  Element.prototype.map = function map (callback) {
    return callback ? new Element(this.array(callback)).unique() : this;
  };

  /**
   * Add texts in specific position
   * @private
   */
  Element.prototype.adjacent = function adjacent (html, data, callback) {
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
        var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

        if (typeof part === 'string') {
          return this.generate(part);
        }

        return new Element(part);
      }).each(function (n) {
        this.isInPage(n)
          ? fragment.appendChild(new Element(n).clone().first())
          : fragment.appendChild(n);
      });

      callback.call(this, node, fragment);
    });
  };

  /**
   * Return an array of DOM nodes of a source node and its children.
   * @private
   */
  Element.prototype.getAll = function getAll (context) {
    return new Element([context].concat(new Element('*', context)._nodes));
  };

  /**
   * Deep clone a DOM node and its descendants.
   * @returns {Element}
   */
  Element.prototype.clone = function clone () {
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
  };

  /**
   * Gets the HTML contents of the first element in a set.
   * When parameter is provided set the HTML contents of each element in the set.
   * @param {htmlString} [text] - A string of HTML to set as the content of each matched element
   * @returns {htmlString|Element}
   */
  Element.prototype.html = function html (text) {
    if (text === undefined) {
      return this.first().innerHTML || '';
    }

    return this.each(function (node) {
      node.innerHTML = text;
    });
  };

  /**
   * Gets the text contents of the first element in a set.
   * When parameter is provided set the text contents of each element in the set.
   * @param {string} [text] - A string to set as the text content of each matched element.
   * @returns {string|Element}
   */
  Element.prototype.text = function text (text$1) {
    if (text$1 === undefined) {
      return this.first().textContent || '';
    }

    return this.each(function (node) {
      node.textContent = text$1;
    });
  };

  /**
   * Remove the set of matched elements from the DOM.
   * @returns {Element}
   */
  Element.prototype.remove = function remove () {
    return this.each(function (node) {
      node.parentNode.removeChild(node);
    });
  };

  /**
   * Travel the matched elements one node up
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  Element.prototype.parent = function parent (selector) {
    return this.map(function (node) {
      return node.parentNode;
    }).filter(selector);
  };

  /**
   * Find the first ancestor that matches the selector for each node
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  Element.prototype.closest = function closest (selector) {
    return this.map(function (node) {
      do {
        if (new Element(node).is(selector)) {
          return node;
        }
      } while ((node = node.parentNode) && node !== document);
    });
  };

  /**
   * Insert content, specified by the parameter, to the end of each element in the set of matched elements
   * Additional data can be provided, which will be used for populating the html
   * @param {string|Element} html - Html string or Element
   * @param [data]
   * @returns {Element}
   */
  Element.prototype.append = function append (html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.appendChild(fragment);
    });
  };

  /**
   * Insert content, specified by the parameter, to the begining of each element in the set of matched elements
   * Additional data can be provided, which will be used for populating the html
   * @param {string|Element} html - Html string or Element
   * @param [data]
   * @returns {Element}
   */
  Element.prototype.prepend = function prepend (html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.insertBefore(fragment, node.firstChild);
    });
  };

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by a selector.
   * @param {selector} selector - A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  Element.prototype.find = function find (selector) {
    return this.map(function (node) {
      return new Element(selector || '*', node);
    });
  };

  /**
   * Adds the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be added
   * @returns {Element}
   */
  Element.prototype.addClass = function addClass (className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.add(name);
    });
  };

  /**
   * Toggles the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be toggled
   * @returns {Element}
   */
  Element.prototype.toggleClass = function toggleClass (className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.toggle(name);
    });
  };

  /**
   * Removes the specified class(es) from each element in the set of matched elements.
   * @param {...string} className - Class(es) to be removed
   * @returns {Element}
   */
  Element.prototype.removeClass = function removeClass (className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.remove(name);
    });
  };

  /**
   * Attach event handlers
   * @param {string} events - Events to attach handlers for - can be space separated or comma separated list, or array of strings
   * @param {string|Function} cb - Callback or CSS selector
   * @param [Function] cb2 - Callback when second parameter is a selector
   * @returns {Element}
   */
  Element.prototype.on = function on (events, cb, cb2) {
    if (typeof cb === 'string') {
      var sel = cb;
      cb = function (e) {
        var args = arguments;
        var el = new Element(e.currentTarget);
        var set = el.is(sel) ? el : el.find(sel);
        set.each(function (target) {
          if (target === e.target || target.contains(e.target)) {
            try {
              Object.defineProperty(e, 'currentTarget', {
                get: function () {
                  return target;
                }
              });
            } catch (err) {}
            cb2.apply(target, args);
          }
        });
      };
    }

    var callback = function (e) {
      return cb.apply(this, [e].concat(e.detail || []));
    };

    return this.eacharg(events, function (node, event) {
      node.addEventListener(event, callback);

      node._e = node._e || {};
      node._e[event] = node._e[event] || [];
      node._e[event].push(callback);
    });
  };

  /**
   * Remove an event handler
   * @param {string} events
   */
  Element.prototype.off = function off (events) {
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
  };

  /**
   * Execute all handlers attached to the event type
   * @param {string} events - Event types to be executed
   * @returns {*}
   */
  Element.prototype.trigger = function trigger (events) {
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
  };

  /**
   * Get the value of an attribute for the each element in the set of matched elements or set one or more attributes for every matched element.
   * @param [string|object] name - Name of the attribute to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the attribute to be set.
   * @returns {string|Element}
   */
  Element.prototype.attr = function attr (name, value, data) {
    data = data ? 'data-' : '';

    if (value !== undefined) {
      var nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
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
  };

  /**
   * Get the prop for the each element in the set of matched elements or set one or more attributes for every matched element.
   * @param [string|object] name - Name of the property to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the property to be set.
   * @returns {string|Element}
   */
  Element.prototype.prop = function prop (name, value) {
    if (value !== undefined) {
      var nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (var key in name) {
          node[key] = name[key];
        }
      });
    }

    return this.length ? this.first()[name] : '';
  };

  /**
   * Get the value of an daata attribute for the each element in the set of matched elements or set one or more attributes for every matched element.
   * @param [string|object] name - Name of the data attribute to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the data attribute to be set.
   * @returns {object|Element}
   */
  Element.prototype.data = function data (name, value) {
    if (!name) {
      return this.first().dataset;
    }
    return this.attr(name, value, true);
  };

  Object.defineProperties( Element.prototype, prototypeAccessors );

  function $(selector, element) {
    return new Element(selector, element);
  }

  /**
   * @classdesc Class linking components with DOM
   * @class
   */
  var Linker = function Linker(registry) {
    this.registry = registry;
  };

  /**
   * Finds all components within selector and destroy them
   * @param {DOMElement} container
   */
  Linker.prototype.unlink = function unlink (container) {
      if ( container === void 0 ) container = document;

    Object.keys(this.registry.getData()).forEach(function (selector) {
      [].forEach.call(container.querySelectorAll(selector), function (el) {
        if (el.component) {
          el.component.$teardown();
        }
      });
    });
  };

  /**
   * Iterates over selectors in registry, find occurrences in container and initialize components
   * @param {DOMElement} container
   */
  Linker.prototype.link = function link (container) {
      var this$1 = this;
      if ( container === void 0 ) container = document;

    this.registry.getRegisteredSelectors().forEach(function (selector) {
      var elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(selector)) {
        elements.push(container);
      }
      [].forEach.call(elements, function (el) {
        if (!el.component) {
          var element = $(el);
          var data = element.data();
          var Instance = this$1.registry.getComponent(selector);
          el.component = new Instance({ element: element, data: data });
        }
      });
    });
  };

  /**
   * Simple registry for storing selector-constructor pairs
   */
  var Registry = function Registry() {
    this._registry = {};
  };

  /**
   * Retunrs all registry data
   * @returns {{}|*}
   */
  Registry.prototype.getData = function getData () {
    return this._registry;
  };

  Registry.prototype.getRegisteredSelectors = function getRegisteredSelectors () {
    return Object
      .keys(this._registry);
  };

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  Registry.prototype.getComponent = function getComponent (selector) {
    return this._registry[selector];
  };

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  Registry.prototype.registerComponent = function registerComponent (selector, klass) {
    this._registry[selector] = klass;
  };

  var registry = new Registry();

  var onChildrenAddition = function (mutations, callback) {
    mutations.forEach(function (mutation) {
      if (
          mutation.type === 'childList'
          && mutation.addedNodes.length > 0
      ) {
        callback(mutation);
      }
    });
  };

  var attachNewMutationObserver = function (observerRoot, callback) {
    var observer = new MutationObserver(function (mutations) { onChildrenAddition(mutations, callback); });
    var observerConfig = {
      childList: true,
      subtree: true
    };
    observer.observe(observerRoot, observerConfig);
  };

  function attachNewMutationObserver$1 (observerRoot, callback) { return attachNewMutationObserver(observerRoot, callback); }

  var linker = new Linker(registry);
  var channel = $(document);

  var getElement = function (detail) {
    var element;

    if (detail && detail.length > 0) {
      element = (detail[0] instanceof HTMLElement) ? detail[0] : detail[0].first();
    }

    return element;
  };

  var bootstrap = function (root) {
    linker.link(getElement(root));
    channel.trigger('strudel:loaded');
  };

  var bindContentEvents = function () {
    channel.on('content:loaded', function (evt) {
      bootstrap(evt.detail);
    });

    channel.on('content:unload', function (evt) {
      linker.unlink(getElement(evt.detail));
    });
  };

  var onMutationCallback = function (mutation) {
    var registeredSelectors = registry.getRegisteredSelectors();

    Array.prototype.slice.call(mutation.addedNodes)
    .filter(function (node) {
      return node.nodeName !== 'SCRIPT' && node.nodeType === 1;
    })
    .forEach(function (node) {
      if (registeredSelectors.find(function (el) {
        return $(node).is(el);
      })) {
        bootstrap([node]);
      }
    });
  };

  var init = function () {
    if (/comp|inter|loaded/.test(document.readyState)) {
      setTimeout(bootstrap, 0);
    } else {
      channel.on('DOMContentLoaded', bootstrap);
    }

    bindContentEvents();
    attachNewMutationObserver$1(channel._nodes[0], onMutationCallback);
  };

  var config = {
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
  var isFunction = function (obj) {
    return typeof obj === 'function' || false;
  };

  /**
   * Small util for mixing prototypes
   * @param {Function} target
   * @param {Function} source
   */
  var mixPrototypes = function (target, source) {
    var targetProto = target.prototype;
    var sourceProto = source.prototype;
    var inst = (typeof source === 'object') ? source : new source(); // eslint-disable-line new-cap

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
  var EventEmitter = function EventEmitter () {};

  EventEmitter.getEvents = function getEvents () {
    return events;
  };

  EventEmitter.removeAllListeners = function removeAllListeners () {
    Object.keys(events).forEach(function (prop) {
      delete events[prop];
    });
  };

  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */
  EventEmitter.prototype.$on = function $on (label, callback) {
    if (!events[label]) {
      events[label] = [];
    }
    events[label].push(callback);
  };

  /**
   * Remove event listener from registry
   * @param {string} label
   * @param {Function} callback
   * @returns {boolean}
   */
  EventEmitter.prototype.$off = function $off (label, callback) {
    var listeners = events[label];

    if (listeners && listeners.length) {
      var index = listeners.reduce(function (i, listener, ind) {
        return (isFunction(listener) && listener === callback) ? i = ind : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        events[label] = listeners;
        return true;
      }
    }
    return false;
  };

  /**
   * Notifies listeners attached to event
   * @param {string} label
   * @param args
   * @returns {boolean}
   */
  EventEmitter.prototype.$emit = function $emit (label) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    var listeners = events[label];

    if (listeners && listeners.length) {
      listeners.forEach(function (listener) {
        listener.apply(void 0, args);
      });
      return true;
    }
    return false;
  };

  var DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

  /**
   * Wrapper for Element on method
   * @param {Element} element - element that will receive listener
   * @param {string} eventName - name of the event eg. click
   * @param {string} selector - CSS selector for delegation
   * @param {Function} listener - function listener
   */
  var delegate = function (element, eventName, selector, listener) {
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
  var delegateEvents = function (context, events) {
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
  var bindElements = function (context, elements) {
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

  var mix = function (target, source) {
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
  var Component = (function (EventEmitter$$1) {
    function Component(ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var element = ref.element;
      var data = ref.data;

      EventEmitter$$1.call(this);

      this.beforeInit();

      this.$element = element;
      this.$data = data;

      delegateEvents(this, this._events);
      bindElements(this, this._els);

      if (this.mixins && this.mixins.length) {
        this.mixins.forEach(function (mixin) {
          if (isFunction(mixin.init)) {
            mixin.init.call(this$1);
          }
          mix(this$1, mixin);
        });
      }

      this.init();

      this.$element.addClass(config.initializedClassName);
    }

    if ( EventEmitter$$1 ) Component.__proto__ = EventEmitter$$1;
    Component.prototype = Object.create( EventEmitter$$1 && EventEmitter$$1.prototype );
    Component.prototype.constructor = Component;

    /**
     * Function called before component is initialized
     * @interface
     */
    Component.prototype.beforeInit = function beforeInit () {};

    /**
     * Function called when component is initialized
     * @interface
     */
    Component.prototype.init = function init () {};

    /**
     * Function called before component is destroyed
     * @interface
     */
    Component.prototype.beforeDestroy = function beforeDestroy () {};

    /**
     * Function called after component is destroyed
     * @interface
     */
    Component.prototype.destroy = function destroy () {};

    /**
     * Teardown the component and clear events
     */
    Component.prototype.$teardown = function $teardown () {
      this.beforeDestroy();
      this.$element.off();
      this.$element.removeClass(config.initializedClassName);
      delete this.$element.first().scope;
      delete this.$element;
      this.destroy();
    };

    return Component;
  }(EventEmitter));

  /**
   * Component decorator - Registers decorated class in {@link Registry} as a component
   * @param {string} CSS selector
   */
  var register = function (target, selector) {
    if (!selector) {
      throw new Error('Selector must be provided for Component decorator');
    }

    if (!target.prototype) {
      throw new Error('Decorator works only for classes');
    }

    var component = (function (Component$$1) {
      function component() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
   /* eslint no-useless-constructor: 0 */
        Component$$1.apply(this, args);
      }

      if ( Component$$1 ) component.__proto__ = Component$$1;
      component.prototype = Object.create( Component$$1 && Component$$1.prototype );
      component.prototype.constructor = component;

      return component;
    }(Component));

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
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

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

  /**
   * OnInit decorator - sets method to be run at init
   * @returns (Function} decorator
   */

  function decorator$3(klass, method) {
    var emptyFnc = function () {};
    var org = klass.init || emptyFnc;

    klass.init = function () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      (ref = klass[method]).apply.apply(ref, [ this ].concat( args ));
      return org.apply.apply(org, [ this ].concat( args ));
    };
  }

  var version = '0.7.0';
  var config$1 = config;
  var options = {
    components: registry.getData()
  };

  init();

  exports.version = version;
  exports.options = options;
  exports.config = config$1;
  exports.EventEmitter = EventEmitter;
  exports.Component = decorator;
  exports.Evt = decorator$1;
  exports.El = decorator$2;
  exports.OnInit = decorator$3;
  exports.element = $;
  exports.$ = $;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
