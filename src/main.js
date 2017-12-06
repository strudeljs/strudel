import { bootstrap, registry } from './core/bootstrap';

bootstrap();

window.Strudel = {};
window.Strudel.registry = registry;

export { default as Component } from './decorators/component';
export { default as EventEmitter } from './util/eventEmitter';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as element } from './core/element';
