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
 * Util for creating a hash from string
 * @param {string} string
 * @returns {number}
 */
export const createHash = (val) => {
  let hash = 0;
  for (let i = 0; i < val.length; i += 1) {
    const character = val.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;  // eslint-disable-line no-bitwise
    hash &= hash; // eslint-disable-line no-bitwise
  }

  return hash;
};

/**
 * Util used to return methods of a component
 * @param {Function} component
 * @returns {Object}
 */
export const getWatchedMethods = (component) => {
  return [
    {
      method: component.$teardown,
      originalHash: -1989993412,
      testHash: -1161656354
    },
    {
      method: component.$on,
      originalHash: 1397368762,
      testHash: -1273941564
    },
    {
      method: component.$off,
      originalHash: -1973925409,
      testHash: -861827724
    },
    {
      method: component.$emit,
      originalHash: 699852244,
      testHash: -617070326
    }
  ];
};
