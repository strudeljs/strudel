import EventEmitter from '../util/eventemitter';
import { delegateEvents } from '../util/delegateEvents';

const emitter = new EventEmitter();

/**
 * Base class for all components, implementing event emitter
 */
class Component {
  constructor({element, data} = {}) {
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
  on(label, callback) {
    emitter.addListener(label, callback);
  }

  /**
   * Facade for EventEmitter removeListener
   * @link EventEmitter#removeListener
   */
  off(label, callback) {
    emitter.removeListener(label, callback);
  }

  /**
   * Facade for EventEmitter emit
   * @link EventEmitter#emit
   */
  emit(label, ...args) {
    emitter.emit(label, ...args);
  }
}

export default Component
