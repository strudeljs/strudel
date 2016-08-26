import bootstrap from './core/bootstrap';

let Quantum = {};
Quantum.version = '0.1.0-alpha';

bootstrap();

export {default as Component} from './decorators/component';
export {default as EventEmitter} from './util/eventemitter';
