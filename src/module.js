import registry from './core/registry';
import config from './config';

const version = '__VERSION__';
const initializedClassName = config.initializedClassName;
const initializedSelector = `.${config.initializedClassName}`;
const options = {
  components: registry.getData()
};

export { version, options, initializedClassName, initializedSelector };
export { default as EventEmitter } from './util/eventEmitter';
export { default as Component } from './decorators/component';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as OnInit } from './decorators/onInit';
/* Backward compatibility */
export { default as element, default as $ } from './dom/element';
