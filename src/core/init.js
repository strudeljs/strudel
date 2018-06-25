import Linker from './linker';
import registry from './registry';
import $ from '../dom/element';

const linker = new Linker(registry);
const channel = $(document);

const getElement = (detail) => {
  let element;

  if (detail && detail.length > 0) {
    element = (detail[0] instanceof HTMLElement) ? detail[0] : detail[0].first();
  }

  return element;
};

const bootstrap = (root) => {
  linker.link(getElement(root));
  channel.trigger('strudel:loaded');
};

const bindContentEvents = () => {
  channel.on('content:loaded', (evt) => {
    bootstrap(evt.detail);
  });

  channel.on('content:unload', (evt) => {
    linker.unlink(getElement(evt.detail));
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

export default init;

