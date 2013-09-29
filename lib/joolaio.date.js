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



joolaio.provide('joolaio.date');

joolaio.require('joolaio.debug');

/**
 * Formats a month/year string.
 * Example: "January 2008"
 *
 * @return {date} The current server timestamp
 */
joolaio.date.getServerTimestamp = function () {
    return new Date();
};

joolaio.date.formatDate = function (formatDate, formatString, adjustGMT) {
    if (adjustGMT) {
        formatDate = new Date(formatDate);
        formatDate.setHours(formatDate.getHours() + 3);
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
};

joolaio.date.flatDate = function (sDate) {
    var x = new Date(sDate);
    x.setHours(x.getHours() - (x.getTimezoneOffset() / 60));

    return x;
}

Date.prototype.fixDate = function (force, direction, isZ) {
    date = this;
    if (!force)
        return date;

    if (!direction)
        var sign = (date.getTimezoneOffset() > 0) ? 1 : -1;
    else
        var sign = (date.getTimezoneOffset() > 0) ? -1 : 1;

    var offset = Math.abs(date.getTimezoneOffset());
    var hours = Math.floor(offset / 60);
    if (isZ) {
        date.addHours(hours);
    }
    date.setHours(date.getHours() + (sign * hours));

    return date;
};