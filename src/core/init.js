import Linker from './linker';
import Registry from './registry';
import $ from '../dom/element';

const registry = new Registry();
const linker = new Linker(registry);
const channel = $(document);

const init = () => {
  ['DOMContentLoaded', 'content:loaded'].forEach((name) => {
    channel.on(name, (evt) => {
      if (evt.detail && evt.detail.length > 0) {
        let element = evt.detail[0];
        element = (element instanceof HTMLElement) ? element : element.first();
        linker.link(element);
      } else {
        linker.linkAll();
      }
      channel.trigger('strudel:loaded');
    });
  });

  channel.on('content:unload', (evt) => {
    if (evt.detail) {
      let element = evt.detail[0];
      element = (element instanceof HTMLElement) ? element : element.first();
      linker.unlink(element);
    }
  });
};

export { init, registry };

