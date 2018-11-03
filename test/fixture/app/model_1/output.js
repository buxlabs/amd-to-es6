import Backbone from "backbone";

var State, Model;

State = {
  NEW: 0,
  ERROR: 1,
  RETRY: 2,
  SUCCESS: 3,
  CANCELLED: 4
};

Model = Backbone.Model.extend({});

Model.State = State;

export default Model;
