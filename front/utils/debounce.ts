export function debounce(func: Function, ms: number): Function {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, ms);
  };
}
