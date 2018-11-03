import Model from "core/model";

var Model1, Model2;
Model1 = Model.extend({
  defaults: {
    status: "1"
  }
});
Model2 = Model.extend({
  defaults: {
    status: "2"
  }
});
export default {
  Model1: Model1,
  Model2: Model2
};
