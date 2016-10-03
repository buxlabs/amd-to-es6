import Marionette from 'backbone.marionette';
import $SIDE_EFFECT_1 from 'side-effect';
export default Marionette.Object.extend({
    initialize: function (options) {
        this.window.hello();
    }
});