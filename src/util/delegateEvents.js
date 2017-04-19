const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

const delegate = (element, eventName, selector, listener) => {
  element.on(eventName, selector, listener);
};

const delegateEvents = (context, events) => {
  if (!events) {
    return false;
  }

  return Object.keys(events).forEach((key) => {
    const method = events[key];
    const match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.element) {
      delegate(context.element, match[1], match[2], method.bind(context));
    }
  });
};

export { delegateEvents, delegate };
