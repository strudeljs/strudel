import Linker from './linker';
import Registry from './registry';
import $ from './element';

const registry = new Registry();
const linker = new Linker(registry);
const channel = $(document);

const getElement = (detail) => {
  const element = detail[0];
  return (element instanceof HTMLElement) ? element : element.first();
};

const bootstrap = (root) => {
  if (root && root.length > 0) {
    linker.link(getElement(root));
  } else {
    linker.linkAll();
  }
  channel.trigger('strudelloaded');
};

const bindContentEvents = () => {
  channel.on('contentloaded', (evt) => {
    bootstrap(evt.detail);
  });

  channel.on('contentunload', (evt) => {
    if (evt.detail) {
      linker.unlink(getElement(evt.detail));
    }
  });
};

const init = () => {
  if (/comp|inter|loaded/.test(document.readyState)) {
    setTimeout(bootstrap, 0);
  } else {
    channel.on('DOMContentLoaded', bootstrap);
  }

  bindContentEvents();
};

export { init, registry };

