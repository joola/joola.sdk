var async = require('async');
var logger = require('./logger');
global._ = require('underscore');

var fs         = require('fs');


global.fork = function (async_calls, shared_callback) {
    /*
    var counter = async_calls.length;
    var all_results = [];

    function makeCallback(index) {
        return function () {
            counter--;
            var results = [];
            // we use the arguments object here because some callbacks
            // in Node pass in multiple arguments as result.
            for (var i = 0; i < arguments.length; i++) {
                results.push(arguments[i]);
            }
            all_results[index] = results;
            if (counter == 0) {
                shared_callback(all_results);
            }
        }
    }

    for (var i = 0; i < async_calls.length; i++) {
        try {
            async_calls[i](makeCallback(i));
        }
        catch (ex) {
            console.log('Forked thread failed: ' + ex.message);
            console.log(ex.stack);
        }
    }
*/
    async.series(async_calls, shared_callback);
    //async.parallel(async_calls, shared_callback);
};

global.forkSeries = function (async_calls, shared_callback) {
    async.parallel(async_calls, shared_callback);
};

global.forkSeries = function (async_calls, shared_callback) {
    /*
     var counter = async_calls.length;
     var all_results = [];

     function makeCallback(index) {
     return function () {
     counter--;
     var results = [];
     // we use the arguments object here because some callbacks
     // in Node pass in multiple arguments as result.
     for (var i = 0; i < arguments.length; i++) {
     results.push(arguments[i]);
     }
     all_results[index] = results;
     if (counter == 0) {
     shared_callback(all_results);
     }
     }
     }

     for (var i = 0; i < async_calls.length; i++) {
     try {
     async_calls[i](makeCallback(i));
     }
     catch (ex) {
     console.log('Forked thread failed: ' + ex.message);
     console.log(ex.stack);
     }
     }
     */
    async.series(async_calls, shared_callback);
};

global.randomBetween = function (min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

global.chunk = function (array, chunkSize) {
    var lists = _.groupBy(array, function (a, b) {
        return Math.floor(b / chunkSize);
    });
    lists = _.toArray(lists);
    return lists;
};

try {
    Object.defineProperty(global, '__stack', {
        get: function () {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function (_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });

    Object.defineProperty(global, '__caller_line', {
        get: function () {
            return __stack[1].getLineNumber();
        }
    });

    Object.defineProperty(global, '__caller_function', {
        get: function () {
            return __stack[1].getFunctionName();
        }
    });
}
catch (ex) {
    //logger.error('Failed to redefine properties');
}

/**
 * Generates a random string of characters for the specific number of bits
 *
 * @method randomString
 * @param {int} bits number of bits to use
 * @return {string} A random string of characters
 */
exports.randomString = function (bits) {
    var chars, rand, i, ret
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    ret = ''

    // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
    while (bits > 0) {
        rand = Math.floor(Math.random() * 0x100000000) // 32-bit integer
        // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
        for (i = 26; i > 0 && bits > 0; i -= 6, bits -= 6) ret += chars[0x3F & rand >>> i]
    }

    return ret;
};

function formatDate(formatDate, formatString, adjustGMT) {
    if (adjustGMT) {
        formatDate = new Date(formatDate);

        var sign = (formatDate.getTimezoneOffset() > 0) ? 1 : -1;
        var offset = Math.abs(formatDate.getTimezoneOffset());
        var hours = Math.floor(offset / 60);

        formatDate.setHours(formatDate.getHours() + (sign * hours));
    }
    if (formatDate instanceof Date) {
        var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var yyyy = formatDate.getFullYear();
        var yy = yyyy.toString().substring(2);
        var m = formatDate.getMonth() + 1;
        var mm = m < 10 ? "0" + m : m;
        var mmm = months[m - 1];
        var d = formatDate.getDate();
        var dd = d < 10 ? "0" + d : d;

        var h = formatDate.getHours();
        var hh = h < 10 ? "0" + h : h;
        var n = formatDate.getMinutes();
        var nn = n < 10 ? "0" + n : n;
        var s = formatDate.getSeconds();
        var ss = s < 10 ? "0" + s : s;

        if (formatString == null)
            formatString = joolaio.dateformat;

        formatString = formatString.replace(/yyyy/i, yyyy);
        formatString = formatString.replace(/yy/i, yy);
        formatString = formatString.replace(/mmm/i, mmm);
        formatString = formatString.replace(/mm/i, mm);
        //formatString = formatString.replace(/m/i, m);
        formatString = formatString.replace(/dd/i, dd);
        //formatString = formatString.replace(/d/i, d);
        formatString = formatString.replace(/hh/i, hh);
        //formatString = formatString.replace(/h/i, h);
        formatString = formatString.replace(/nn/i, nn);
        //formatString = formatString.replace(/n/i, n);
        formatString = formatString.replace(/ss/i, ss);
        //formatString = formatString.replace(/s/i, s);

        return formatString;
    } else {
        return "";
    }
}

/**
 * Used to format date according to standard formatting options
 *
 * @method formatDate
 * @param {string} formatDate date to format
 * @param {string} formatString format to convert the date by
 * @param {bool} adjustGMT should GMT adjustments be applied
 * @return {string} formatted date
 */
exports.formatDate = formatDate;

Date.prototype.fixDate = function (force, direction) {
    date = this;
    if (!force)
        return date;

    if (!direction)
        var sign = (date.getTimezoneOffset() > 0) ? 1 : -1;
    else
        var sign = (date.getTimezoneOffset() > 0) ? -1 : 1;
    var offset = Math.abs(date.getTimezoneOffset());
    var hours = Math.floor(offset / 60);

    date.setHours(date.getHours() + (sign * hours));

    return date;
};

function pad(str, char, length) {
    while (str.length < length)
        str = char + str;
    return str;
}

String.prototype.pad = function (char, length) {
    return this.length >= length ? this : pad(this, char, 2);
};

Date.prototype.clean = function () {
    return formatDate(this, 'yyyy-mm-dd hh:nn:ss').clean();
};

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

Date.prototype.roundYear = function () {
    return new Date(this.getFullYear(), 0, 0, 0, 0, 0, 0);
};

Date.prototype.roundMonth = function () {
    return new Date(this.getFullYear(), this.getMonth(), 0, 0, 0, 0, 0);
};

Date.prototype.roundDay = function () {
    return new Date(this.getYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
};

Date.prototype.roundHour = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), 0, 0, 0);
};

Date.prototype.roundMinute = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), 0, 0);
};

Date.prototype.roundSecond = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), 0);
};


String.prototype.clean = function () {
    var result = this;
    result = result.replace(/ /g, '');
    result = result.replace(/\./g, '');
    result = result.replace(/-/g, '');
    result = result.replace(/\\/g, '');
    result = result.replace(/\//g, '');
    result = result.replace(/:/g, '');
    result = result.replace(/{/g, '');
    result = result.replace(/}/g, '');
    result = result.replace(/"/g, '');
    return result;
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
};

String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
};

String.prototype.fulltrim = function () {
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
};


Date.prototype.dateDiff = function (comparedtodate) {

    var first = this;
    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(comparedtodate.getFullYear(), comparedtodate.getMonth(), comparedtodate.getDate());

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(Math.abs(days));
}
