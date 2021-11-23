let timer;

const debounce = (callback, limit) => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(function () {
    callback();
  }, limit);
};

export { debounce };
