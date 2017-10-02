import bootstrap from './core/bootstrap';

const Strudel = {};

Strudel.version = '0.2.0';

bootstrap();

export { default as Component } from './decorators/component';
export { default as EventEmitter } from './util/eventEmitter';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as element } from './core/element';
