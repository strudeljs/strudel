import Linker from './linker';
import registry from './registry';
import $ from '../dom/element';
import attachNewMutationObserver from './observer';

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

const onMutationCallback = (mutation) => {
  const registeredSelectors = registry.getRegisteredSelectors();

  Array.prototype.slice.call(mutation.addedNodes)
  .filter((node) => {
    return node.nodeName !== 'SCRIPT' && node.nodeType === 1;
  })
  .forEach((node) => {
    if (registeredSelectors.find((el) => {
      return $(node).is(el);
    })) {
      bootstrap([node]);
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
  attachNewMutationObserver(channel._nodes[0], onMutationCallback);
};

export default init;

