import { emitter } from '../util/eventEmitter';
import { delegateEvents } from '../dom/delegateEvents';
import bindElements from '../dom/bindElements';
import { isFunction } from '../util/helpers';
import mix from './mixin';
import config from '../config';

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */
class Component {
  constructor({ element, data } = {}) {
    this.beforeInit();

    this.$element = element;
    this.$data = data;

    delegateEvents(this, this._events);
    bindElements(this, this._els);

    if (this.mixins && this.mixins.length) {
      this.mixins.forEach((mixin) => {
        if (isFunction(mixin.init)) {
          mixin.init.call(this);
        }
        mix(this, mixin);
      });
    }

    this.init();

    this.$element.addClass(config.initializedClassName);
  }

  /**
   * Facade for EventEmitter addListener
   * @link EventEmitter#addListener
   */
  $on(label, callback) {
    emitter.addListener(label, callback);
  }

  /**
   * Facade for EventEmitter removeListener
   * @link EventEmitter#removeListener
   */
  $off(label, callback) {
    emitter.removeListener(label, callback);
  }

  /**
   * Facade for EventEmitter emit
   * @link EventEmitter#emit
   */
  $emit(label, ...args) {
    emitter.emit(label, ...args);
  }

  /**
   * Function called before component is initialized
   * @interface
   */
  beforeInit() {}

  /**
   * Function called when component is initialized
   * @interface
   */
  init() {}

  /**
   * Function called before component is destroyed
   * @interface
   */
  beforeDestroy() {}

  /**
   * Function called after component is destroyed
   * @interface
   */
  destroy() {}

  /**
   * Teardown the component and clear events
   */
  $teardown() {
    this.beforeDestroy();
    this.$element.off();
    this.$element.removeClass(config.initializedClassName);
    delete this.$element.first().scope;
    delete this.$element;
    this.destroy();
  }
}

export default Component;
