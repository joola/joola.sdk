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

var MiniTable = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('minitable.init.start');
  var self = this;

  this._id = '_minitable';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    container: null,
    $container: null,
    query: null
  };
  this.chartDrawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('<table class="jio minitable table">' +
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

        var $thead = $($html.find('thead'));
        var $head_tr = $('<tr class="jio minitable captions"></tr>');

        message.dimensions.forEach(function (d) {
          var $th = $('<th class="jio minitable caption dimension"></th>');
          $th.text(d.name);
          $head_tr.append($th);
        });
        message.metrics.forEach(function (m) {
          var $th = $('<th class="jio minitable caption metric"></th>');
          $th.text(m.name);
          $head_tr.append($th);
        });

        $thead.append($head_tr);
        $html.append($thead);

        var $tbody = $($html.find('tbody'));
        series.forEach(function (ser, serIndex) {
          ser.data.forEach(function (point) {
            var $tr = $('<tr></tr>');

            var index = 0;
            message.dimensions.forEach(function (d) {
              var $td = $('<td class="jio minitable value dimension"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });
            message.metrics.forEach(function (m) {
              var $td = $('<td class="jio minitable value metric"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });

            $tbody.append($tr);
          });
        });
        $html.append($tbody);
        self.options.$container.append($html);

        self.tablesort = new Tablesort($html.get(0), {
          descending: true,
          current: $html.find('th')[1]
        });


        if (self.options.onDraw)
          window[self.options.onDraw](self);

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
              var $td = $('<td class="jio minitable value dimension"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });
            message.metrics.forEach(function (m) {
              var $td = $('<td class="jio minitable value metric"></td>');
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
        self.tablesort.refresh();

        var limit = 5;
        trs = self.options.$container.find('tbody tr');
        for (var z = 0; z < trs.length; z++) {
          var elem = trs[z];
          var $elem = $(elem);
          if (z + 1 > limit)
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
        {'type': 'minitable'},
        {'uuid': self.uuid},
        {'css': self.options.css}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        joola.events.emit('minitable.init.finish', self);
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
    $.fn.MiniTable = function (options, callback) {
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
        result = new joola.viz.MiniTable(options, function (err, minitable) {
          if (err)
            throw err;
          minitable.draw(options, callback);
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