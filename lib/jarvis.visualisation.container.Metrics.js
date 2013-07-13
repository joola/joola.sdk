// Copyright 2012 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/client/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Provides a report visualisation to display current server date and time.
 *
 */

jarvis.provide('jarvis.visualisation.container.metrics');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation');
jarvis.require('jarvis.visualisation.picker.metrics');

jarvis.visualisation.container.Metrics = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;
    _this.id = -1;

    var _options = {
        container:null,
        title:'New metric group',
        metrics:[],
        limit:-1
    };

    if (typeof options == 'undefined')
        throw 'Container not specified';
    else {
        _options.container = $(options.container);
        _options.title = options.title;

        if (options.metrics)
            _options.metrics = options.metrics;
        if (options.id)
            _this.id = options.id;
        if (options.limit)
            _options.limit = options.limit;
        if (options.hidetitle)
            _options.hidetitle = options.hidetitle;
    }

    //console.log($(options.container).css('display'));

    _this.container = _options.container;
    _this.options = _options;
    _this.init(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Metrics', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.container.Metrics.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    $container.empty();
    $container.html(_this.baseHTML(_this));


    if (_this.options.metrics.length > 0) {
        $(this.options.metrics).each(function (index, metric) {
            //_this.createMetricBox(_this, metric.Name);
        })
    }

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Metrics', 5, '...init (' + executionTime + 'ms)');
};


jarvis.visualisation.container.Metrics.prototype.baseHTML = function (sender) {
    var _this = sender;
    var $html = $('');

    var $wrapper = $('<div class="metricscontainer"></div>');
    var $container = $('<div class="well "></div>');

    $container.append('<button type="button" class="close">&times;</button>');
    $container.find('.close').off('click');
    $container.find('.close').on('click', function (e) {
        $wrapper.remove();
        $(_this).trigger('group-removed', _this.id);
    });
    $wrapper.append($container);

    // $container.append('<button class="close">&times;</button>');
    if (!_this.options.hidetitle) {
        $container.append('<input class="input_mgroup_title" type="text" placeholder="New metric group" value="' + _this.options.title + '">');
        var $input_title = $($container.find('.input_mgroup_title'));
        $input_title.off('keyup');
        $input_title.on('keyup', function (e) {
            $(_this).trigger('rename', $(this).val());
        });
    }

    var $metrics = $('<div class="metricscollection"></div>');
    $container.append($metrics);

    $(_this.options.metrics).each(function (index, metric) {
        if (!metric.deleted) {
            var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
            var $close = $metric.find('.close');
            $close.off('click');
            $close.on('click', function (e) {
                $metric.remove();
                $(_this).trigger('metric-removed', metric.Name);
            });

            var v = new jarvis.visualisation.picker.Metrics({container:$($metric.find('.picker')), showgrip:true, selected:metric.Name});
            $(v).bind('select', function (event, value) {
                if (value != '') {
                    $close.attr('data-id', value);
                    _this.addMetricBox(_this, '');
                    $(_this).trigger('metric-removed', metric.Name);
                    $(_this).trigger('metric-added', value);
                }
                else {
                    v.options.container.remove();
                    v = null;
                }
            });
            $metrics.append($metric);
        }
    })
    var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
    var $close = $metric.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $metric.remove();
        $(_this).trigger('metric-removed', $(this).attr('data-id'));
    });

    var v = new jarvis.visualisation.picker.Metrics({container:$($metric.find('.picker')), showgrip:true});
    $(v).bind('select', function (event, value) {
        if (value != '') {
            $close.attr('data-id', value);
            _this.addMetricBox(_this, '');
            $(_this).trigger('metric-added', value);
        }
        else {
            v.options.container.remove();
            v = null;
        }
    });

    //  $metric.append('<button class="close" style="margin-top:7px;margin-left:-7px;margin-right: 10px;">&times;</button>');
    $metrics.append($metric);

    $html = $wrapper;

    $html.find('.metricscollection').sortable({
        connectWith:".pickerwrapper",
        handle:'.grip',
        distance:-250,

        update:function (e, p) {
            $(_this).trigger('metric-reorder');
        },
        stop:function (event, ui) {

        }
    }).disableSelection();

    return $html;
};

jarvis.visualisation.container.Metrics.prototype.addMetricBox = function (sender, selectedMetric) {
    var _this = sender;
    var $container = sender.container.find('.metricscollection');

    var currentboxes = $container.find('.pickerwrapper').length;
    if (currentboxes >= _this.options.limit && _this.options.limit > -1)
        return;

    var customboxcount = $container.find('.jarvis.picker.metrics:not(.on)').length;
    if (customboxcount > 0)
        return;

    //console.log($container);
    var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');

    var $close = $metric.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $metric.remove();
        $(_this).trigger('metric-removed', $(this).attr('data-id'));
    });

    //console.log($metric.find('.picker'));
    var v = new jarvis.visualisation.picker.Metrics({container:$metric.find('.picker'), showgrip:true});
    $(v).bind('select', function (event, value) {
        if (value != '') {
            $close.attr('data-id', value);
            _this.addMetricBox(_this, '');
            $(_this).trigger('metric-added', value);
        }
        else {
            v.options.container.remove();
            v = null;
        }
    });
    $container.append($metric);
}

jarvis.loaded.push('jarvis.visualisation.container.metrics');
jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Metrics', 6, 'JS source loaded');
