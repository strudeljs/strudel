function noop() {}

if (typeof console === 'undefined') {
  window.console = {
    warn: noop,
    error: noop
  };
}

console.info = noop;

let asserted;

function createCompareFn(spy) {
  const hasThrownError = (msg) => {
    let count = spy.calls.count();
    let args;

    function containsMsg(arg) {
      return arg.toString().indexOf(msg) > -1;
    }

    while (count--) {
      args = spy.calls.argsFor(count);
      if (args.some(containsMsg)) {
        return true;
      }
    }
  };

  return {
    compare: (msg) => {
      asserted = asserted.concat(msg);

      const warned = Array.isArray(msg) ? msg.some(hasThrownError) : hasThrownError(msg);

      return {
        pass: warned,
        message: warned
          ? `Expected message "${msg}" not to have thrown error`
          : `Expected message "${msg}" to have thrown error`
      };
    }
  };
}

beforeEach(() => {
  asserted = [];
  spyOn(console, 'error');
  jasmine.addMatchers({
    toHaveThrownError: () => { return createCompareFn(console.error); }
  });
});

afterEach((done) => {
  const thrownError = (msg) => { return asserted.some((assertedMsg) => { return msg.toString().indexOf(assertedMsg) > -1; }); };
  let count = console.error.calls.count();

  let args;

  while (count--) {
    args = console.error.calls.argsFor(count);
    if (!thrownError(args[0])) {
      done.fail(`Unexpected console.error message: ${args[0]}`);
      return;
    }
  }

  done();
});
