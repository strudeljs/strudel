const bindElements = (context, elements) => {
  if (!elements) {
    return false;
  }

  return Object.keys(elements).forEach((key) => {
    const property = elements[key];
    if (context.$element) {
      context[property] = context.$element.find(key);
    }
  });
};

export { bindElements };
