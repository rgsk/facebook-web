export const capitalize = (val) => {
  const arr = val.split('');
  return arr[0].toUpperCase() + arr.slice(1).join('');
};
export class Debounce {
  callback;
  delay;
  timeOut;
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
  }
  call(...args) {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => this.callback(...args), this.delay);
  }
}
export const reverse = (arr) => {
  const updated = [...arr];
  updated.reverse();
  return updated;
};
