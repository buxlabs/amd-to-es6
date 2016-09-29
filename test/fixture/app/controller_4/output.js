import Marionette from 'backbone.marionette';
let text = 'Hello world!';

export default Marionette.Object.extend({
    initialize: function () {
        console.log(text);
    }
});
