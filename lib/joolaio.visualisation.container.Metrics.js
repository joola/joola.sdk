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


joolaio.provide('joolaio.visualisation.container.metrics');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation');
joolaio.require('joolaio.visualisation.picker.metrics');

joolaio.visualisation.container.Metrics = function (options) {
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
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Metrics', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.container.Metrics.prototype.init = function (sender) {
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
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Metrics', 5, '...init (' + executionTime + 'ms)');
};


joolaio.visualisation.container.Metrics.prototype.baseHTML = function (sender) {
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
            var $metric = $('<div class="pickerwrapper"><div class="joolaio picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
            var $close = $metric.find('.close');
            $close.off('click');
            $close.on('click', function (e) {
                $metric.remove();
                $(_this).trigger('metric-removed', metric.name);
            });

            var v = new joolaio.visualisation.picker.Metrics({container:$($metric.find('.picker')), showgrip:true, selected:metric.name});
            $(v).bind('select', function (event, value) {
                if (value != '') {
                    $close.attr('data-id', value);
                    _this.addMetricBox(_this, '');
                    $(_this).trigger('metric-removed', metric.name);
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
    var $metric = $('<div class="pickerwrapper"><div class="joolaio picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
    var $close = $metric.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $metric.remove();
        $(_this).trigger('metric-removed', $(this).attr('data-id'));
    });

    var v = new joolaio.visualisation.picker.Metrics({container:$($metric.find('.picker')), showgrip:true});
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

joolaio.visualisation.container.Metrics.prototype.addMetricBox = function (sender, selectedMetric) {
    var _this = sender;
    var $container = sender.container.find('.metricscollection');

    var currentboxes = $container.find('.pickerwrapper').length;
    if (currentboxes >= _this.options.limit && _this.options.limit > -1)
        return;

    var customboxcount = $container.find('.joolaio.picker.metrics:not(.on)').length;
    if (customboxcount > 0)
        return;

    //console.log($container);
    var $metric = $('<div class="pickerwrapper"><div class="joolaio picker metrics" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');

    var $close = $metric.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $metric.remove();
        $(_this).trigger('metric-removed', $(this).attr('data-id'));
    });

    //console.log($metric.find('.picker'));
    var v = new joolaio.visualisation.picker.Metrics({container:$metric.find('.picker'), showgrip:true});
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

joolaio.loaded.push('joolaio.visualisation.container.metrics');
joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Metrics', 6, 'JS source loaded');
