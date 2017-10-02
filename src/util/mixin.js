/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
const mixin = (target, source) => {
  const targetProto = target.prototype;
  const sourceProto = source.prototype;
  const inst = new source(); // eslint-disable-line new-cap

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

export default mixin;
