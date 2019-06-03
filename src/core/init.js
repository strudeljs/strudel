import Linker from './linker';
import registry from './registry';
import $ from '../dom/element';
import { attachNewInitObserver, attachNewTeardownObserver } from './observer';
import config from '../config';
import mount from '../util/devtools';

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
};

const initializedSelector = `.${config.initializedClassName}`;

const onAutoInitCallback = (mutation) => {
  const registeredSelectors = registry.getRegisteredSelectors();

  Array.prototype.slice.call(mutation.addedNodes)
  .filter((node) => {
    return node.nodeName !== 'SCRIPT' && node.nodeType === 1;
  })
  .forEach((node) => {
    if (registeredSelectors.find((el) => {
      const lookupSelector = `${el}:not(${initializedSelector})`;

      return $(node).is(lookupSelector) || $(node).find(lookupSelector).length;
    })) {
      bootstrap([node]);
    }
  });
};

const onAutoTeardownCallback = (mutation) => {
  Array.prototype.slice.call(mutation.removedNodes)
    .filter((node) => {
      return node.nodeName !== 'SCRIPT'
        && node.nodeType === 1
        && $(node).is(initializedSelector);
    })
    .forEach((node) => {
      const initializedSubNodes = node.querySelector(initializedSelector);

      if (initializedSubNodes) {
        Array.prototype.slice.call(initializedSubNodes).forEach(
          (subNode) => { linker.unlink(subNode); }
        );
      }
      linker.unlink(node);
    });
};

const init = () => {
  if (/comp|inter|loaded/.test(document.readyState)) {
    setTimeout(bootstrap, 0);
  }

  mount();
  bindContentEvents();
  attachNewInitObserver(channel._nodes[0].body, onAutoInitCallback);
  attachNewTeardownObserver(channel._nodes[0].body, onAutoTeardownCallback);
};

export default init;

