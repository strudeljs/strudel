import Linker from './linker';
import registry from './registry';
import $ from '../dom/element';
import attachDOMObserver from './observer';
import config from '../config';
import mount from '../util/devtools';

const linker = new Linker(registry);
const channel = $(document);

const isValidNode = ({ nodeName, nodeType }) => {
  return nodeName !== 'SCRIPT' && nodeName !== 'svg' && nodeType === 1;
};

const getElement = (detail) => {
  let element;

  if (detail && detail.length > 0) {
    element = isValidNode(detail[0]) ? detail[0] : detail[0].first();
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

const onAutoInitCallback = (mutation) => {
  const registeredSelectors = registry.getRegisteredSelectors();

  Array.prototype.slice.call(mutation.addedNodes)
    .filter((node) => {
      return isValidNode(node);
    })
    .forEach((node) => {
      if (registeredSelectors.some((el) => {
        const lookupSelector = `${el}:not(${config.initializedSelector})`;

        return $(node).is(lookupSelector) || $(node).find(lookupSelector).length;
      })) {
        bootstrap([node]);
      }
    });
};

const onAutoTeardownCallback = (mutation) => {
  Array.prototype.slice.call(mutation.removedNodes)
    .filter((node) => {
      return isValidNode(node) && ($(node).is(config.initializedSelector) || $(node).find(config.initializedSelector).length);
    })
    .forEach((node) => {
      const initializedSubNodes = node.querySelector(config.initializedSelector);

      if (initializedSubNodes) {
        Array.prototype.slice.call(initializedSubNodes).forEach(
          (subNode) => { linker.unlink(subNode); },
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
  attachDOMObserver(channel._nodes[0].body, onAutoInitCallback, onAutoTeardownCallback);
};

export default init;

