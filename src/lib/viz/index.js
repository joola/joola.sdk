/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


var viz = exports;
viz._id = 'viz';

//pickers
viz.DatePicker = require('./DatePicker');

//panels
viz.Canvas = require('./Canvas');

//charts
viz.Sparkline = require('./Sparkline');
viz.Metric = require('./Metric');
viz.Geo = require('./Geo');
viz.Pie = require('./Pie');
viz.MiniTable = require('./MiniTable');
viz.PunchCard = require('./PunchCard');
viz.Table = require('./Table');
viz.Timeline = require('./Timeline');

//onscreen
viz.onscreen = [];

viz.stam = function (callback) {
  return viz.pickers.init(callback);
};
