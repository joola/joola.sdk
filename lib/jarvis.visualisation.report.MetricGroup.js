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


jarvis.provide('jarvis.visualisation.report.MetricGroup');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation.report');

/*
 jarvis.report.visualisation.Tabs = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;
 this._this = this;
 this.options = options;

 this.reportID = -1;

 this.containers = [];

 var executionTime = new Date().getMilliseconds() - start;
 jarvis.debug.log('INFO', 'Jarvis.Report.Visualisation.Tabs', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */
jarvis.visualisation.report.MetricGroup = function (options, container) {
    var _this = this;

    jarvis.objects.Reports.List();
    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();
}
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.report.MetricGroup.prototype.init = function (options, container) {
    var _this = this;
    jarvis.debug.log('INFO', 'jarvis.visualisation.report.MetricGroup', 6, 'Building MetricGroup for ID (\'' + _this.reportID + '\')');

    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.report.metricgroups');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).show();

    $(matchedContainers).each(function (index, item) {
        var _reportid = $(item).attr('data-reportid');
        var _tabid = $(item).attr('data-tabid');
        var _mgid = $(item).attr('data-mgid');



        try {
            if (!_reportid && !options.reportid) {
                _reportid = jarvis.objects.Reports[0].id;
                //throw 'no report id specified';
            }
            if (_reportid==""){
                _reportid = jarvis.objects.Reports[0].id;
            }
        } catch (ex) {
            _reportid = jarvis.objects.Reports[0].id;
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

        //$(jarvis).unbind('reportchange');
        //$(jarvis).bind('reportchange', function (e, reportID) {
        //    _this.reportID = reportID;
        //    $(item).attr('data-reportid', _this.reportID);
        //    _this.init(_this, item, true, true);
        //});

        jarvis.debug.log('INFO', 'jarvis.visualisation.report.MetricGroup', 6, 'Applying to container (\'' + this.id + '\')');
    });
};

jarvis.visualisation.report.MetricGroup.prototype.get = function (sender, id) {
    if (id == -1)
        return;
    var data = jarvis.objects.Reports.Get(sender, {id:id});
    sender.reportID = data.id;

    return data;
};

jarvis.visualisation.report.MetricGroup.prototype.updateDisplay = function (options) {

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
            $(jarvis).trigger('metricgroupchange', $link.attr('data-mgid'));
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

jarvis.debug.log('INFO', 'Report.Visualisation.MetricGroup', 6, 'JS source loaded');
/*
 if ($('.jarvis.report.panel').length == 0)
 jarvis.visualisation.report.MetricGroup.init();
 */