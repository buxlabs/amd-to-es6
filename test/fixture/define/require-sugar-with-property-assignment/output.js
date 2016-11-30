import $ASSIGNED_1 from 'model/first.model';
import $ASSIGNED_2 from 'model/second.model';
import codesEnum from 'enum/codes.enum';

var models = {};
models[codesEnum.FIRST] = $ASSIGNED_1;
models[codesEnum.SECOND] = $ASSIGNED_2;

export default {
    getClass: function (type) {
        return models[type];
    }
};
