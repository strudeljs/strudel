import EventEmitter from '../util/eventemitter';
import { delegateEvents } from '../util/delegateEvents';
import bindElements from '../util/bindElements';

const emitter = new EventEmitter();

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */
class Component {
  constructor({ element, data } = {}) {
    this.$element = element;
    this.$data = data;

    this.beforeInit();

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
  finalize() {}

  destroy() {
    this.$element._instance = null;
    this.finalize();
  }
}

export default Component;
