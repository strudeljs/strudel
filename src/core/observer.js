const onChildrenAddition = (mutation, callback) => {
  if (
      mutation.type === 'childList'
      && mutation.addedNodes.length > 0
  ) {
    callback(mutation);
  }
};

const onChildrenRemoval = (mutation, callback) => {
  if (
      mutation.type === 'childList'
      && mutation.removedNodes.length > 0
  ) {
    callback(mutation);
  }
};

const defaultObserverConfig = {
  childList: true,
  subtree: true
};

const mutationCallback = (mutations, additionCallback, removalCallback) => {
  mutations.forEach((mutation) => {
    onChildrenRemoval(mutation, removalCallback);
    onChildrenAddition(mutation, additionCallback);
  });
};

const attachDOMObserver = (observerRoot, additionCallback, removalCallback) => {
  const DOMObserver = new MutationObserver((mutations) => {
    mutationCallback(mutations, additionCallback, removalCallback);
  });

  DOMObserver.observe(observerRoot, defaultObserverConfig);
};

export default attachDOMObserver;
