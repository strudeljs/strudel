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
    if (name !== 'constructor') {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
    }
  });
};

/**
 * Util used to merge two objects together
 * @param obj
 * @param obj
 * @returns {{}|*}
 */
export const mergeObjects = (obj1, obj2) => {
  return [obj1, obj2].reduce((prev, curr) => {
    Object.keys(curr).forEach((key) => {
      prev[key] = curr[key];
    });
    return prev;
  });
};
