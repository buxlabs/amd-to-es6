import codesEnum from "enum/codes.enum";
import a from "model/first.model";
import b from "model/second.model";

var models = {};
models[codesEnum.FIRST] = a;
models[codesEnum.SECOND] = b;

export default {
  getClass: function (type) {
    return models[type];
  }
};
