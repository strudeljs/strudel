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

const attachNewMutationObserver = (observerRoot, callback) => {
  const observer = new MutationObserver((mutations) => { onChildrenAddition(mutations, callback); });
  const observerConfig = {
    childList: true,
    subtree: true
  };
  observer.observe(observerRoot, observerConfig);
};

export default (observerRoot, callback) => { return attachNewMutationObserver(observerRoot, callback); };
