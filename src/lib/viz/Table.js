/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var _ = require('underscore');


var Table = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('table.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  var self = this;

  this._id = '_table';
  this.uuid = joolaio.common.uuid();
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
    var $caption = $('<div class="jio-table-caption"></div>');
    var $table = $('<table class="jio table">' +
      '<thead></thead>' +
      '<tbody></tbody>' +
      '</table>');
    var $html = $('<div></div>');
    $html.append($caption);
    $html.append($table);
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
    return this._super.fetch(this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);
        else
          throw err;
        return;
      }

      message = message[0];
      var $col, $tr, trs;

      var series = self._super.makeTableChartSeries(message.dimensions, message.metrics, message.documents);
      if (!self.drawn) {
        self.drawn = true;

        var $html = self.template();

        var $caption = $html.find('.jio-table-caption');
        var $table = $html.find('.table');
        if ($caption)
          $caption.html(self.options.caption);

        var $thead = $html.find('thead');
        var $tbody = $table.find('tbody');

        $thead.empty();
        $tbody.empty();

        var $head_tr = $('<tr class="jio tbl captions"></tr>');
        if (true) {
          var $th = $('<th class="jio tbl caption checkbox"></th>');

          $head_tr.append($th);
        }
        message.dimensions.forEach(function (d) {
          var $th = $('<th class="jio tbl caption dimension"></th>');
          $th.text(d.name);
          $head_tr.append($th);
        });
        message.metrics.forEach(function (m) {
          var $th = $('<th class="jio tbl caption metric"></th>');
          $th.text(m.name);
          $head_tr.append($th);
        });
        $thead.append($head_tr);

        series.forEach(function (ser, serIndex) {
          ser.data.forEach(function (point) {
            var $tr = $('<tr></tr>');
            var index = 0;
            var $chk;
            if (true) {
              var $td = $('<td class="jio tbl value checkbox"><input type="checkbox"></td>');
              $chk = $td.find('input')
              $tr.append($td);
            }
            message.dimensions.forEach(function (d) {
              var $td = $('<td class="jio tbl value dimension"></td>');
              var value = point[index++];
              $td.text(value);
              if ($chk.length > 0) {
                $chk.on('click', function (e) {
                  if (self.options.canvas) {
                    if (this.checked)
                      self.options.canvas.emit('table:checked', self, self.options.$container, d, value);
                    else
                      self.options.canvas.emit('table:unchecked', self, self.options.$container, d, value);
                  }
                });
              }
              $tr.append($td);
            });
            message.metrics.forEach(function (m) {
              var $td = $('<td class="jio tbl value metric"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });
            $tbody.append($tr);
          });
        });

        self.options.$container.append($html);
        if ($table.length > 0) {
          self.tablesort = new Tablesort($table.get(0), {
            descending: true,
            current: $table.find('th')[1]
          });
        }
        if (self.options.onDraw) {
          joola.logger.debug('Calling user-defined onDraw [' + self.options.onDraw + ']');
          window[self.options.onDraw](self.options.$container, self);
        }

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
              var $td = $('<td class="jio tbl value dimension"></td>');
              $td.text(point[index++]);
              $tr.append($td);
            });
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
          for (j = 0; j < message.dimensions.length; j++) {
            $col = $(cols[j]);
            _key += $col.text();
          }

          if (existingkeys.indexOf(_key) == -1)
            $tr.remove();
        }

        if (self.options.onUpdate) {
          joola.logger.debug('Calling user-defined onUpdate [' + self.options.onUpdate + ']');
          window[self.options.onUpdate](self.options.$container, self);
        }
      }

      if (series[0].data.length > 0) {
        //if ($table.length)
        //self.tablesort.refresh();

        var limit = self.options.limit || 10;
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
    joolaio.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, {
        attr: [
          {'type': 'table'},
          {'uuid': self.uuid}
        ],
        css: self.options.css}, function (err) {
        if (err)
          return callback(err);

        joolaio.viz.onscreen.push(self);

        joolaio.events.emit('table.init.finish', self);
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

joolaio.events.on('core.init.finish', function () {
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
          joolaio.viz.onscreen.forEach(function (viz) {
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
        result = new joolaio.viz.Table(options, function (err, table) {
          if (err)
            throw err;
          table.draw(options, callback);
        }).options.$container;
      }
      else {
        //return existing
        found = false;
        joolaio.viz.onscreen.forEach(function (viz) {
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
  var html = '<div id="example" jio-domain="joolaio" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    '  <table class="jio table">\n' +
    '    <thead>\n' +
    '    </thead>\n' +
    '    <tbody>\n' +
    '    </tbody>\n' +
    '  </table>\n' +
    '</div>';
  return html;
};

Table.meta = {
  key: 'table',
  jQueryTag: 'Table',
  title: 'Table',
  tagline: '',
  description: '' +
    'Plot powerful and customizable data tables.',
  longDescription: '',
  example: {
    //css: 'height:250px;width:100%',
    options: {
      limit: 5,
      query: {
        timeframe: 'last_month',
        interval: 'day',
        dimensions: ['browser'],
        metrics: [
          {key: 'mousemoves', name: "Mouse Moves", collection: 'demo-mousemoves'},
          {key: 'clicks', suffix: " clk.", collection: 'demo-clicks'},
          {key: 'visits', collection: 'demo-visits'}
        ],
        collection: 'demo-mousemoves',
        "realtime": true
      }
    },
    draw: '$("#example").Table(options);'/*,
     external: [
     {
     title: 'Change Pie Limits',
     src: 'http://jsfiddle.com'
     },
     {
     title: 'Another example',
     src: 'http://jsfiddle.com'
     },
     {
     title: 'And yet another',
     src: 'http://jsfiddle.com'
     }
     ]*/
  },
  template: Table.template(),
  metaOptions: {
    container: {
      datatype: 'string',
      defaultValue: null,
      description: '`optional` if using jQuery plugin. contains the Id of the HTML container.'
    },
    template: {
      datatype: 'string',
      defaultValue: null,
      description: '`optional` Specify the HTML template to use instead of the default one.'
    },
    query: {
      datatype: 'object',
      defaultValue: null,
      description: '`required` contains the <a href="/data/query">query</a> object.'
    },
    limit: {
      datatype: 'number',
      defaultValue: '5',
      description: 'The number of items to show.'
    }
  },
  metaMethods: {
    init: {
      signature: '.init(options)',
      description: 'Initialize the visualization with a set of `options`.',
      example: '$(\'#visualization\').init(options);'
    },
    update: {
      signature: '.update(options)',
      description: 'Update an existing visualization with a set of `options`.',
      example: '$(\'#visualization\').update(options);'
    },
    destroy: {
      signature: '.destroy()',
      description: 'Destroy the visualization.',
      example: '$(\'#visualization\').destroy();'
    }
  },
  metaEvents: {
    load: {
      description: 'Visualization loaded.'
    },
    draw: {
      description: 'The visualization HTML frame has been drawn on screen.'
    },
    destroy: {
      description: 'Visualization destroyed.'
    },
    update: {
      description: 'The underlying data has changed.'
    },
    select: {
      description: 'Selection changed, table row clicked.'
    }
  }
};