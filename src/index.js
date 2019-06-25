import * as Strudel from './module';
import init from './core/init';
import Component from './component/instance';
import './util/polyfills';

/**
 * Expose Strudel in component prototype and start processing
 */
Component.prototype.getInstance = () => { return Strudel; };
init();

export * from './module';
