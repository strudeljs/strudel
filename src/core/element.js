const select = (selector, context) => {
  if (context) {
    return byCss(selector, context);
  }

  return byCss(selector);
};

const byCss = (selector, context) => {
  return (context || document).querySelectorAll(selector);
};

class Element {
  constructor(selector, context) {
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

  array(callback) {
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

  str(node, i) {
    return function (arg) {
      if (typeof arg === 'function') {
        return arg.call(this, node, i);
      }

      return arg.toString();
    };
  }

  filter(selector) {
    var callback = function (node) {
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

  first() {
    return this._nodes[0] || false;
  }

  slice(pseudo) {
    if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return [];

    return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
  }

  unique() {
    return new Element(this._nodes.reduce(function (clean, node) {
      var isTruthy = node !== null && node !== undefined && node !== false;
      return (isTruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
    }, []));
  }

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

  each(callback) {
    this._nodes.forEach(callback.bind(this));
    return this;
  }

  eacharg(args, callback) {
    return this.each(function (node, i) {
      this.args(args, node, i).forEach(function (arg) {
        callback.call(this, node, arg);
      }, this);
    });
  }

  isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
  }

  map(callback) {
    return callback ? new Element(this.array(callback)).unique() : this;
  }

  adjacent(html, data, callback) {
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

        return u(part);
      }).each(function (n) {
        this.isInPage(n)
          ? fragment.appendChild(u(n).clone().first())
          : fragment.appendChild(n);
      });

      callback.call(this, node, fragment);
    });
  }

  html(text) {
    if (text === undefined) {
      return this.first().innerHTML || '';
    }

    return this.each(function (node) {
      node.innerHTML = text;
    });
  }

  text(text) {
    if (text === undefined) {
      return this.first().textContent || '';
    }

    return this.each(function (node) {
      node.textContent = text;
    });
  }

  remove() {
    return this.each(function (node) {
      node.parentNode.removeChild(node);
    });
  }

  append(html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.appendChild(fragment);
    });
  }

  find(selector) {
    return this.map(function (node) {
      return new Element(selector || '*', node);
    });
  }

  addClass() {
    return this.eacharg(arguments, function (el, name) {
      el.classList.add(name);
    });
  }

  removeClass() {
    return this.eacharg(arguments, function (el, name) {
      el.classList.remove(name);
    });
  }

  on(events, cb, cb2) {
    if (typeof cb === 'string') {
      var sel = cb;
      cb = function (e) {
        var args = arguments;
        new Element(e.currentTarget).find(sel).each(function (target) {
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
  }

  off(eventName, listener) {
    this['0'].removeEventListener(eventName, listener, false);
  }

  trigger(events) {
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

  attr(name, value, data) {
    data = data ? 'data-' : '';

    if (value !== undefined) {
      var nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (var key in name) {
          node.setAttribute(data + key, name[key]);
        }
      });
    }

    return this.length ? this.first().getAttribute(data + name) : '';
  }

  data(name, value) {
    if (!name) {
      return this.first().dataset;
    }
    return this.attr(name, value, true);
  }
}

export default (selector, element) => {
  return new Element(selector, element);
};
