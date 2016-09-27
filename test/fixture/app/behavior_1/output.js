import Behavior from 'core/behavior';
import typeahead from 'typeahead';

export default Behavior.extend({
    ui: {
        hello: '.world'
    },
    onRender: function () {
        this.ui.hello.typeahead('destroy');
    }
});
