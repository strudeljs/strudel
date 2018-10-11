/**
 * OnInit decorator - sets method to be run at init
 * @returns (Function} decorator
 */

export default function decorator(target) {
  return {
    ...target,
    finisher: (targetClass) => {
      const emptyFnc = function () {};
      const org = targetClass.prototype.init || emptyFnc;

      targetClass.prototype.init = function (...args) {
        targetClass.prototype[target.key].apply(this, ...args);
        return org.apply(this, ...args);
      };

      return targetClass;
    }
  };
}
