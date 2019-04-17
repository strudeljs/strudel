/* eslint-disable */

const selectors = {};

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
const byCss = (selector, context) => {
  return (context || document).querySelectorAll(selector);
};

/**
 * Wrapper for byCss
 * @param {String} selector
 * @param {Node} context
 * @returns {NodeList}
 */
const select = (selector, context) => {
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
const mirror = {
  /**
   * Copy all JavaScript events of source node to destination node.
   */
  events: function (src, dest) {
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
class Element {
  /**
   * @constructor
   * @param {string} selector - CSS selector
   * @param {Node} context - Node to wrap into Element
   * @returns {Element}
   */
  constructor(selector, context) {
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
  get length() {
    return this._nodes.length;
  }

  /**
   * Extracts structured data from DOM
   * @param {Function} callback - A callback to be called on each node. Returned value is added to the set
   * @returns {*}
   */
  array(callback) {
    let self = this;
    return this._nodes.reduce(function (list, node, i) {
      let val;
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
  str(node, i) {
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
  is(selector) {
    return this.filter(selector).length > 0;
  }

  /**
   * Reduce the set of matched elements to those that match the selector or pass the function's test.
   * @param {selector} selector A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  filter(selector) {
    let callback = function (node) {
      node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
      return node.matches(selector || '*');
    };

    if (typeof selector === 'function') callback = selector;

    if (selector instanceof Element) {
      callback = function (node) {
        return (selector._nodes).indexOf(node) !== -1;
      };
    }

    return new Element(this._nodes.filter(callback));
  }

  /**
   * Reduce the set of matched elements to the one at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {Element|boolean}
   */
  eq(index) {
    return new Element(this._nodes[index]) || false;
  }

  /**
   * Reduce the set of matched elements to the HTMLElement at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {HTMLElement}
   */
  get(index) {
    return ((index || index === 0) && index <= this._nodes.length) ? this._nodes[index] : this._nodes;
  }

  /**
   * Reduce the set of matched elements to the first in the set.
   * @returns {HTMLElement}
   */
  first() {
    return this._nodes[0] || false;
  }

  /**
   * Returns index of a given element
   * @param {HTMLElement|Element} element
   * @returns {Number}
   */
  index(element) {
    const siblings = this.children()._nodes;
    const node = element instanceof HTMLElement ? element : element.first();
    return Array.prototype.indexOf.call(siblings, node);
  }

  /**
   * Converts Arraylike to array
   * @private
   */
  slice(pseudo) {
    if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return [];

    return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
  }

  /**
   * Removes duplicated nodes
   * @private
   */
  unique() {
    return new Element(this._nodes.reduce(function (clean, node) {
      let isTruthy = node !== null && node !== undefined && node !== false;
      return (isTruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
    }, []));
  }

  /**
   * Get the direct children of all of the nodes with an optional filter
   * @param [string] selector - Filter what children to get
   * @returns {Element}
   */
  children(selector) {
    return this.map(function (node) {
      return this.slice(node.children);
    }).filter(selector);
  }

  /**
   * Generates element from htmlString
   * @private
   */
  generate(html) {
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
  args(args, node, i) {
    if (typeof args === 'function') {
      args = args(node, i);
    }

    if (typeof args !== 'string') {
      args = this.slice(args).map(this.str(node, i));
    }

    return args.toString().split(/[\s,]+/).filter(function (e) {
      return e.length;
    });
  }

  /**
   * Loops through the nodes and executes callback for each
   * @param {Function} callback - The function that will be called
   * @returns {Element}
   */
  each(callback) {
    this._nodes.forEach(callback.bind(this));
    return this;
  }

  /**
   * Loop through the combination of every node and every argument passed
   * @private
   */
  eacharg(args, callback) {
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
  isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
  }

  /**
   * Changes the content of the current instance by running a callback for each Element
   * @param {Function} callback - A callback that returns an element that are going to be kept
   * @returns {Element}
   */
  map(callback) {
    return callback ? new Element(this.array(callback)).unique() : this;
  }

  /**
   * Add texts in specific position
   * @private
   */
  adjacent(html, data, callback) {
    if (typeof data === 'number') {
      if (data === 0) {
        data = [];
      } else {
        data = new Array(data).join().split(',').map(Number.call, Number);
      }
    }

    return this.each(function (node, j) {
      let fragment = document.createDocumentFragment();

      new Element(data || {}).map(function (el, i) {
        let part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

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
  }

  /**
   * Return an array of DOM nodes of a source node and its children.
   * @private
   */
  getAll(context) {
    return new Element([context].concat(new Element('*', context)._nodes));
  }

  /**
   * Deep clone a DOM node and its descendants.
   * @returns {Element}
   */
  clone() {
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
  html(text) {
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
  text(text) {
    if (text === undefined) {
      return this.first().textContent || '';
    }

    return this.each(function (node) {
      node.textContent = text;
    });
  }

  /**
   * Remove the set of matched elements from the DOM.
   * @returns {Element}
   */
  remove() {
    return this.each(function (node) {
      node.parentNode.removeChild(node);
    });
  }

  /**
   * Travel the matched elements one node up
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  parent(selector) {
    return this.map(function (node) {
      return node.parentNode;
    }).filter(selector);
  }

  /**
   * Find the first ancestor that matches the selector for each node
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  closest(selector) {
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
  append(html, data) {
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
  prepend(html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.insertBefore(fragment, node.firstChild);
    });
  }

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by a selector.
   * @param {selector} selector - A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  find(selector) {
    return this.map(function (node) {
      if (selector[0] === '>') {
        const array =  selector.split(' ');
        const el = new Element(node).children(array[1]);
        if (array.length <= 2) {
          return el;
        } else {
          return el.find(array.splice(2, array.length - 2).join(' '));
        }
      }

      return new Element(selector || '*', node);
    });
  }

  /**
   * Adds the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be added
   * @returns {Element}
   */
  addClass(className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.add(name);
    });
  }

  /**
   * Toggles the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be toggled
   * @returns {Element}
   */
  toggleClass(className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.toggle(name);
    });
  }

  /**
   * Removes the specified class(es) from each element in the set of matched elements.
   * @param {...string} className - Class(es) to be removed
   * @returns {Element}
   */
  removeClass(className) {
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
  on(events, cb, cb2) {
    if (typeof cb === 'string') {
      let sel = cb;
      cb = function (e) {
        let args = arguments;
        let el = new Element(e.currentTarget);
        let set = el.is(sel) ? el : el.find(sel);
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

    let callback = function (e) {
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
  off(events) {
    if (events === undefined) {
      this.each(function (node) {
        for (var evt in node._e) {
          node._e[evt].forEach(function (cb) {
            node.removeEventListener(evt, cb);
          })
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
  trigger(events) {
    let data = this.slice(arguments).slice(1);

    return this.eacharg(events, function (node, event) {
      let ev;
      let opts = { bubbles: true, cancelable: true, detail: data };

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
   * Get the value of an attribute for the first element in the set.
   * When parameter is provided set the text contents of each element in the set.
   * @param [string|object] name - Name of the attribute to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the attribute to be set.
   * @returns {string|Element}
   */
  attr(name, value, data) {
    data = data ? 'data-' : '';

    if (value !== undefined) {
      let nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (let key in name) {
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
  prop(name, value) {
    if (value !== undefined) {
      let nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (let key in name) {
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
  data(name, value) {
    if (!name) {
      return this.first().dataset;
    }
    return this.attr(name, value, true);
  }
}

export default function $(selector, element) {
  return new Element(selector, element);
};
