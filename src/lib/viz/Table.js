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


var Table = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('table.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  var self = this;

  this._id = '_table';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    container: null,
    $container: null,
    query: null,
    row: {
      checkbox: false,
      id: false
    },
    pickers: {
      main: {enabled: false},
      secondary: {enabled: false}
    }
  };
  this.chartDrawn = false;
  this.realtimeQueries = [];

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('' +
      '<div class="jio jtable breadcrumbs"></div>' +
      '<div class="jio jtable controls">' +
      ' <div class="jio jtable primary-dimension-picker"></div>' +
      '</div>' +
      '<table class="jio table sort">' +
      ' <thead>' +
      ' </thead>' +
      ' <tbody>' +
      ' </tbody>' +
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

      if (message.realtime && self.realtimeQueries.indexOf(message.realtime) == -1)
        self.realtimeQueries.push(message.realtime);

      var $col, $tr, trs;
      var series = self._super.makeTableChartSeries(message.dimensions, message.metrics, message.documents);
      if (!self.chartDrawn) {
        self.chartDrawn = true;

        var $html = self.template();

        var $thead = $($html.find('thead'));
        var $head_tr = $('<tr class="jio tbl captions"></tr>');
        var $th;

        if (self.options.row.checkbox) {
          $th = $('<th class="jio tbl caption check"></th>');
          $th.text('');
          $head_tr.append($th);
        }
        if (self.options.row.id) {
          $th = $('<th class="jio tbl caption id no-sort"></th>');
          $th.text('');
          $head_tr.append($th);
        }

        message.dimensions.forEach(function (d, i) {
          if (i === 2)
            $th = $('<th class="jio tbl caption dimension sort-default"></th>');
          else
            $th = $('<th class="jio tbl caption dimension"></th>');
          $th.text(d.name);
          $head_tr.append($th);
        });
        message.metrics.forEach(function (m) {
          var $th = $('<th class="jio tbl caption metric"></th>');
          $th.text(m.name);
          $head_tr.append($th);
        });

        $thead.append($head_tr);
        $html.find('table').append($thead);

        var $tbody = $($html.find('tbody'));
        series.forEach(function (ser, serIndex) {
          ser.data.forEach(function (point, pointIndex) {
            var $tr = $('<tr></tr>');
            var $td;
            var $check;
            if (self.options.row.checkbox) {
              $td = $('<td class="jio tbl value check"></td>');
              $check = $('<input type="checkbox"/>');
              $check.on('click', function () {
                var $this = $(this);
                if ($this.is(':checked')) {
                  if (self.options.canvas)
                    self.options.canvas.emit('addplot', self, JSON.parse($this.attr('data-filter')));
                  $(self).trigger('addplot', JSON.parse($this.attr('data-filter')));
                }
                else if (self.options.canvas)
                  self.options.canvas.emit('removeplot', self, JSON.parse($this.attr('data-filter')));
                $(self).trigger('removeplot', JSON.parse($this.attr('data-filter')));
              });
              $td.append($check);
              $tr.append($td);
            }

            if (self.options.row.id) {
              $td = $('<td class="jio tbl value id"></td>');
              $td.text(pointIndex + 1 + '.');
              $tr.append($td);
            }

            var index = 0;
            var dataDimensions = [];
            message.dimensions.forEach(function (d) {
              $td = $('<td class="jio tbl value dimension dimensionvalue"></td>');
              $td.text(point[index++]);
              dataDimensions.push([d.key, 'eq', $td.text()]);
              $tr.append($td);
            });
            if ($check)
              $check.attr('data-filter', JSON.stringify(dataDimensions));

            message.metrics.forEach(function (m) {
              $td = $('<td class="jio tbl value metric metricvalue"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });

            $tbody.append($tr);
          });
        });
        $html.find('table').append($tbody);
        self.options.$container.append($html);

        if (self.options.pickers && self.options.pickers.main && self.options.pickers.main.enabled) {
          var $primary_dimension_container;
          if (self.options.pickers.main.container)
            $primary_dimension_container = $(self.options.pickers.main.container);
          else
            $primary_dimension_container = $(self.options.$container.find('.primary-dimension-picker')[0]);

          if ($primary_dimension_container) {
            $primary_dimension_container.DimensionPicker({canvas: self.options.canvas}, function (err, _picker) {
              if (err)
                throw err;
              _picker.on('change', function (dimension) {
                if (Array.isArray(self.options.query)) {
                  self.options.query.forEach(function (query) {
                    query.dimensions[0] = dimension;
                  });
                }
                else
                  self.options.query.dimensions[0] = dimension;

                self.destroy();
                self.draw(self.options);
              });
            });
          }
        }


        self.tablesort = new Tablesort(self.options.$container.find('table').get(0), {
          descending: true
        });
        if (self.options.$container.find('th')[2] > 0)
          self.tablesort.sortTable(self.options.$container.find('th')[2]);
        if (self.options.onDraw)
          window[self.options.onDraw](self.options.container, self);

        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) {
        if (self.options.onUpdate)
          window[self.options.onUpdate](self);
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
            var start = 0;
            var end = message.dimensions.length;
            if (self.options.row.checkbox) {
              start++;
              end++;
            }
            for (j = start; j < end; j++) {
              $col = $(cols[j]);
              _key += $col.text();
            }
            if (_key === key) {
              found = true;
              for (; j < message.dimensions.length + message.metrics.length; j++) {
                $col = $(cols[j]);
                var value = $col.text();
                if (value != point[j]) {
                  $col.text(point[j]);
                }
              }
            }
          }
          if (!found) {
            console.log('not found');
            //add
            var $tbody = $(self.options.$container.find('tbody')[0]);
            $tr = $('<tr></tr>');
            var $td;
            var $check;
            if (self.options.row.checkbox) {
              $td = $('<td class="jio tbl value check"></td>');
              $check = $('<input type="checkbox"/>');
              $check.on('click', function () {
                var $this = $(this);
                if ($this.is(':checked')) {
                  if (self.options.canvas)
                    self.options.canvas.emit('addplot', self, JSON.parse($this.attr('data-filter')));
                  $(self).trigger('addplot', JSON.parse($this.attr('data-filter')));
                }
                else if (self.options.canvas)
                  self.options.canvas.emit('removeplot', self, JSON.parse($this.attr('data-filter')));
                $(self).trigger('removeplot', JSON.parse($this.attr('data-filter')));
              });
              $td.append($check);
              $tr.append($td);
            }

            if (self.options.row.id) {
              $td = $('<td class="jio tbl value id"></td>');
              $td.text(pointIndex + 1 + '.');
              $tr.append($td);
            }

            index = 0;
            var dataDimensions = [];
            message.dimensions.forEach(function (d) {
              var $td = $('<td class="jio tbl value dimension"></td>');
              $td.text(point[index++]);
              dataDimensions.push([d.key, 'eq', $td.text()]);
              $tr.append($td);
            });

            if ($check) 
              $check.attr('data-filter', JSON.stringify(dataDimensions));
            
            message.metrics.forEach(function (m) {
              var $td = $('<td class="jio tbl value metric"></td>');
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
          var start = 0;
          var end = message.dimensions.length;
          if (self.options.row.checkbox) {
            start++;
            end++;
          }
          for (j = start; j < end; j++) {
            $col = $(cols[j]);
            _key += $col.text();
          }

          if (existingkeys.indexOf(_key) == -1) {
            console.log('remove', _key);
            $tr.remove();
          }
        }
      }

      if (series[0].data.length > 0) {
        self.tablesort.refresh();

        var limit = self.options.limit || 5;
        trs = self.options.$container.find('tbody tr');
        for (var z = 0; z < trs.length; z++) {
          var elem = trs[z];
          var $elem = $(elem);
          if (z + 1 > limit) {
            console.log('remove');
            $elem.remove();
          }
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
        {type: 'table'},
        {uuid: self.uuid},
        {css: self.options.css}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        joola.events.emit('table.init.finish', self);
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
    $.fn.Table = function (options, callback) {
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
        result = new joola.viz.Table(options, function (err, table) {
          if (err)
            throw err;
          table.draw(options, callback);
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

Table.template = function (options) {
  var html = '<div id="example" jio-domain="joola" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    '  <table class="jio table">\n' +
    '    <thead>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</div>';
  return html;
};
