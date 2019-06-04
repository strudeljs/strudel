import { warn } from './error';

/**
 * List of instance methods that won't be overriden by a component
 * when prototypes are mixed.
 */
const protectedMethods = [
  'constructor',
  '$teardown',
  '$on',
  '$off',
  '$emit'
];

/**
 * Check if passed parameter is a function
 * @param obj
 * @returns {boolean}
 */
export const isFunction = (obj) => {
  return typeof obj === 'function' || false;
};

/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
export const mixPrototypes = (target, source) => {
  const targetProto = target.prototype;
  const sourceProto = source.prototype;
  const inst = (typeof source === 'object') ? source : new source(); // eslint-disable-line new-cap

  Object.getOwnPropertyNames(inst).forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(inst, name);
    desc.writable = true;
    Object.defineProperty(targetProto, name, desc);
  });

  Object.getOwnPropertyNames(sourceProto).forEach((name) => {
    if (protectedMethods.indexOf(name) !== -1) {
      if (name !== 'constructor') {
        warn(`Component tried to override instance method ${name}`, source);
      }
    } else {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
    }
  });
};

export const createDecorator = (factory) => {
  return (options, param) => {
    return (Ctor, property) => {
      if (!Ctor.__decorators__) {
        Ctor.__decorators__ = [];
      }

      Ctor.__decorators__.push((component) => {
        return factory(component, property, options, param);
      });
    };
  };
};
