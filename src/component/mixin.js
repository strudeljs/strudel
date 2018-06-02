const mix = (target, source) => {
  Object.keys(source).forEach((prop) => {
    if (!target[prop]) {
      target[prop] = source[prop];
    }
  });
};

export default mix;
