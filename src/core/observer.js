const onChildrenAddition = (mutations, callback) => {
  mutations.forEach((mutation) => {
    if (
        mutation.type === 'childList'
        && mutation.addedNodes.length > 0
    ) {
      callback(mutation);
    }
  });
};

const onChildrenRemoval = (mutations, callback) => {
  mutations.forEach((mutation) => {
    if (
        mutation.type === 'childList'
        && mutation.removedNodes.length > 0
    ) {
      callback(mutation);
    }
  });
};

const defaultObserverConfig = {
  childList: true,
  subtree: true
};

const attachNewObserver = (observerRoot, callback, mutationCallback) => {
  const initializationObserver = new MutationObserver((mutations) => { mutationCallback(mutations, callback); });
  initializationObserver.observe(observerRoot, defaultObserverConfig);
};

export const attachNewInitObserver = (observerRoot, callback) => {
  attachNewObserver(observerRoot, callback, onChildrenAddition);
};

export const attachNewTeardownObserver = (observerRoot, callback) => {
  attachNewObserver(observerRoot, callback, onChildrenRemoval);
};
