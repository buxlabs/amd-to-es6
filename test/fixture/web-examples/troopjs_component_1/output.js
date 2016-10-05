import Component from 'troopjs-core/component/base';
export default Component.extend(function ChildComponent(name) {
    this.name = name;
}, {
    'walk': function () {
    }
});