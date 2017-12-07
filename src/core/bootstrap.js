import Linker from './linker';
import Registry from './registry';

const registry = new Registry();
const linker = new Linker(registry);

const bootstrap = () => {
  ['DOMContentLoaded', 'contentloaded'].forEach((name) => {
    document.addEventListener(name, (evt) => {
      if (evt.detail && evt.detail.length > 0) {
        let element = evt.detail[0];
        element = (element instanceof HTMLElement) ? element : element.first();
        linker.link(element);
      } else {
        linker.linkAll();
      }
    });
  });

  document.addEventListener('contentunload', (evt) => {
    if (evt.detail) {
      let element = evt.detail[0];
      element = (element instanceof HTMLElement) ? element : element.first();
      linker.unlink(element);
    }
  });
};

export { bootstrap, registry };

