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


joolaio.provide('joolaio.visualisation.report.panel');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.report');
joolaio.require('joolaio.visualisation.report');


joolaio.visualisation.report.Panel = function (options) {
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
                pageSize: 10,
                minSelected: 0,
                maxSelected: 3,
                excludeDimensions: [],
                defaultSelected: 0
            }
        }
    }, options);
    joolaio.objects.Reports.List();

    try {
        this.reportID = options.reportID;
    }
    catch (e) {
        this.reportID = joolaio.objects.Reports[0].id; //this.getDefaultPanel();
    }

    this.containers = [];

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    matchedContainers = $('.joolaio.report.panel');
    if (matchedContainers.length > 0) {
        joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Panel', 6, 'Building Initial Panel (\'' + this.id + '\')');

        var $editbutton = $('.joolaio.container').find('.panel-edit');
        $editbutton.off('click');
        $editbutton.on('click', function (e) {
            var o = new joolaio.visualisation.report.Editor();
            o.init(o, {container: matchedContainers, reportID: _this.reportID});
        });
    }

    this.container = matchedContainers;
    joolaio.visualisation.report.panel = this;

    joolaio.objects.Reports.List();
    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    if (joolaio.state != null) {
        _this.reportID = joolaio.state.reportID;
        _this.tabID = joolaio.state.tabID;
        _this.metricgroupID = joolaio.state.metricgroupID;

        _this.tabType = joolaio.state.tabType;
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
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Panel', 5, '...Constructor (' + executionTime + 'ms)');


    if (!joolaio.visualisation.reportWrapper)
        joolaio.visualisation.reportWrapper = _this;
    return _this;
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.Panel.prototype.init = function (options, container, drawWidgets, breakBindLoop, saveState) {
    var _this = this;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Panel', 6, 'Building Panel for ID (\'' + _this.reportID + '\')');

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

    joolaio.visualisation.report.globalfilter = '';

        try {
        if ($('.joolaio.report.panel').attr('data-id') != null)
            _this.reportID = $('.joolaio.report.panel').attr('data-id');
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
            _this.reportID = joolaio.objects.Reports[0].id; //this.getDefaultPanel();
    }

        if (_this.reportID == null || _this.reportID == 'undefined')
        _this.reportID = joolaio.objects.Reports[0].id//-1;
    if (_this.tabID == null || _this.tabID == 'undefined')
        _this.tabID = 0;
    if (_this.tabType == null || _this.tabType == 'undefined')
        _this.tabType = 'explorer';
    if (_this.metricgroupID == null || _this.metricgroupID == 'undefined')
        _this.metricgroupID = 0;
    if (_this.reportID == -1)
        _this.reportID = joolaio.objects.Reports[0].id//-1;

        _this.panel = _this.get(_this, _this.reportID);
    if (!this.panel) {
        return;
    }

    _this.tabType = _this.panel.tabs[_this.tabID].type;

    _this.setDisplay();


    if (typeof saveState == 'undefined' || saveState == true) {
        joolaio.state.view = 'report';
        joolaio.state.dashboardID = _this.panelID;
        joolaio.state.reportID = _this.reportID;
        joolaio.state.tabID = _this.tabID;
        joolaio.state.metricgroupID = _this.metricgroupID;
        joolaio.state.tabType = _this.tabType;
        //joolaio.saveState('Report Panel Init');
    }


    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.panel');
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

        $(joolaio).unbind('tabchange');
        $(joolaio).bind('tabchange', function (e, tabID) {

            //_this.reportID = reportID;
            _this.tabID = tabID;
            _this.metricgroupID = 0;

            joolaio.visualisation.report.globalfilter = '';

            //joolaio.visualisation.report.setFilter('');
            _this.init(_this, item, true, true);

            //joolaio.saveState("Tab change");
            // _this.drawWidgets(_this, $('.joolaio.container.report'), true, true);
        });

        $(joolaio).unbind('metricgroupchange');
        $(joolaio).bind('metricgroupchange', function (e, metricgroupID) {

            //_this.reportID = reportID;
            _this.metricgroupID = metricgroupID;
            try {
                joolaio.state['timeline-1234'].primaryMetric = null;
            }
            catch (ex) {
                //ignore
            }
            //joolaio.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
            joolaio.state.metricgroupID = _this.metricgroupID;
            _this.init(_this, item, true, true);
            //joolaio.saveState("Metric Group change");
            //  _this.drawWidgets(_this, $('.joolaio.container.report'), true, true);
        });

        joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Panel', 6, 'Applying to container (\'' + this.id + '\')');
    });

    var $editbutton = $('.joolaio.container').find('.panel-edit');
    $editbutton.off('click');
    $editbutton.on('click', function (e) {
        var o = new joolaio.visualisation.report.Editor();
        o.init(o, {container: matchedContainers, reportID: _this.reportID});
    });

    return _this;
};

joolaio.visualisation.report.Panel.prototype.setDisplay = function () {

}

joolaio.visualisation.report.Panel.prototype.show = function () {
    $('.joolaio.report.panel').show();
}

joolaio.visualisation.report.Panel.prototype.hide = function () {
    $('.joolaio.dashboard.panel').hide();
}

joolaio.visualisation.report.Panel.prototype.dispose = function () {

    var container = $('.joolaio.report.panel');
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

    joolaio.visualisation.report.tabs = null;
    joolaio.visualisation.report.metricgroup = null;
    joolaio.visualisation.report.timeline = null;
    joolaio.visualisation.report.metricbox = null;
    if (joolaio.visualisation.report.table)
        joolaio.visualisation.report.table.destroy();
    joolaio.visualisation.report.table = null;
    if (joolaio.visualisation.report.tableex)
        joolaio.visualisation.report.tableex.destroy();
    joolaio.visualisation.report.tableex = null;
    if (joolaio.visualisation.report.histogram)
        joolaio.visualisation.report.histogram.destroy();
    joolaio.visualisation.report.histogram = null;
}


joolaio.visualisation.report.Panel.prototype.baseHTML = function (sender, container) {
    var $container = $(container);
    //$container.empty();
}

joolaio.visualisation.report.Panel.prototype.drawWidgets = function (sender, container, redraw) {


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
            metrics[i] = joolaio.objects.Metrics.Get(null, {id: m});
        });
    }
    if (typeof(dimensions[0] != 'object')) {
        _.each(dimensions, function (d, i) {
            dimensions[i] = joolaio.objects.Dimensions.Get(null, {id: d});
        });
    }

    if (typeof(drilldowns[0] != 'object')) {
        _.each(drilldowns, function (d, i) {
            drilldowns[i] = joolaio.objects.Dimensions.Get(null, {id: d.dimensions[0].id});
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
     joolaio.visualisation.report.tabs = null;
     joolaio.visualisation.report.metricgroup = null;
     joolaio.visualisation.report.timeline = null;
     joolaio.visualisation.report.metricbox = null;
     joolaio.visualisation.report.table = null;
     joolaio.visualisation.report.tableex = null;
     joolaio.visualisation.report.histogram = null;*/
    joolaio.visualisation.report.tabs = new joolaio.visualisation.report.Tabs().init({selected: this.tabID});

    $mgs.attr('data-reportid', _this.panel.id);
    $mgs.attr('data-tabid', _this.tabID);
    $mgs.attr('data-mgid', _this.metricgroupID);
    $timeline.attr('data-metrics', metrics[0].id);
    $metricbox.attr('data-metrics', metricslist);
    //$table.attr('data-dimensions', JSON.stringify(levels));
    $table.attr('data-dimensions', dimensions[0].id);
    $table.attr('data-metrics', metricslist);

    if (this.tabType == 'explorer') {
        $('.joolaio.report.metricgroups').show();
        $('.joolaio.report.row-top').show();
        $('.joolaio.report.row-middle').show();

        joolaio.visualisation.report.metricgroup = new joolaio.visualisation.report.MetricGroup().init();

        joolaio.visualisation.report.timeline = new joolaio.visualisation.report.Timeline().init({primaryMetric: metrics[0].id, height: _this.options.widgets.timeline.height, excludeMetrics: _this.options.widgets.timeline.excludeMetrics, showPrimary: _this.options.widgets.timeline.showPrimary});
        joolaio.visualisation.report.metricbox = new joolaio.visualisation.report.MetricBox().init();


        if (!_this.options.widgets.table)
            _this.options.widgets.table = {pageSize: 10};
        joolaio.visualisation.report.table = new joolaio.visualisation.report.Table().init({pageSize: _this.options.widgets.table.pageSize,
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

        $('.joolaio.report.metricgroups').hide();
        $('.joolaio.report.row-top').hide();
        $('.joolaio.report.row-middle').hide();

        joolaio.visualisation.report.tableex = new joolaio.visualisation.report.TableEx().init();
    }
    else if (this.tabType == 'overview') {
        $('.joolaio.report.metricgroups').show();
        $('.joolaio.report.row-top').show();
        $('.joolaio.report.row-middle').show();

        joolaio.visualisation.report.timeline = new joolaio.visualisation.report.Timeline().init({primaryMetric: metrics[0].name, height: 180});

        var metrics = _this.panel.tabs[0].metricgroups[0].metrics;
        var dimensions = _this.panel.tabs[0].dimensions;


        $(dimensions).each(function (index, dimension) {
            _html = '<div class="joolaio report dashboard overviewpie pie widget" data-dimensions="' + dimension.name + '" data-metrics="' + metrics[0].name + '" style="float:right;" data-limit="4"></div>';
            $metricbox.append(_html);
        });

        $(metrics).each(function (index, metric) {
            _html = '<div class="joolaio report overviewmetricbox widget" data-metrics="' + metric.name + '"></div>';
            $metricbox.append(_html);
        });

        _html = '<div class="joolaio report summarytable" data-dimensions="' + dimensions[0].name + '" data-metrics="' + metrics[0].name + '" data-limit="10" style="margin-top:-20px;"></div>';
        $table.append(_html);
        var mb = new joolaio.visualisation.report.OverviewMetricBox().init();
        var pie = new joolaio.visualisation.report.OverviewPie().init();
        var table = new joolaio.visualisation.report.SummaryTable().init();
    }
    else if (this.tabType == 'histogram') {
        //_this.panel = joolaio.objects.Reports.Get(sender, {id:_this.reportID}, null, true);

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

        $('.joolaio.report.metricgroups').show();
        $('.joolaio.report.row-top').show();
        $('.joolaio.report.row-middle').show();

        joolaio.visualisation.report.metricgroup = new joolaio.visualisation.report.MetricGroup().init();
        joolaio.visualisation.report.timeline = new joolaio.visualisation.report.Timeline().init({primaryMetric: metrics[1].name});
        joolaio.visualisation.report.metricbox = new joolaio.visualisation.report.MetricBox().init();
        joolaio.visualisation.report.histogram = new joolaio.visualisation.report.Histogram().init();


    }

    $(joolaio).trigger('joolaio-report-draw');
};

joolaio.visualisation.report.Panel.prototype.list = function (container) {

};

joolaio.visualisation.report.Panel.prototype.get = function (sender, id) {
    if (id == -1)
        return;

    var data = joolaio.objects.Reports.Get(sender, {id: id});

    sender.reportID = data.id;

    //sender.tabID = 0; //data.Tabs[0].ID;


    return data;
};


joolaio.visualisation.report.Panel.prototype.updateDisplay = function (options) {
    //joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/get', {id:options.panelID}, function (sender, data, error) {
    //data = $.parseJSON(data.data);
    var $container = $(options.container);
    var data = options._this.panel;
    $('body').find('.joolaio.caption').text(data.name.replace('&amp;', '&')).trigger('contentchange');
    $('body').find('.joolaio.description').text(data.description).trigger('contentchange');
    //});


    if ($('body').attr('class')) {
        if (!$('body').attr('class').indexOf(data.name))
            $('body').addClass(data.name);
    }
    else
        $('body').addClass(data.name);
};

joolaio.debug.log('INFO', 'Report.Visualisation.Panel', 6, 'JS source loaded');
