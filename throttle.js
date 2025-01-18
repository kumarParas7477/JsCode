function throttleCb(cb, interval) {
  let lastCall = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      cb.apply(this, args);
    }
  };
}
