import { init, registry } from './core/init';

init();

window.Strudel = window.Strudel || {};
window.Strudel.registry = registry;
window.Strudel.version = '__VERSION__';

export { default as Component } from './decorators/component';
export { default as EventEmitter } from './util/eventEmitter';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as element } from './core/element';
