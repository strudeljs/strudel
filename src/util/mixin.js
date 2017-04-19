/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
const mixin = (target, source) => {
  const targetProto = target.prototype;
  const sourceProto = source.prototype;

  Object.getOwnPropertyNames(sourceProto).forEach((name) => {
    if (name !== 'constructor') {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
    }
  });
};

export default mixin;
