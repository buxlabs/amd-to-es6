import Marionette from 'backbone.marionette';
import 'side-effect';

export default Marionette.Object.extend({

    initialize: function (options) {
        this.window.hello();
    }

});
