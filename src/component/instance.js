import EventEmitter from '../util/eventEmitter';
import { delegateEvents } from '../dom/delegateEvents';
import bindElements from '../dom/bindElements';
import { isFunction } from '../util/helpers';
import mix from './mixin';
import config from '../config';
import handleError from '../util/error';

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */
class Component extends EventEmitter {
  constructor({ element, data } = {}) {
    super();

    try {
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
    } catch (e) {
      handleError(e, this.constructor, 'component hook');
    }

    this.$element.addClass(config.initializedClassName);
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
    try {
      this.beforeDestroy();
      this.$element.off();
      this.$element.removeClass(config.initializedClassName);
      delete this.$element.first().scope;
      delete this.$element;
      this.destroy();
    } catch (e) {
      handleError(e, this.constructor, 'component hook');
    }
  }
}

export default Component;
