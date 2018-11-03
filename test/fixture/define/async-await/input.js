define(["foo"], function (foo) {
  return async function bar () {
    await foo()
  }
})
