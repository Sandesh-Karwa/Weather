/**
 * Debounce function to trigger the callback based on the duration passed 
 */
export const debounce = (func, duration = 500) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, duration);
  };
}
