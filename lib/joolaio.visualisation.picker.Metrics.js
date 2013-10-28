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

joolaio.provide('joolaio.visualisation.picker.metrics');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation');
joolaio.visualisation.picker.Metrics = function (options) {
  var start = new Date().getMilliseconds();

  var _this = this;
  this.type = 'metricpicker';
  this.selectedMetric = null;
  this._this = this;

  var _options = {
    container: null,
    placeholdertext: 'Choose a metric...',
    type: 'button',
    selected: '',
    showgrip: false,
    allowremove: false,
    metrics: null,
    showlist: true,
    exclude: [],
    disable: []
  };

  if (typeof options == 'undefined')
    throw 'Container not specified';
  else
    _options.container = $(options.container);

  if (typeof options.placeholdertext != 'undefined')
    _options.placeholdertext = options.placeholdertext;
  else if (typeof _options.container.attr('data-placeholdertext') != 'undefined')
    _options.placeholdertext = _options.container.attr('data-placeholdertext');

  if (typeof options.type != 'undefined')
    _options.type = options.type;
  else if (typeof _options.container.attr('data-type') != 'undefined')
    _options.type = _options.container.attr('data-type');

  if (typeof options.selected != 'undefined')
    _options.selected = options.selected;
  else if (typeof _options.container.attr('data-selected') != 'undefined')
    _options.selected = _options.container.attr('data-selected');

  if (typeof options.showgrip != 'undefined')
    _options.showgrip = options.showgrip;
  else if (typeof _options.container.attr('data-showgrip') != 'undefined')
    _options.showgrip = _options.container.attr('data-showgrip');

  if (typeof options.allowremove != 'undefined')
    _options.allowremove = options.allowremove;
  else if (typeof _options.container.attr('data-allowremove') != 'undefined')
    _options.allowremove = _options.container.attr('data-allowremove');

  if (typeof options.showlist != 'undefined')
    _options.showlist = options.showlist;
  else if (typeof _options.container.attr('data-showlist') != 'undefined')
    _options.showlist = _options.container.attr('data-showlist');

  if (typeof options.exclude != 'undefined')
    _options.exclude = options.exclude;
  else if (typeof _options.container.attr('data-exclude') != 'undefined')
    _options.exclude = _options.container.attr('data-exclude');

  if (typeof options.disable != 'undefined')
    _options.disable = options.disable;
  else if (typeof _options.container.attr('data-disable') != 'undefined')
    _options.disable = _options.container.attr('data-disable');

  if (typeof options.metrics != 'undefined')
    _options.metrics = options.metrics;

  _this.container = _options.container;
  _this.options = _options;

  if (!_options.metrics) {
    joolaio.objects.Metrics.List();
    _options.metrics = joolaio.objects.Metrics
  }
  _this.init(_this);

  var executionTime = new Date().getMilliseconds() - start;
  //joolaio.debug.log('INFO', 'joolaio.Visualisation.Picker.Metrics', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.picker.Metrics.prototype.init = function (sender) {
  var _this = sender;
  var start = new Date().getMilliseconds();

  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));

  if (_this.options.selected != '') {
    _this.setSelected(_this, _this.options.selected);
  }


  var executionTime = new Date().getMilliseconds() - start;
  //joolaio.debug.log('INFO', 'joolaio.Visualisation.Picker.Metrics', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.picker.Metrics.prototype.collapseAll = function (sender) {
  var _this = sender;
  if (_this.options.showlist)
    return;

  $(_this.container.find('.node.level_0')).removeClass('on');
  $(_this.container.find('.jcontainer ')).removeClass('on');
};

joolaio.visualisation.picker.Metrics.prototype.expandAll = function (sender) {
  var _this = sender;

  $(_this.container.find('.node.level_0')).addClass('on');
  $(_this.container.find('.jcontainer ')).addClass('on');
};

joolaio.visualisation.picker.Metrics.prototype.getSelected = function (sender) {
  var _this = sender;
  return _this.selectedMetric;
}

joolaio.visualisation.picker.Metrics.prototype.setSelected = function (sender, metricname, multiple) {
  var _this = this;
  this.collapseAll(this);

  if (!multiple)
    $(_this.container.find('li[data-metricname]')).removeClass('on');
  $(_this.container.find('li[data-metricname="' + metricname + '"]')).toggleClass('on');

  _this.ensureVisible(_this, metricname);

  if (metricname != '') {
    $(_this.container.find('.jbtn')[0]).html((metricname.length > 21 ? metricname.substring(0, 21) + '...' : metricname) + '<span class="caret"></span>');
    if (!$(_this.container).hasClass('on')) {
      $(_this.container).addClass('on');
      if (_this.options.allowremove)
        $(_this.container).append('<button class="close">&times;</button>');

      $($(this.container).find('.close')).off('click');
      $($(this.container).find('.close')).on('click', function (e) {
        _this.setSelected(_this, '');
        $(this).remove();
      });
    }
  }
  else {
    $(_this.container).removeClass('on');
    var s = ' + add metric <span class="caret"></span>';
    if (_this.options.type == 'button')
      s = _this.options.placeholdertext + '<span class="caret"></span>';

    $(_this.container.find('.jbtn')[0]).html(s);
    $($(this.container).find('.close')).off('click');
    $($(this.container).find('.close')).remove();
  }

  //to set the correct id for the container, used by report editor
  $(this.container).closest('.pickerwrapper').attr('data-id', metricname);

  var $container = $(_this.container.find('.metricscontainer'));
  if ($container.hasClass('on')) {
    $container.hide();
    $container.removeClass('on');
    $(_this.container.find('.jbtn')[0]).removeClass('active');
  }

  _this.options.selected = metricname;

  if (sender.type == _this.type)
  {
    $(_this).trigger('select', metricname)
  }
  var metrics = joolaio.objects.Metrics;
  $(metrics).each(function (i, m) {
    if (m.name == metricname) {
      _this.selectedMetric = m;
    }
  });
  //$('.metricswrapper')
};

joolaio.visualisation.picker.Metrics.prototype.disableMetric = function (sender, metricname, bind) { 
  bind = typeof bind !== 'undefined' ? bind : true;
  var classname = 'disabled';
  if (joolaio.options.picker.metrics.hideDisabledMetrics)
    classname += ' hidden';
  
  //var container = $('.joolaio.picker.metrics');
  var container = sender.container[0];
  
  if (bind) {    
    $(container).find('.key').each(function (i, m) {
      if ($(m).closest('.node .hidden') || $(m).closest('.node .disabled')) {
        if (sender.options.disable.indexOf($(m).text()) == -1) {
          $(m).closest('.node').off('click');
          $(m).closest('.node').on('click', function (e) {
            //e.stopPropagation();
            sender.setSelected(sender, $(m).text());
          }); 
        }
      }


      $(m).closest('.node').removeClass('hidden');
      $(m).closest('.node').removeClass('disabled');

    });
  }
  if (metricname && metricname.name != '') {  
    $(container).find('.key').each(function (i, m) {
      if ($(m).text() == metricname.name) {
        //$(m).closest('.node')
        //$(m).closest('.node').bind('click', function (e) {
          //e.stopPropagation();
       // });
        var nodeParent = $(m).closest('.node');
        nodeParent.unbind('click'); 
        $(nodeParent).addClass(classname);
        
      }
    });
  }
}


joolaio.visualisation.picker.Metrics.prototype.ensureVisible = function (sender, metricname) {
  if (metricname != '') {
  }
  else {
    if (sender.options.selected != null) {
      metricname = sender.options.selected;
    }
  }

  var _this = sender;
  $(_this.container.find('li[data-metricname="' + metricname + '"]').each(function (index, item) {
    var $li = $(item);
    if (!$li.parent().hasClass('on'))
      $li.parent().addClass('on');
    $li.closest('.node.level_0').addClass('on');
  }));
};


joolaio.visualisation.picker.Metrics.prototype.baseHTML = function (sender) {
  var _this = sender;
  var $html = $('<div class="metricswrapper"></div>');

  if (_this.options.type == 'button') {
    $html.append('<a class="btn jbtn">' + _this.options.placeholdertext + '<span class="caret"></span></a>');
  }
  else {
    if (_this.options.showgrip)
      $html.append('<div class="grip"></div>');
    $html.append('<div class="customadd metric jbtn"> + add metric <span class="caret"></span></div>');
  }
  $html.append('<div class="metricscontainer"><div>');

  var $container = $($html.find('.metricscontainer'));

  var search = function (e, term) {
    if ((term == '' || term.length < 2 ) && e.which != 13) {
      if (_this.options.showlist) {
        _this.expandAll(_this);
        $container.find('.category').hide();
        $container.find('.node.level_0').css({'background-image': 'none', 'padding-left': 0});
      }
      else {
        _this.collapseAll(_this);

        $container.find('.category').show();
        $container.find('.node.level_0').removeClass('on');
        $container.find('.node.level_0').css('background-image', 'url(\'' + joolaio.hostname + '/assets/img/collapse.png\') no-repeat 0px 8px;');
        $container.find('.node.level_0').css('padding-left', '10px');

        $container.find('.node.level_0').removeCss('background');
        $container.find('.node.level_0').removeCss('background-image');

      }

      _this.ensureVisible(_this, _this.options.selected);

      $container.find('.node.leaf.level_1').find('.key').each(function (index, item) {
        var $this = $(this);

        $this.closest('.level_1').show();
      });
    }
    else {
      _this.expandAll(_this);
      $container.find('.category').hide();
      //$container.find('.node.level_0').addClass('on');

      $container.find('.node.level_0').css({'background-image': 'none', 'padding-left': 0});

      $container.find('.node.leaf.level_1').hide();
      $container.find('.node.leaf.level_1').find('.key').each(function (index, item) {

        var $this = $(this);
        if ($this.text().toLowerCase().indexOf(term.toLowerCase()) > -1) {
          var shown = false;
          $container.find('.node.leaf.level_1').find('.key').each(function (index, node) {
            var $node = $(node);
            if ($node != $this)
              if ($node.text() == $this.text() && $node.is(':visible'))
                shown = true;
          });

          if (shown) {
            $this.closest('.level_1').hide();
          }
          else
            $this.closest('.level_1').show();
        }
        else
          $this.closest('.level_1').hide();
      })
    }
  };

  var $search = $('<div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div>');
  $search.keyup(function (e) {
    var term = $search.find('.quicksearch').val();
    search(e, term);
  });

  $search.find('.icon-search').off('click');
  $search.find('.icon-search').on('click', function (e) {
    var term = $search.find('.quicksearch').val();
    search(e, term);
  });

  $container.append($search);
  //we first need to group the metrics together
  var _metrics = _.groupBy(_this.options.metrics, function (obj) {
    return obj.Category;
  });

  //let's iterate the metrics and add them to the drop down

  $container.append('<ul class="categorylist"></ul>');
  var $categorylist = $($container.find('.categorylist'));
  _.each(_metrics, function (item, index) {
    var $list = $('<li class="node  ' + 'level_' + '0' + '"></li>');
    $list.append('<div class="category">' + item[0].Category + '</div>');
    $list.append('<ul class="jcontainer"></ul>');
    $.each(item, function (index, metric) {
      if (_this.options.exclude.indexOf(metric.name) == -1 && _this.options.disable.indexOf(metric.name) == -1) {
        var list = '<li class="node leaf ' + 'level_' + '1' + '" data-metricname="' + metric.name + '" data-metricid="' + metric.id + '">';

        list += '<div class="box">';
        list += '<div class="keyvaluepair">';

        list += '<div class="key">' + metric.name + '</div>';
        list += '<div class="help"> <i class="tipsy icon-question-sign icon-white" data-caption="' + metric.name + '" data-text="' + metric.description + '" data-title="' + (metric.description == null ? 'Information not available.' : metric.description) + '"></i> </div>';

        list += '</div>';
        list += '</div>';

        list += '</li>';

        var $li = $(list);
        $($list.find('.jcontainer:last-of-type')).append($li);
        $li.on('click', function (e) {
          $('.metricscontainer').hide();
          $('.jbtn').removeClass('active');

          _this.setSelected(_this, $(this).attr('data-metricname'));
        });
      }

      else if (_this.options.exclude.indexOf(metric.name) == -1 && _this.options.disable.indexOf(metric.name) > -1) {

        var list = '<li class="disabled keepDisabled node leaf ' + 'level_' + '1' + '" data-metricname="' + metric.name + '" data-metricid="' + metric.id + '">';

        list += '<div class="box">';
        list += '<div class="keyvaluepair">';

        list += '<div class="key">' + metric.name + '</div>';
        list += '<div class="help"> <i class="tipsy icon-question-sign icon-white" data-caption="' + metric.name + '" data-text="' + metric.description + '" data-title="' + (metric.description == null ? 'Information not available.' : metric.description) + '"></i> </div>';

        list += '</div>';
        list += '</div>';

        list += '</li>';

        var $li = $(list);
        $($list.find('.jcontainer:last-of-type')).append($li);


        $(joolaio).bind('joolaio-report-filter-applied', function() {
          if (joolaio.options.timeline.plotDisabledWhenFiltered && joolaio.visualisation.report.timeline.disableMetrics.length > 0) {
            $li.on('click', function (e) {
              $('.metricscontainer').hide();
              $('.jbtn').removeClass('active');

              _this.setSelected(_this, $(this).attr('data-metricname'));
            });
          }
        });

        $(joolaio).bind('joolaio-report-filter-removed', function() {
          if (joolaio.options.timeline.plotDisabledWhenFiltered && joolaio.visualisation.report.timeline.disableMetrics.length > 0) {
            _this.disableMetric(_this, metric, false);
            $($li).removeClass('hidden');
          }
        });
      }

    });
    $.each(item, function (index, metric) {
      if (_this.options.exclude.indexOf(metric.name) == -1 && _this.options.disable.indexOf(metric.name) > -1) {
        _this.disableMetric(_this, metric, false);
      }
    });
    $categorylist.append($list);
  });

  $($container).find('.icon-question-sign').each(function (index, item) {
    try {
      $(item).popover({placement: 'right', trigger: 'hover', delay: 0, title: '<strong>' + $(item).attr('data-caption') + '</strong>', content: $(item).attr('data-text')});
    }
    catch (e) {

    }
  });

  $($html.find('.jbtn')[0]).off('click');
  $($html.find('.jbtn')[0]).on('click', function (e) {
    if ($($container).is(':visible')) {
      $($container).hide();
    }
    else {
      $(joolaio).trigger('joolaio-picker-metrics-popup', [_this]);
      $($container).show();
    }
    //$container.toggle();
    //$container.toggleClass('on');
    if (_this.options.showlist) {
      _this.expandAll(_this);

      $container.find('.category').hide();
      $container.find('.node.level_0').css({'background-image': 'none', 'padding-left': 0});
    }
    $search.find('.quicksearch').val('');
    $search.keyup();

    $search.find('.quicksearch').focus();

    _this.ensureVisible(_this, _this.options.selected);
    $(this).toggleClass('active');
  });

  $('body').click(function () {
    if ($($container).is(':visible')) {
      $container.hide();
      $($html.find('.jbtn')[0]).removeClass('active');
    }
  });

  $html.click(function (e) {
    e.stopPropagation();
  });
  
  $($container).find('.node.level_0').each(function (index, item) {
    var $li = $(this);
    $li.off('click');
    $li.on('click', function (e) {
      $('.metricscontainer').hide();
      $('.jbtn').removeClass('active');
    });
  });
  /*
  $($container).find('.node.level_1').each(function (index, item) {
    var $li = $(this);
    console.log('binding all nodes');
    $li.off('click');
    $li.on('click', function (e) {
      $('.metricscontainer').hide();
      $('.jbtn').removeClass('active');
      
      _this.setSelected(_this, $(this).attr('data-metricname'));
    });
  });
  */
  $container.bind('mousewheel', function (e, d) {
    if (d > 0 && $(this).scrollTop() == 0)
      e.preventDefault();
    else if (d < 0 && $(this).scrollTop() == $(this).get(0).scrollHeight - $(this).innerHeight())
      e.preventDefault();
  });
  return $html;
};


$(joolaio).bind('joolaio-picker-metrics-popup', function (e, sender) {
  $('.metricscontainer').hide();
  $('.metricscontainer').removeClass('on');
  $('.dimensionscontainer').hide();
  $('.dimensionscontainer').removeClass('on');
  $('.dimensionswrapper .jbtn').removeClass('active');
  $('.metricswrapper .jbtn').removeClass('active');
  $('.joolaio.picker.datebox .picker').hide();
  $('.joolaio.picker.datebox .container').removeClass('expanded')
  $('.resolutionpicker-wrapper').hide();
  $('.resolutionwrapper .jbtn').removeClass('active');
});

joolaio.loaded.push('joolaio.visualisation.picker.metrics');
joolaio.debug.log('INFO', 'joolaio.Visualisation.Picker.Metrics', 6, 'JS source loaded');
