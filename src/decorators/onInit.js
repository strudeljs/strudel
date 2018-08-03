/**
 * OnInit decorator - sets method to be run at init
 * @returns (Function} decorator
 */

export default function decorator(klass, method) {
  const emptyFnc = function () {};
  const org = klass.init || emptyFnc;

  klass.init = function (...args) {
    klass[method].apply(this, ...args);
    return org.apply(this, ...args);
  };
}
