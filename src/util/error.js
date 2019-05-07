export let warn = () => {};
export let error = () => {};

if (process.env.NODE_ENV !== 'production') {
  const generateTrace = (vm) => {
    const componentName = vm.prototype ? vm.prototype.name || vm.name : vm.constructor.name;
    return ` (found in ${componentName})`;
  };
  warn = (msg, vm) => {
    const trace = vm ? generateTrace(vm) : '';
    console.warn(`[Strudel]: ${msg}${trace}`);
  };
  error = (msg, vm) => {
    const trace = vm ? generateTrace(vm) : '';
    console.error(`[Strudel]: ${msg}${trace}`);
  };
}

const handleError = (err, vm, info) => {
  if (process.env.NODE_ENV !== 'production') {
    error(`Error in ${info}: "${err.toString()}"`, vm);
  }

  console.error(err);
};

export default handleError;
