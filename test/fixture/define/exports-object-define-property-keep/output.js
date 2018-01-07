Object.defineProperty(window, 'custom', {
  value: true
});
var a = 'foo';
export { a as default };
