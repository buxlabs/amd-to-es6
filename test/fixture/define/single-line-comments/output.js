// hello world
import channel from 'core/channel';
export default {
    fetch: function () {
        return channel.request('service:properties:request');
    }
};
