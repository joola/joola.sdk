/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */



joolaio.provide('joolaio.string');


/**
 * Repeats a string n times.
 * @param {string} string The string to repeat.
 * @param {number} length The number of times to repeat.
 * @return {string} A string containing {@code length} repetitions of
 *     {@code string}.
 */
joolaio.string.repeat = function (string, length) {
    return new Array(length + 1).join(string);
};


/**
 * Pads number to given length and optionally rounds it to a given precision.
 * For example:
 * <pre>padNumber(1.25, 2, 3) -> '01.250'
 * padNumber(1.25, 2) -> '01.25'
 * padNumber(1.25, 2, 1) -> '01.3'
 * padNumber(1.25, 0) -> '1.25'</pre>
 *
 * @param {number} num The number to pad.
 * @param {number} length The desired length.
 * @param {number=} opt_precision The desired precision.
 * @param {string=} opt_symbol The symbol to use for padding, default is 0.
 * @return {string} {@code num} as a string with the given options.
 */
joolaio.string.padNumber = function (num, length, opt_precision, opt_padsymbol) {
    var s = joolaio.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
    var index = s.indexOf('.');
    if (index == -1) {
        index = s.length;
    }
    if (opt_padsymbol)
        return joolaio.string.repeat(opt_padsymbol, Math.max(0, length - index)) + s;
    else
        return joolaio.string.repeat('0', Math.max(0, length - index)) + s;
};

joolaio.string.formatNumber = function (number, decimalplaces, commas) {

    number = parseFloat(number);

    if (decimalplaces > -1) {
        
        number = joolaio.string.roundNumber(number, decimalplaces);
    }

    if (commas == true) {
        number += '';
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        number = x1 + x2;
    }

    return number;
};

joolaio.string.roundNumber = function (number, decimal_points) {
    if (!decimal_points) return Math.round(number);
    if (number == 0) {
        var decimals = "";
        for (var i = 0; i < decimal_points; i++) decimals += "0";
        return "0." + decimals;
    }
    if (number > -1 && number < 1) {
        return number.toFixed(2);
    }

    var exponent = Math.pow(10, decimal_points);
    var num = Math.round((number * exponent)).toString();

    num = num.slice(0, -1 * decimal_points) + "." + num.slice(-1 * decimal_points);
    if (num < 1 && num > 0)
        num = '0' + num;
    else if (num > -1 && num < 0)
        num = '-0' + num.replace('-', '');

    return num;


};

joolaio.string.shortenNumber = function (n) {
    if ('number' !== typeof n) n = Number(n);
    var sgn = n < 0 ? '-' : ''
        , suffixes = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
        , overflow = Math.pow(10, suffixes.length * 3 + 3)
        , suffix, digits;
    n = Math.abs(Math.round(n));
    if (n < 1000) return sgn + n;
    if (n >= 1e100) return sgn + 'many';
    if (n >= overflow) return (sgn + n).replace(/(\.\d*)?e\+?/i, 'e'); // 1e24

    do {
        n = Math.floor(n);
        suffix = suffixes.shift();
        digits = n % 1e6;
        n = n / 1000;
        if (n >= 1000) continue; // 1M onwards: get them in the next iteration
        /*if (n >= 10 && n < 1000 // 10k ... 999k
         || (n < 10 && (digits % 1000) < 100) // Xk (X000 ... X099)
         )
         return sgn + Math.floor(n) + suffix;*/
        return (sgn + n).replace(/(\.\d\d).*/, '$1') + suffix; // #.#k
    } while (suffixes.length)
    return sgn + 'many';
}

joolaio.string.intToTime = function (TimeInSeconds) {
    var sHours = (Math.round(((TimeInSeconds / 60.0) / 60) - 0.5, 0)).toString();
    var sMinutes = (Math.round((TimeInSeconds / 60.0) - 0.5, 0) % 60).toString();
    var sSeconds = parseInt((TimeInSeconds % 60)).toString();

    if (sHours.length == 1)
        sHours = '0' + sHours;
    if (sMinutes.length == 1)
        sMinutes = '0' + sMinutes;
    if (sSeconds.length == 1)
        sSeconds = '0' + sSeconds;

    return sHours + ':' + sMinutes + ':' + sSeconds;

}