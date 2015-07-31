var fs = require('fs');
var _ = require('underscore');

var words = require('./words.json');

var Twit = require('twit');

var config = fs.existsSync('./local.config.js') ? require('./local.config.js') : require('./config.js');

var Twitter = new Twit(config.API);

var con1 = [{
    m: ' pódese entender como ',
    g: {
        m: 'un ',
        f: 'unha '
    }
}, {
    m: ' conceptualmente é unha derivación ',
    g: {
        m: 'do ',
        f: 'da ',
    }
}, {
    m: ' pode analizarse dende o prisma ',
    g: {
        m: 'do ',
        f: 'da ',
    }
}, {
    m: ' é unha extensión ',
    g: {
        m: 'do ',
        f: 'da ',
    }
}, {
    m: ', que fermosa metáfora ',
    g: {
        m: 'do ',
        f: 'da ',
    }
}, {
    m: ' debería estudarse como ',
    g: {
        m: 'un ',
        f: 'unha ',
    }

}];

var con2 = [{
    m: ', sempre '
}, {
    m: ', pero '
}, {
    m: ', dende o punto de vista ',
    g: 'm'
}, {
    m: ', sutilmente '
}, {
    m: ', en parte '
}, {
    m: ', sen dúbida '
}];

var con3 = [{
    m: ' e '
}, {
    m: ', nunca '
}, {
    m: ' e con influenza ',
    g: 'f'
}, {
    m: ' máis '
}, {
    m: ', certamente '
}, {
    m: ', abertamente '
}];

var getSubSet = function(classes) {
    'use strict';

    return _.filter(words, function(word) {
        return _.intersection(classes, word.classes).length > 0;
    });
};

var build = function() {
    'use strict';
    var nameGender = _.sample(['f', 'm']);

    var concept = _.sample(_.filter(words, function(word) {
        return word.word.slice(-4) === 'ismo';
    }));

    var c1 = _.sample(con1);

    var name = _.sample(getSubSet([nameGender]));

    var c2 = _.sample(con2);
    var c3 = _.sample(con3);

    var ad = _.sample(getSubSet(['a']));
    var ad2 = _.sample(getSubSet(['a']));

    var result =
        'O ' +
        concept.word +
        c1.m +
        c1.g[nameGender] +
        name.word + c2.m +
        ((c2.g || nameGender) === 'f' ? (ad.feminine ? ad.feminine : ad.word) : ad.word) +
        c3.m +
        ((c3.g || nameGender) === 'f' ? (ad2.feminine ? ad2.feminine : ad2.word) : ad2.word) +
        '.';

    return result;
};

var tweet = function() {
    'use strict';

    var status = build();

    Twitter.post('statuses/update', {
        status: status
    }, function(error, data, response) {
        if (error) {
            throw new Error(error);
        }

        console.log(status);
    });
};

tweet();