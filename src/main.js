import bootstrap from './core/bootstrap';

let Strudel = {};
Strudel.version = '0.1.0';

bootstrap();

export {default as Component} from './decorators/component';
export {default as EventEmitter} from './util/eventemitter';
