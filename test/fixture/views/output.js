import View from "core/view";
import jst from "subapp/logs/show/template/layout.jst";


export default View.extend({
    template: jst,
    className: "logs-layout-view",
    triggers: {
        "click .js-exceptions": "exceptions:clicked"
    }
});
