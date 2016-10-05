import Component from 'troopjs-core/component/base';
import $ from 'jquery';

export default Component.extend(function personComponent(name) {
  this.name = name;
},
{
  'sig/start': function startSignal(time) {
    var me = this;
    return $.ajax({
      url: 'give-birth',
      data: {
        name: me.name,
        birth: time
      }
    });
  }
});