var _ = require('underscore');

var words = require('./words.json');

var con1 = [{
    m: ' pódese entender como ',
    g: {
        m: 'un ',
        f: 'unha '
    }
}, {
    m: ', conceptualmente é unha derivación ',
    g: {
        m: 'do ',
        f: 'da ',
    }
}];

var con2 = [{
    m: ', pero '
}, {
    m: ', dende o punto de vista ',
    g: 'm'
}];

var con3 = [{
    m: ' e '
}, {
    m: ' e nunca '
}, {
    m: ' e con influenza ',
    g: 'f'
}];

var getSubSet = function(gender) {
    'use strict';

    return _.filter(words, function(word) {
        return word.gender === gender;
    });
};

var build = function() {
    'use strict';
    var nameGender = _.sample(['f', 'm']);

    var concept = _.sample(_.filter(words, function(word) {
        return word.word.slice(-4) === 'ismo';
    }));

    var c1 = _.sample(con1);

    var name = _.sample(getSubSet(nameGender));

    var c2 = _.sample(con2);
    var c3 = _.sample(con3);

    var ad = _.sample(getSubSet('a'));
    var ad2 = _.sample(getSubSet('a'));

    var result =
        'O ' +
        concept.word +
        c1.m +
        c1.g[nameGender] +
        name.word + c2.m +
        ((c2.g || nameGender) === 'f' ? (ad.feminine ? ad.feminine : ad.word) : ad.word) +
        c3.m +
        ((c3.g || nameGender) === 'f' ? (ad2.feminine ? ad2.feminine : ad2.word) : ad2.word);

    return result;
};

var i = 20;

while (i > 0) {
    console.log(build());
    i--;
}
