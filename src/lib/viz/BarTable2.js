/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var
  joola = require('../index'),
  d3 = require('d3'),
  _jquery = require('jquery'),
  _ = require('underscore');

var BarTable = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('bartable.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  var self = this;

  this._id = '_bartable2';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    container: null,
    $container: null,
    query: null,
    strings: {
      not_shown: 'No data available.'
    },
    limit: 10,
    headers: false
  };
  this.chartDrawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = _jquery('<div class="bartable-caption"></div>' +
      '<table class="jio bartable table">' +
      '<thead>' +
      '</thead>' +
      '<tbody>' +
      '</tbody>' +
      '</table>');
    return $html;
  };

  this.sort = function (key, callback) {
    if (typeof callback === 'function')
      return callback(null);
  };

  this.draw = function (options, callback) {
    self.stop();
    return this._super.fetch(this.options.query, function (err, message) {
      console.log('done', message);
      var get_key = function (d) {
        console.log('get key', d);
        return d.key;
      };

      var extract_row_data = function (d) {
        console.log('extract', d);
        return d;
      };
      var table = self.options.$container;
      var values = [];
      message.documents.forEach(function (d) {
        values.push(d.values);
      });
      var rows = table.selectAll('tr').data(values);
      //////////////////////////////////////////
      // ROW ENTER SELECTION
      // Add new rows
      var cells_in_new_rows = rows.enter().append('tr')
        .selectAll('td')
        .data(extract_row_data);

      cells_in_new_rows.enter().append('td')
        .style('opacity', 0.0)
        .attr('class', 'enter')
        .transition()
        .delay(900)
        .duration(500)
        .style('opacity', 1.0);

      cells_in_new_rows.text('aaa');

      /////////////////////////////////////////
      // ROW EXIT SELECTION
      // Remove old rows
      rows.exit()
        .attr('class', 'exit')
        .transition()
        .delay(200)
        .duration(500)
        .style('opacity', 0.0)
        .remove();

      table.selectAll('tr').select('td').classed('row-header', true);
    });
  };

  //here we go
  try {
    joola.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = d3.select(self.options.container);
      self.markContainer(self.options.$container, [
        {type: 'bartable'},
        {uuid: self.uuid},
        {css: self.options.css}
      ], function (err) {
        if (err)
          return callback(err);
        joola.viz.onscreen.push(self);

        _jquery(self.options.container).append(self.template());

        joola.events.emit('bartable.init.finish', self);
        if (self.options.canvas) {
          self.options.canvas.addVisualization(self);
          //subscribe to default events
          self.options.canvas.on('datechange', function (dates) {
            //let's change our query and fetch again
            self.options.query.timeframe = {};
            self.options.query.timeframe.start = new Date(dates.base_fromdate);
            self.options.query.timeframe.end = new Date(dates.base_todate);
            self.destroy();
            self.draw(self.options);
          });
        }

        if (typeof callback === 'function')
          return callback(null, self);
      });
    });
  }
  catch (err) {
    callback(err);
    return self.onError(err, callback);
  }
  return self;
};