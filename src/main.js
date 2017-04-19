import bootstrap from './core/bootstrap';

const Strudel = {};
Strudel.version = '0.1.0';

bootstrap();

export { default as Component } from './decorators/component';
export { default as EventEmitter } from './util/eventemitter';
export { default as Evt } from './decorators/event';
