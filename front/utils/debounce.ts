export function debounce(func: Function, ms: any) {
  let timer: any = null;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, ms);
  };
}
