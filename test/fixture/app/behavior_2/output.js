import Behavior from 'core/behavior';
import jquerySwing from 'jquery.swing';

export default Behavior.extend({
    ui: {
        hello: '.world'
    },
    onRender: function () {
        this.ui.hello.swing();
    }
});
