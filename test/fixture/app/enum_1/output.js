import MY_ENUM from "common/enums/my.enum";

var map1 = {},
  map2 = {};

map1[MY_ENUM.HELLO.WORLD] = "Hello";
map2[MY_ENUM.WORLD.HELLO] = "World";

export default {
  MAP1: map1,
  MAP2: map2
};
