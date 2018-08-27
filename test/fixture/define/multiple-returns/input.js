define([], function () {
  function a () {}
  if (typeof Object.create === 'function') {
    return Object.create
  } else {
    return function (b) {
      a.prototype = b
      var c = new a()
      a.prototype = null
      return c
    }
  }
})
