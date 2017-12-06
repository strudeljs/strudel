import EventEmitter from '../util/eventEmitter';
import { delegateEvents } from '../util/delegateEvents';
import bindElements from '../util/bindElements';

const emitter = new EventEmitter();

const INIT_CLASS = 'strudel-init';

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */
class Component {
  constructor({ element, data } = {}) {
    element.addClass(INIT_CLASS);

    this.isStrudelClass = true;
    this.beforeInit();

    this.$element = element;
    this.$data = data;

    delegateEvents(this, this._events);
    bindElements(this, this._els);

    this.init();
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
    this.$element.removeClass(INIT_CLASS);
    delete this.$element.first().scope;
    delete this.$element;
    this.destroy();
  }
}

export default Component;
