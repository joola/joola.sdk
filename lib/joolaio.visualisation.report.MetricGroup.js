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


joolaio.provide('joolaio.visualisation.report.MetricGroup');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation.report');

/*
 joolaio.report.visualisation.Tabs = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;
 this._this = this;
 this.options = options;

 this.reportID = -1;

 this.containers = [];

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.Report.Visualisation.Tabs', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */
joolaio.visualisation.report.MetricGroup = function (options, container) {
    var _this = this;

    joolaio.objects.Reports.List();
    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();
}
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.MetricGroup.prototype.init = function (options, container) {
    var _this = this;
    joolaio.debug.log('INFO', 'joolaio.visualisation.report.MetricGroup', 6, 'Building MetricGroup for ID (\'' + _this.reportID + '\')');

    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.metricgroups');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).show();

    $(matchedContainers).each(function (index, item) {
        var _reportid = $(item).attr('data-reportid');
        var _tabid = $(item).attr('data-tabid');
        var _mgid = $(item).attr('data-mgid');



        try {
            if (!_reportid && !options.reportid) {
                _reportid = joolaio.objects.Reports[0].id;
                //throw 'no report id specified';
            }
            if (_reportid==""){
                _reportid = joolaio.objects.Reports[0].id;
            }
        } catch (ex) {
            _reportid = joolaio.objects.Reports[0].id;
        }


        _this.reportID = _reportid;
        _this.mgid = _mgid;
        _this.tabid = _tabid;
        _this.panel = _this.get(_this, _this.reportID);
        if (!_this.panel)
            return;

        if (options == null)
            options = new Object();

        options.reportID = _this.reportID;
        options.container = item;
        options._this = _this;
        _this.updateDisplay(options);

        //$(joolaio).unbind('reportchange');
        //$(joolaio).bind('reportchange', function (e, reportID) {
        //    _this.reportID = reportID;
        //    $(item).attr('data-reportid', _this.reportID);
        //    _this.init(_this, item, true, true);
        //});

        joolaio.debug.log('INFO', 'joolaio.visualisation.report.MetricGroup', 6, 'Applying to container (\'' + this.id + '\')');
    });
};

joolaio.visualisation.report.MetricGroup.prototype.get = function (sender, id) {
    if (id == -1)
        return;
    var data = joolaio.objects.Reports.Get(sender, {id:id});
    sender.reportID = data.id;

    return data;
};

joolaio.visualisation.report.MetricGroup.prototype.updateDisplay = function (options) {

    var _this = options._this;

    var _html = '';

    _html += '<ul class="nav nav-pills">';
    $(_this.panel.tabs[_this.tabid].metricgroups).each(function (i, mg) {
        _html += '<li class="' + (i == _this.mgid ? 'active' : '') + '">';
        _html += '<a class="mglink" data-mgid="' + i + '">' + mg.name + '</a>';
        _html += '</li>';
    });
    _html += '</ul>';

    var $html = $(_html);

    $html.find('.mglink').each(function (i, link) {

        var $link = $(link);
        $link.off('click');
        $link.on('click', function (e) {
            $(joolaio).trigger('metricgroupchange', $link.attr('data-mgid'));
            $html.find('.mglink').each(function (i, o) {
                $(o).removeClass('active');
            });
            $($link).addClass('active');
        });
    });


    if (_this.panel.tabs[_this.tabid].metricgroups.length == 1) {
        $html.hide();
    }

    $(options.container).empty();
    $(options.container).append($html);


};

joolaio.debug.log('INFO', 'Report.Visualisation.MetricGroup', 6, 'JS source loaded');
/*
 if ($('.joolaio.report.panel').length == 0)
 joolaio.visualisation.report.MetricGroup.init();
 */