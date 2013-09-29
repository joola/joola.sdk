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


joolaio.provide('joolaio.debug');

joolaio.require('joolaio.string');

joolaio.debug.log = function (type, module, level, message) {
    if (joolaio.DEBUG && joolaio.DEBUGLEVEL >= level) {
        var timepassed = new Date() - joolaio.loadTimestamp;
        timepassed = joolaio.string.padNumber(timepassed / 1000, 4, 3, ' ');

        if (level <= joolaio.DEBUGLEVEL)
            console.log('[' + timepassed + 's] ' + '[' + module + '] ' + message);
    }
};

joolaio.debug.log('INFO', 'Debug', 6, 'JS source loaded');
