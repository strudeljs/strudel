const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

const delegateEvents = (context, events) => {
  for (var key in events) {
    var method = events[key];
    var match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.element) {
      delegate(context.element, match[1], match[2], method.bind(context));
    }
  }
}

const delegate = (element, eventName, selector, listener) => {
  element.on(eventName, selector, listener);
}

export { delegateEvents, delegate }
