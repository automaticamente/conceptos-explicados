var fs = require('fs');
var _ = require('underscore');

var words = require('./words.json');

var Twit = require('twit');

var config = fs.existsSync('./local.config.js') ? require('./local.config.js') : require('./config.js');

var Twitter = new Twit(config.API);

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

    var c1 = _.sample(config.con1);

    var name = _.sample(getSubSet([nameGender]));

    var c2 = _.sample(config.con2);
    var c3 = _.sample(config.con3);

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

setInterval(function() {
    'use strict';
    try {
        tweet();
    } catch (e) {
        console.log(e);
    }
}, 1000 * 60 * 30);

tweet();
