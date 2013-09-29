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


joolaio.provide('joolaio.visualisation.report.Tabs');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation.report');

/*
 joolaio.visualisation.report.Tabs = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;
 this._this = this;
 this.options = options;

 this.reportID = -1;

 this.containers = [];

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.visualisation.report.Tabs', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

joolaio.visualisation.report.Tabs = function (options, container) {
    var _this = this;

    joolaio.objects.Reports.List();
    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();
}

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.Tabs.prototype.init = function (options, container) {
    var _this = this;

    joolaio.debug.log('INFO', 'joolaio.visualisation.report.Tabs', 6, 'Building Tabs for ID (\'' + _this.reportID + '\')');

    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.tabs');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).show();

    $(matchedContainers).each(function (index, item) {
        var _reportid = $(item).attr('data-reportid');

        //console.log('_reportid - '+ _reportid);

        try {
            if (!_reportid && !options.reportid) {
                _reportid = joolaio.objects.Reports[0].ID;
                //throw 'no report id specified';
            }
            if (_reportid==""){
                _reportid = joolaio.objects.Reports[0].ID;
            }
        } catch (ex) {
            _reportid = joolaio.objects.Reports[0].ID;
        }

        _this.reportID = _reportid;
        _this.panel = _this.get(_this, _this.reportID);

        if (!_this.panel)
            return;

        if (options == null)
            options = new Object();

        options.reportID = _this.reportID;
        _this.tabID = options.tabID;
        if (!_this.tabID ){
            _this.tabID=0;
        }
        options.container = item;
        options._this = _this;
        _this.updateDisplay(options);

        //$(joolaio).unbind('reportchange');
        //$(joolaio).bind('reportchange', function (e, reportID) {
        //    _this.reportID = reportID;
        //    $(item).attr('data-reportid', _this.reportID);
        //    _this.init(_this, item, true, true);
        //});

        joolaio.debug.log('INFO', 'joolaio.visualisation.report.Tabs', 6, 'Applying to container (\'' + this.id + '\')');
    });
};

joolaio.visualisation.report.Tabs.prototype.get = function (sender, id) {
    if (id == -1)
        return;
    /*if (joolaio.cache.get('report-' + id)){
        //console.log('cache hit');
        return joolaio.cache.get('report-' + id).value;
    }*/

    //var data = joolaio.dataaccess.fetch(this, '/engine/Reports.svc/get', {id:id}, null);
    //data = $.parseJSON(data.data);
    var data = joolaio.objects.Reports.Get(sender, {id:id});

    sender.reportID = data.ID;
    //joolaio.cache.push('report-' + id, data);

    return data;
};

joolaio.visualisation.report.Tabs.prototype.updateDisplay = function (options) {

    var _this = options._this;

    var _html = '';

    _html += '<ul class="nav nav-tabs">';
    $(_this.panel.Tabs).each(function (i, tab) {
        _html += '<li class="' + (i == options.selected ? 'active' : '') + '">';
        _html += '<a class="tablink" data-tabid="' + i + '">' + tab.name + '</a>';
        _html += '</li>';
    });
    _html += '</ul>';

    var $html = $(_html);

    $html.find('.tablink').each(function (i, link) {

        var $link = $(link);
        $link.off('click');
        $link.on('click', function (e) {
            $(joolaio).trigger('tabchange', $link.attr('data-tabid'));
            $html.find('.tablink').each(function (i, o) {
                $(o).removeClass('active');
            });
            $(this).addClass('active');
        });
    });

    $(options.container).empty();

    $(options.container).append($html);

    //console.log(_html);
};

joolaio.debug.log('INFO', 'Report.Visualisation.Tabs', 6, 'JS source loaded');
/*
if ($('.joolaio.report.panel').length == 0)
    joolaio.visualisation.report.Tabs.init();
    */