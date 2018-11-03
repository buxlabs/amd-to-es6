import View from "core/view";
import template from "subapps/hello/template/layout";

var MyView = View.extend({
  template: template
});

MyView.ENUM = {
  SEND: "send",
  CANCEL: "cancel"
};

export default MyView;
