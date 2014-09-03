/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var joola = require('../index');

global.emptyfunc = function () {

};

joola.timezone = function (tz) {
  if (tz)
    joola.options.timezoneOffset = tz;

  var offset = 0;
  if (joola.options.timezoneOffset)
    offset = joola.options.timezoneOffset || (new Date().getTimezoneOffset() / 60 * -1);

  return offset;
};