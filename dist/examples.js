/*!
 * Strudel.js v0.8.2
 * (c) 2016-2018 Mateusz Łuczak
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@babel/preset-env'), require('@babel/plugin-proposal-decorators'), require('@babel/plugin-proposal-class-properties')) :
  typeof define === 'function' && define.amd ? define(['@babel/preset-env', '@babel/plugin-proposal-decorators', '@babel/plugin-proposal-class-properties'], factory) :
  (factory());
}(this, (function () { 'use strict';

  var lolizer = function lolizer() {
    return {
      presets: ['@babel/preset-env'],
      plugins: [['@babel/plugin-proposal-decorators', {
        decoratorsBeforeExport: true
      }], '@babel/plugin-proposal-class-properties']
    };
  };

  Babel.registerPreset('lolizer', lolizer);

})));
