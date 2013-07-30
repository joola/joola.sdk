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
 * @fileoverview Utilities for manipulating arrays.
 *
 */


jarvis.provide('jarvis.visualisation.report.panel');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.report');
jarvis.require('jarvis.visualisation.report');


jarvis.visualisation.report.Panel = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    //this._this = this;

    this.options = $.extend({
        widgets: {
            timeline: {
                height: 235,
                excludeMetrics: [],
                showPrimary: true
            },
            table: {
                pageSize: 50,
                minSelected: 0,
                maxSelected: 3,
                excludeDimensions: [],
                defaultSelected: 0
            }
        }
    }, options);
    jarvis.objects.Reports.List();

    try {
        this.reportID = options.reportID;
    }
    catch (e) {
        this.reportID = jarvis.objects.Reports[0].id; //this.getDefaultPanel();
    }

    this.containers = [];

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    matchedContainers = $('.jarvis.report.panel');
    if (matchedContainers.length > 0) {
        jarvis.debug.log('INFO', 'Jarvis.Visualisation.Report.Panel', 6, 'Building Initial Panel (\'' + this.id + '\')');

        var $editbutton = $('.jarvis.container').find('.panel-edit');
        $editbutton.off('click');
        $editbutton.on('click', function (e) {
            var o = new jarvis.visualisation.report.Editor();
            o.init(o, {container: matchedContainers, reportID: _this.reportID});
        });
    }

    this.container = matchedContainers;
    jarvis.visualisation.report.panel = this;

    jarvis.objects.Reports.List();
    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    if (jarvis.state != null) {
        _this.reportID = jarvis.state.reportID;
        _this.tabID = jarvis.state.tabID;
        _this.metricgroupID = jarvis.state.metricgroupID;

        _this.tabType = jarvis.state.tabType;
    }
    else {
        this.reportID = -1;
        this.tabID = 0;
        this.tabType = 'explorer';
        this.metricgroupID = 0;
    }

    if (_this.reportID == null || _this.reportID == 'undefined')
        _this.reportID = -1;
    if (_this.tabID == null || _this.tabID == 'undefined')
        _this.tabID = 0;
    if (_this.tabType == null || _this.tabType == 'undefined')
        _this.tabType = 'explorer';
    if (_this.metricgroupID == null || _this.metricgroupID == 'undefined')
        _this.metricgroupID = 0;


    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Report.Panel', 5, '...Constructor (' + executionTime + 'ms)');


    if (!jarvis.visualisation.reportWrapper)
        jarvis.visualisation.reportWrapper = _this;
    return _this;
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.report.Panel.prototype.init = function (options, container, drawWidgets, breakBindLoop, saveState) {
    var _this = this;
    jarvis.debug.log('INFO', 'Jarvis.Visualisation.Report.Panel', 6, 'Building Panel for ID (\'' + _this.reportID + '\')');

        /*
     this.reportID = null;
     this.tabID = 0;
     this.tabType = 'explorer';
     this.metricgroupID = 0;
     */
    if (options && options.showPrimary != null)
        _this.options.widgets.timeline.showPrimary = options.showPrimary;
    if (options && options.minSelected != null)
        _this.options.widgets.table.minSelected = options.minSelected;
    if (options && options.maxSelected != null)
        _this.options.widgets.table.maxSelected = options.maxSelected;
    if (options && options.defaultSelected != null)
        _this.options.widgets.table.defaultSelected = options.defaultSelected;

    if (options && options.excludeMetrics != null)
        _this.options.widgets.timeline.excludeMetrics = options.excludeMetrics;

    if (options && options.excludeDimensions != null)
        _this.options.widgets.table.excludeDimensions = options.excludeDimensions;

    jarvis.visualisation.report.globalfilter = '';

        try {
        if ($('.jarvis.report.panel').attr('data-id') != null)
            _this.reportID = $('.jarvis.report.panel').attr('data-id');
        if (options.reportID != null && options.reportID != 'undefined')
            _this.reportID = options.reportID;
        if (options.tabID != null && options.tabID != 'undefined')
            _this.tabID = options.tabID;
        if (options.tabType != null && options.tabType != 'undefined')
            _this.tabType = options.tabType;
        if (options.metricgroupID != null && options.metricgroupID != 'undefined')
            _this.metricgroupID = options.metricgroupID;
    }
    catch (e) {
        if (this.reportID == -1)
            _this.reportID = jarvis.objects.Reports[0].id; //this.getDefaultPanel();
    }

        if (_this.reportID == null || _this.reportID == 'undefined')
        _this.reportID = jarvis.objects.Reports[0].id//-1;
    if (_this.tabID == null || _this.tabID == 'undefined')
        _this.tabID = 0;
    if (_this.tabType == null || _this.tabType == 'undefined')
        _this.tabType = 'explorer';
    if (_this.metricgroupID == null || _this.metricgroupID == 'undefined')
        _this.metricgroupID = 0;
    if (_this.reportID == -1)
        _this.reportID = jarvis.objects.Reports[0].id//-1;

        _this.panel = _this.get(_this, _this.reportID);
    if (!this.panel) {
        return;
    }

    _this.tabType = _this.panel.tabs[_this.tabID].type;

    _this.setDisplay();


    if (typeof saveState == 'undefined' || saveState == true) {
        jarvis.state.view = 'report';
        jarvis.state.dashboardID = _this.panelID;
        jarvis.state.reportID = _this.reportID;
        jarvis.state.tabID = _this.tabID;
        jarvis.state.metricgroupID = _this.metricgroupID;
        jarvis.state.tabType = _this.tabType;
        //jarvis.saveState('Report Panel Init');
    }


    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.report.panel');
    if (matchedContainers.length == 0)
        return;

    var $addwidgetbutton = $('body').find('.widget-add');

    $addwidgetbutton.hide();

    $(matchedContainers).each(function (index, item) {
        if (options == null)
            options = new Object();

        options.reportID = _this.reportID;
        options.container = item;
        options._this = _this;
        _this.updateDisplay(options);

        _this.baseHTML(_this, item);
        _this.drawWidgets(_this, item, drawWidgets);

        $(jarvis).unbind('tabchange');
        $(jarvis).bind('tabchange', function (e, tabID) {

            //_this.reportID = reportID;
            _this.tabID = tabID;
            _this.metricgroupID = 0;

            jarvis.visualisation.report.globalfilter = '';

            //jarvis.visualisation.report.setFilter('');
            _this.init(_this, item, true, true);

            //jarvis.saveState("Tab change");
            // _this.drawWidgets(_this, $('.jarvis.container.report'), true, true);
        });

        $(jarvis).unbind('metricgroupchange');
        $(jarvis).bind('metricgroupchange', function (e, metricgroupID) {

            //_this.reportID = reportID;
            _this.metricgroupID = metricgroupID;
            try {
                jarvis.state['timeline-1234'].primaryMetric = null;
            }
            catch (ex) {
                //ignore
            }
            //jarvis.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
            jarvis.state.metricgroupID = _this.metricgroupID;
            _this.init(_this, item, true, true);
            //jarvis.saveState("Metric Group change");
            //  _this.drawWidgets(_this, $('.jarvis.container.report'), true, true);
        });

        jarvis.debug.log('INFO', 'Jarvis.Visualisation.Report.Panel', 6, 'Applying to container (\'' + this.id + '\')');
    });

    var $editbutton = $('.jarvis.container').find('.panel-edit');
    $editbutton.off('click');
    $editbutton.on('click', function (e) {
        var o = new jarvis.visualisation.report.Editor();
        o.init(o, {container: matchedContainers, reportID: _this.reportID});
    });

    return _this;
};

jarvis.visualisation.report.Panel.prototype.setDisplay = function () {

}

jarvis.visualisation.report.Panel.prototype.show = function () {
    $('.jarvis.report.panel').show();
}

jarvis.visualisation.report.Panel.prototype.hide = function () {
    $('.jarvis.dashboard.panel').hide();
}

jarvis.visualisation.report.Panel.prototype.dispose = function () {

    var container = $('.jarvis.report.panel');
    var $tabs = $(container).find('.tabs');
    var $mgs = $(container).find('.metricgroups');
    var $timeline = $(container).find('.timeline');
    var $metricbox = $(container).find('.metricbox');
    var $table = $(container).find('.jtable');

    $tabs.empty();
    $mgs.empty();
    $timeline.empty();
    $metricbox.empty();
    $table.empty();

    jarvis.visualisation.report.tabs = null;
    jarvis.visualisation.report.metricgroup = null;
    jarvis.visualisation.report.timeline = null;
    jarvis.visualisation.report.metricbox = null;
    if (jarvis.visualisation.report.table)
        jarvis.visualisation.report.table.destroy();
    jarvis.visualisation.report.table = null;
    if (jarvis.visualisation.report.tableex)
        jarvis.visualisation.report.tableex.destroy();
    jarvis.visualisation.report.tableex = null;
    if (jarvis.visualisation.report.histogram)
        jarvis.visualisation.report.histogram.destroy();
    jarvis.visualisation.report.histogram = null;
}


jarvis.visualisation.report.Panel.prototype.baseHTML = function (sender, container) {
    var $container = $(container);
    //$container.empty();
}

jarvis.visualisation.report.Panel.prototype.drawWidgets = function (sender, container, redraw) {


    var _this = sender;
    var panel = _this.panel;
    var widgets = panel.Widgets;

    var _html = '';

    _this.dispose();

    var dimensions = cloneextend(sender.panel.tabs[_this.tabID].dimensions);
    var drilldowns = cloneextend(sender.panel.tabs[_this.tabID].drilldowns);
    var metrics = sender.panel.tabs[_this.tabID].metricgroups[_this.metricgroupID].metrics.slice(0);

    if (typeof(metrics[0] != 'object')) {
        _.each(metrics, function (m, i) {
            metrics[i] = jarvis.objects.Metrics.Get(null, {id: m});
        });
    }
    if (typeof(dimensions[0] != 'object')) {
        _.each(dimensions, function (d, i) {
            dimensions[i] = jarvis.objects.Dimensions.Get(null, {id: d});
        });
    }

    if (typeof(drilldowns[0] != 'object')) {
        _.each(drilldowns, function (d, i) {
            drilldowns[i] = jarvis.objects.Dimensions.Get(null, {id: d.dimensions[0].id});
        });
    }

    var dimensionslist = '';
    var metricslist = '';

    $(dimensions).each(function (i, o) {
        dimensionslist += o.id + ', ';
    });
    dimensionslist = dimensionslist.substring(0, dimensionslist.length - 2);

    $(metrics).each(function (i, o) {
        metricslist += o.id + ', ';
    });
    metricslist = metricslist.substring(0, metricslist.length - 2);

    var levels = [];
    $(drilldowns).each(function (i, l) {
        var dimensions = [];
        $(l).each(function (i2, d) {
            $(d.dimensions).each(function (i3, dimension) {
                dimensions.push(dimension.id);
            })
        });
        levels.push(dimensions);
    });


    var $tabs = $(container).find('.tabs');
    var $mgs = $(container).find('.metricgroups');
    var $timeline = $(container).find('.timeline');
    var $metricbox = $(container).find('.metricbox');
    var $table = $(container).find('.jtable');

    $tabs.empty();
    $mgs.empty();
    $timeline.empty();
    $metricbox.empty();
    $table.empty();
    $table.removeClass('histogram');

    $tabs.attr('data-reportid', _this.panel.id);
    /*
     jarvis.visualisation.report.tabs = null;
     jarvis.visualisation.report.metricgroup = null;
     jarvis.visualisation.report.timeline = null;
     jarvis.visualisation.report.metricbox = null;
     jarvis.visualisation.report.table = null;
     jarvis.visualisation.report.tableex = null;
     jarvis.visualisation.report.histogram = null;*/
    jarvis.visualisation.report.tabs = new jarvis.visualisation.report.Tabs().init({selected: this.tabID});

    $mgs.attr('data-reportid', _this.panel.id);
    $mgs.attr('data-tabid', _this.tabID);
    $mgs.attr('data-mgid', _this.metricgroupID);
    $timeline.attr('data-metrics', metrics[0].id);
    $metricbox.attr('data-metrics', metricslist);
    //$table.attr('data-dimensions', JSON.stringify(levels));
    $table.attr('data-dimensions', dimensions[0].id);
    $table.attr('data-metrics', metricslist);

    if (this.tabType == 'explorer') {
        $('.jarvis.report.metricgroups').show();
        $('.jarvis.report.row-top').show();
        $('.jarvis.report.row-middle').show();

        jarvis.visualisation.report.metricgroup = new jarvis.visualisation.report.MetricGroup().init();

        jarvis.visualisation.report.timeline = new jarvis.visualisation.report.Timeline().init({primaryMetric: metrics[0].id, height: _this.options.widgets.timeline.height, excludeMetrics: _this.options.widgets.timeline.excludeMetrics, showPrimary: _this.options.widgets.timeline.showPrimary});
        jarvis.visualisation.report.metricbox = new jarvis.visualisation.report.MetricBox().init();


        if (!_this.options.widgets.table)
            _this.options.widgets.table = {pageSize: 10};
        jarvis.visualisation.report.table = new jarvis.visualisation.report.Table().init({pageSize: _this.options.widgets.table.pageSize,
            defaultSelected: _this.options.widgets.table.defaultSelected,
            minSelected: _this.options.widgets.table.minSelected,
            excludeDimensions: this.options.widgets.table.excludeDimensions,
            maxSelected: _this.options.widgets.table.maxSelected});
    }
    else if (this.tabType == 'table') {
        //$tabs.empty();
        $mgs.empty();
        $timeline.empty();
        $metricbox.empty();
        $table.empty();

        $('.jarvis.report.metricgroups').hide();
        $('.jarvis.report.row-top').hide();
        $('.jarvis.report.row-middle').hide();

        jarvis.visualisation.report.tableex = new jarvis.visualisation.report.TableEx().init();
    }
    else if (this.tabType == 'overview') {
        $('.jarvis.report.metricgroups').show();
        $('.jarvis.report.row-top').show();
        $('.jarvis.report.row-middle').show();

        jarvis.visualisation.report.timeline = new jarvis.visualisation.report.Timeline().init({primaryMetric: metrics[0].name, height: 180});

        var metrics = _this.panel.tabs[0].metricgroups[0].metrics;
        var dimensions = _this.panel.tabs[0].dimensions;


        $(dimensions).each(function (index, dimension) {
            _html = '<div class="jarvis report dashboard overviewpie pie widget" data-dimensions="' + dimension.name + '" data-metrics="' + metrics[0].name + '" style="float:right;" data-limit="4"></div>';
            $metricbox.append(_html);
        });

        $(metrics).each(function (index, metric) {
            _html = '<div class="jarvis report overviewmetricbox widget" data-metrics="' + metric.name + '"></div>';
            $metricbox.append(_html);
        });

        _html = '<div class="jarvis report summarytable" data-dimensions="' + dimensions[0].name + '" data-metrics="' + metrics[0].name + '" data-limit="10" style="margin-top:-20px;"></div>';
        $table.append(_html);
        var mb = new jarvis.visualisation.report.OverviewMetricBox().init();
        var pie = new jarvis.visualisation.report.OverviewPie().init();
        var table = new jarvis.visualisation.report.SummaryTable().init();
    }
    else if (this.tabType == 'histogram') {
        //_this.panel = jarvis.objects.Reports.Get(sender, {id:_this.reportID}, null, true);

        metricslist = '';
        $(metrics).each(function (i, o) {
            if (i > 0)
                metricslist += o.name + ', ';
        });
        metricslist = metricslist.substring(0, metricslist.length - 2);

        // if (!_this.panel.Tabs[0].MetricGroups[0].histogramsorted){
        //_this.panel.Tabs[0].MetricGroups[0].Metrics.splice(0, 1);
        //  _this.panel.Tabs[0].MetricGroups[0].histogramsorted=true;
        //}

        $mgs.attr('data-reportid', _this.panel.id);
        $mgs.attr('data-tabid', _this.tabID);
        $mgs.attr('data-mgid', _this.metricgroupID);
        $timeline.attr('data-metrics', metrics[1].name);
        $metricbox.attr('data-metrics', metricslist);
        $table.attr('data-dimensions', dimensions[0].name);
        //$table.attr('data-metrics', metricslist);

        $table.addClass('histogram');

        $('.jarvis.report.metricgroups').show();
        $('.jarvis.report.row-top').show();
        $('.jarvis.report.row-middle').show();

        jarvis.visualisation.report.metricgroup = new jarvis.visualisation.report.MetricGroup().init();
        jarvis.visualisation.report.timeline = new jarvis.visualisation.report.Timeline().init({primaryMetric: metrics[1].name});
        jarvis.visualisation.report.metricbox = new jarvis.visualisation.report.MetricBox().init();
        jarvis.visualisation.report.histogram = new jarvis.visualisation.report.Histogram().init();


    }

    $(jarvis).trigger('jarvis-report-draw');
};

jarvis.visualisation.report.Panel.prototype.list = function (container) {

};

jarvis.visualisation.report.Panel.prototype.get = function (sender, id) {
    if (id == -1)
        return;

    var data = jarvis.objects.Reports.Get(sender, {id: id});

    sender.reportID = data.id;

    //sender.tabID = 0; //data.Tabs[0].ID;


    return data;
};


jarvis.visualisation.report.Panel.prototype.updateDisplay = function (options) {
    //jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/get', {id:options.panelID}, function (sender, data, error) {
    //data = $.parseJSON(data.data);
    var $container = $(options.container);
    var data = options._this.panel;
    $('body').find('.jarvis.caption').text(data.name.replace('&amp;', '&')).trigger('contentchange');
    $('body').find('.jarvis.description').text(data.description).trigger('contentchange');
    //});


    if ($('body').attr('class')) {
        if (!$('body').attr('class').indexOf(data.name))
            $('body').addClass(data.name);
    }
    else
        $('body').addClass(data.name);
};

jarvis.debug.log('INFO', 'Report.Visualisation.Panel', 6, 'JS source loaded');
