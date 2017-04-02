import Linker from './linker';
import Registry from './registry';

const registry = new Registry();
const linker = new Linker(registry);

const bootstrap = () => {
  document.addEventListener('DOMContentLoaded', () => linker.linkAll());
  document.addEventListener('contentloaded', () => linker.linkAll());
}

export default bootstrap;

