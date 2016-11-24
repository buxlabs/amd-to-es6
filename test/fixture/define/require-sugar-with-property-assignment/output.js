import codesEnum from 'enum/codes.enum';
import $NAMED_1 from 'model/first.model';
import $NAMED_2 from 'model/second.model';

var models = {};
models[codesEnum.FIRST] = $NAMED_1;
models[codesEnum.SECOND] = $NAMED_2;

export default {
    getClass: function (type) {
        return models[type];
    }
};
