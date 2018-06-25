import init from './core/init';
import registry from './core/registry';
import conf from './config';

const version = '__VERSION__';
const config = conf;
const options = {
  components: registry.getData()
};

export { version, options, config };
export { default as EventEmitter } from './util/eventEmitter';
export { default as Component } from './decorators/component';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
/* Backward compatibility */
export { default as element, default as $ } from './dom/element';

init();
