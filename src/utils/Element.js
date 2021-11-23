const makeElement = (tag, className, id, textContent, type) => {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (id) element.id = id;
  if (textContent) element.textContent = textContent;
  if (type) element.type = type;

  return element;
};

export { makeElement };
