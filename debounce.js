function debouncecb(cb, timeout) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => cb.apply(this, args), timeout);
  };
}
