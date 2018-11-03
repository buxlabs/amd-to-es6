define([
  "common/enums/my.enum"
], function (MY_ENUM) {
  "use strict";

  var map1 = {},
    map2 = {};

  map1[MY_ENUM.HELLO.WORLD] = "Hello";
  map2[MY_ENUM.WORLD.HELLO] = "World";

  return {
    MAP1: map1,
    MAP2: map2
  };
});
