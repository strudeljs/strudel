import Linker from './linker';
import Registry from './registry';

const registry = new Registry();
const linker = new Linker(registry);

const bootstrap = () => {
  ['DOMContentLoaded', 'contentloaded'].forEach((evt) => {
    document.addEventListener(evt, () => {
      linker.linkAll();
    });
  });
};

export default bootstrap;

