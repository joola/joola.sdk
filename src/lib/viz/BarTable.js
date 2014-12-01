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

  this._id = '_bartable';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    container: null,
    $container: null,
    query: null,
    strings: {
      not_shown: 'Not shown'
    },
    limit: 10,
    headers: false
  };
  this.chartDrawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('<div class="bartable-caption"></div>' +
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

  this._draw = function (callback) {
    if (typeof callback === 'function')
      return callback(null);
  };

  this.draw = function (options, callback) {
    self.stop();
    return this._super.fetch(this.options.query, function (err, message) {
      if (Array.isArray(message))
        message = message[0];
      if (err) {
        if (typeof callback === 'function')
          return callback(err);

        return;
      }

      var $col, $tr, trs;
      var series = self._super.makeTableChartSeries(message.dimensions, message.metrics, message.documents);
      if (!self.chartDrawn) {
        self.chartDrawn = true;

        var $html = self.template();


        if (self.options.headers) {
          var $thead = $($html.find('thead'));
          var $head_tr = $('<tr class="jio bartable captions"></tr>');

          message.metrics.forEach(function (m) {
            var $th = $('<th class="jio bartable caption metric"></th>');
            $th.text(m.name);
            $head_tr.append($th);
          });
          message.dimensions.forEach(function (d) {
            var $th = $('<th class="jio bartable caption dimension"></th>');
            $th.text(d.name);
            $head_tr.append($th);
          });

          $thead.append($head_tr);
          $html.find('table').append($thead);
        }
        var $tbody = $($html.find('tbody'));
        var hasData = false;
        series.forEach(function (ser, serIndex) {
          var total = 0;
          var shown = 0;
          var notshown = 0;
          ser.data.forEach(function (point, i) {
            hasData = true;
            total += point[1];
            if (i < (self.options.limit && self.options.limit < ser.data.length ? self.options.limit - 1 : self.options.limit ))
              shown += point[1];
            else
              notshown += point[1];
          });

          ser.data.forEach(function (point, i) {
            if (i < (self.options.limit && self.options.limit < ser.data.length ? self.options.limit - 1 : self.options.limit )) {
              var $tr = $('<tr></tr>');
              var index = 0;
              var percentage = parseFloat(point[1]) / total * 100;
              message.metrics.forEach(function (m) {
                var $td = $('<td class="jio bartable value">' +
                  '<div class="barwrapper">' +
                  '<div class="tablebar" style="width:' + percentage + '%"></div>' +
                  '</div>' +
                  '</td>');
                //$td.text(point[1]);
                $tr.append($td);
              });

              message.dimensions.forEach(function (d) {
                var $td = $('<td class="jio bartable value dimension">' +
                  '<div class="caption" title="Other"></div>' +
                  '<div class="subcaption"></div>' +
                  '</td>');

                $td.find('.caption').text(joola.common.ensureLength(percentage.toFixed(2) + '% ' + point[0], 23));
                $td.find('.subcaption').text(point[1] + ' ' + self.options.query.metrics[0].name);
                $tr.append($td);
              });

              $tbody.append($tr);
            }
          });
          if (self.options.limit && self.options.limit < ser.data.length) {
            var $tr = $('<tr></tr>');
            var index = 0;
            var percentage = parseFloat(notshown) / total * 100;
            message.metrics.forEach(function (m) {

              var $td = $('<td class="jio bartable value metric">' +
                '<div class="barwrapper">' +
                '<div class="tablebar" style="width:' + percentage + '%"></div>' +
                '</div>' +
                '</td>');
              $td.find('.tablebar').css({'background-color': joola.colors[11]});
              $tr.append($td);
            });

            message.dimensions.forEach(function (d) {
              var $td = $('<td class="jio bartable value dimension notshown">' +
                '<div class="caption" title="Other"></div>' +
                '<div class="subcaption"></div>' +
                '</td>');

              $td.find('.caption').text(percentage.toFixed(2) + '% ' + self.options.strings.not_shown || 'Not shown');
              $td.find('.subcaption').text(notshown + ' ' + self.options.query.metrics[0].name);
              $tr.append($td);
            });

            $tbody.append($tr);
          }
        });
        if (!hasData) {
          $tr = $('<tr></tr>');
          message.dimensions.forEach(function (d) {
            var $td = $('<td colspan="2" class="jio bartable nodata">' +
              'No data available.' +
              '</td>');
            $tr.append($td);
          });

          $tbody.append($tr);
        }
        $html.find('table').append($tbody);
        self.options.$container.append($html);

        if (self.options.caption)
          self.options.$container.find('.bartable-caption').text(self.options.caption);

        if (self.options.onDraw)
          window[self.options.onDraw](self.options.container, self);

        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) {
        //we're dealing with realtime
        trs = self.options.$container.find('tbody').find('tr');
        var existingkeys = [];
        series[0].data.forEach(function (point) {
          var index = 0;
          var key = '';
          var found = false;
          message.dimensions.forEach(function (d) {
            key += point[index++];
          });

          existingkeys.push(key);

          for (var i = 0; i < trs.length; i++) {
            $tr = $(trs[i]);
            var cols = $tr.find('td');

            var _key = '';
            var j;
            for (j = 0; j < message.dimensions.length; j++) {
              $col = $(cols[j]);
              _key += $col.text();
            }

            if (_key == key) {
              for (; j < message.dimensions.length + message.metrics.length; j++) {
                $col = $(cols[j]);
                var value = $col.text();
                if (value != point[j])
                  $col.text(point[j]);
              }
              found = true;
            }
          }
          if (!found) {
            //add
            var $tbody = $(self.options.$container.find('tbody')[0]);
            $tr = $('<tr></tr>');

            index = 0;
            message.dimensions.forEach(function (d) {
              var $td = $('<td class="jio bartable value dimension"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });
            message.metrics.forEach(function (m) {
              var $td = $('<td class="jio bartable value metric"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });

            $tbody.append($tr);
          }
        });
        for (var i = 0; i < trs.length; i++) {
          $tr = $(trs[i]);
          var cols = $tr.find('td');

          var _key = '';
          var j;
          for (j = 0; j < message.dimensions.length; j++) {
            $col = $(cols[j]);
            _key += $col.text();
          }

          if (existingkeys.indexOf(_key) == -1)
            $tr.remove();
        }
      }

      if (series[0].data.length > 0) {
        trs = self.options.$container.find('tbody tr');
        for (var z = 0; z < trs.length; z++) {
          var elem = trs[z];
          var $elem = $(elem);
          if (z + 1 > self.options.limit)
            $elem.remove();
        }
      }
    });
  };

  //here we go
  try {
    joola.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, [
        {type: 'bartable'},
        {uuid: self.uuid},
        {css: self.options.css}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

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

  //callback(null, self);
  return self;
};

joola.events.on('core.init.finish', function () {
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.BarTable = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        if (options.force && uuid) {
          var existing = null;
          found = false;
          joola.viz.onscreen.forEach(function (viz) {
            if (viz.uuid == uuid && !found) {
              found = true;
              existing = viz;
            }
          });

          if (found && existing) {
            existing.destroy();
          }
        }
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.BarTable(options, function (err, bartable) {
          if (err)
            throw err;
          bartable.draw(options, callback);
        }).options.$container;
      }
      else {
        //return existing
        found = false;
        joola.viz.onscreen.forEach(function (viz) {
          if (viz.uuid == uuid && !found) {
            found = true;
            result = viz;
          }
        });
      }
      return result;
    };
  }
});