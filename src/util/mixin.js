/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
const mixin = (target, source) => {
  target = target.prototype;
  source = source.prototype;

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (name !== "constructor") {
      Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    }
  });
}

export default mixin;
