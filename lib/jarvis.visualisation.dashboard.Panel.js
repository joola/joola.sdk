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
jarvis.provide('jarvis.visualisation.dashboard.Panel');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.dashboard');
jarvis.require('jarvis.visualisation.dashboard');


jarvis.visualisation.dashboard.Panel = function (options) {

    jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 6, 'Creating Dashboard Panel Object...');

    var start = new Date().getMilliseconds();

    //new jarvis.objects.Dashboards().List();

    var _this = this;
    this._this = this;

    this.options = $.extend({
        widgets: {
            timeline: {
                height: 235
            },
            metricbox: {
                minichart: {
                    height: 18,
                    width: 75
                }
            },
            pie: {
                legend: false
            }
        }
    }, options);


    //this.options = options;

    jarvis.visualisation.dashboard.panelFilter = '';

    this.panelID = -1;

    try {
        this.panelID = options.panelID;
    }
    catch (e) {

    }

    if (this.panelID == -1) {
        try {
            this.panelID = jarvis.objects.Dashboards[0].id;
        }
        catch (e) {
            this.panelID = -1;
        }
    }


    jarvis.setDashboard(this);

    this.containers = [];
    //lookup any containers relevant for the timeline
    /*
     var matchedContainers = null;
     matchedContainers = $('.jarvis.dashboard.widgets');
     if (matchedContainers.length > 0) {
     jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 6, 'Building Initial Dashboard (\'' + this.id + '\')');
     }
     */
    var $addwidgetbutton = $('body').find('.widget-add');
    $addwidgetbutton.show();

    $(jarvis.dashboard).bind('filter', function (e) {
        jarvis.debug.log('INFO', 'Dashboard.Visualisation.Panel', 6, 'Applying Filter');

        matchedContainers = $('.jarvis.dashboard.widgets');

        _this.setDisplay();
        _this.init(_this, matchedContainers, true, true);
        _this.drawWidgets(_this, $('.jarvis.dashboard.widgets'), true, true);
    });
    matchedContainers = $('.jarvis.dashboard.panel');
    this.container = matchedContainers;
    this.containers.push(this.container);
    jarvis.visualisation.dashboard.panel = this;

    //jarvis.dataaccess.listDimensions();
    //jarvis.dataaccess.listMetrics();

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 5, '...Constructor (' + executionTime + 'ms)');

    return _this;
};

jarvis.visualisation.dashboard.Panel.prototype.dispose = function () {
    jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 6, 'Disposing');
    $('.jarvis.dashboard.column-left, .jarvis.dashboard.column-mid, .jarvis.dashboard.column-right').empty();
    $('.jarvis.dashboard.widgets').empty();

    /*
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
     */
}
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.dashboard.Panel.prototype.init = function (options, container, drawWidgets, breakBindLoop, saveState) {
    var _this = this;
    try {
        if (options.panelID > -1)
            _this.panelID = options.panelID;
        else if (_this.panelID == -1)
            _this.panelID = options.panelID;
    }
    catch (e) {
    }



    if (_this.panelID == -1)
        _this.panelID = jarvis.objects.Dashboards[0].id; //this.getDefaultPanel();

    jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 6, 'Building panel for ID (\'' + _this.panelID + '\')');

    //if (typeof(drawWidgets) == 'undefined' && jarvis.manualDraw)
//        drawWidgets = true;
    _this.setDisplay();
    _this.panel = _this.get(_this, _this.panelID);
    if (!this.panel) {
        throw 'failed to locate panel';
        return;
    }

    if (typeof saveState == 'undefined' || saveState == true) {
        jarvis.state.view = 'dashboard';
        jarvis.state.dashboardID = _this.panelID;
        jarvis.saveState('Dashboard Panel Init');
    }
    /*
     if (!breakBindLoop) {
     jarvis.realtime.panelFilter = _this.panel.Segment;
     jarvis.realtime.processFilter();
     }
     */

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.dashboard.widgets');
    if (matchedContainers.length == 0) {
        throw 'failed to locate panel';

        return;
    }

    $(matchedContainers).each(function (index, item) {
        if (options == null)
            options = new Object();

        options.panelID = _this.panelID;
        options.container = item;
        options._this = _this;
        _this.updateDisplay(options);

        _this.drawWidgets(_this, item, drawWidgets);
        /*
         $(jarvis.realtime).bind('filterchange', function (e) {
         if (!breakBindLoop) {
         jarvis.debug.log('INFO', 'Dashboard.Visualisation.Panel', 6, 'Applying Filter');
         $(jarvis.realtime.subscribers).each(function (index, item) {
         jarvis.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'Unsubscribing \'' + this.key + '\'');
         var client_id = PokeIn.GetClientId();
         var queryOptions = {
         ClientID:client_id,
         key:this.key
         };
         jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/unsubscribe', queryOptions, function () {
         });
         });
         jarvis.realtime.subscribers = [];

         _this.init(_this, item, true, true);
         //_this.drawWidgets(_this, $('.jarvis.container.realtime'), true);
         }
         });
         */
        jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Panel', 6, 'Applying to container (\'' + this.id + '\')');
    });

    var $editbutton = $('body').find('.panel-edit');
    $editbutton.off('click');
    $editbutton.on('click', function (e) {
        _this.showEdit({container: matchedContainers, addNew: false, _this: _this});
    });

    var $addwidgetbutton = $('body').find('.widget-add');
    $addwidgetbutton.off('click');
    $addwidgetbutton.on('click', function (e) {
        _this.showEditWidget({container: matchedContainers, addNew: true, _this: _this});
    });

    return _this;
};

jarvis.visualisation.dashboard.Panel.prototype.setDisplay = function () {
    $('body').find('.jarvis.report.panel').hide();

    /*
     $('body').find('.homepage').hide();
     $('.jarvis.container').show();
     $('body').find('.jarvis.report.panel').hide();
     $($('body').find('.jarvis.report.panel')).find('.timeline').empty();
     $($('body').find('.jarvis.report.panel')).find('.metricbox').empty();
     $($('body').find('.jarvis.report.panel')).find('.jtable').empty();
     $('body').find('.jarvis.picker.datebox').show();
     $('.jarvis.realtime.panel').hide();
     $($('.jarvis.realtime.panel').find('.widgets')).empty();
     $('.jarvis.dashboard.panel').show();
     */
}

jarvis.visualisation.dashboard.Panel.prototype.drawWidgets = function (sender, container, redraw) {
    var _this = sender;
    var panel = _this.panel;



    var widgets = panel.widgets;

    var _html = _this.baseHTML();

    //preapre the container with the columns
    //$(container).find('.jarvis.dashboard.widgets').empty();
    $(container).empty();
    /*
     _html = '<div class="jarvis realtime row-top row fluid-row">' +
     '</div>';

     _html += '<div class="row fluid-row">' +
     '<div class="jarvis dashboard column-left span3 columns ">&nbsp;' +
     '</div>' +
     '<div class="jarvis dashboard column-mid span5 columns">&nbsp;' +
     '</div>' +
     '<div class="jarvis dashboard column-right span4 columns ">&nbsp;' +
     '</div>' +
     '</div>';
     */
    $(container).append(_html);

    /*
    $('.jarvis.dashboard.column-left, .jarvis.dashboard.column-mid, .jarvis.dashboard.column-right').sortable({
        connectWith: ".columns",
        handle: '.header',
        placeholder: {
            element: function (currentItem) {
                return $('<div class="droptarget">' + $(currentItem).attr('data-title') + '</div>')[0];
            },
            update: function (container, p) {

            }
        },
        update: function (e, p) {
            var parent = 1;
            if ($(this).attr('class').indexOf('left') > -1)
                parent = 1;
            else if ($(this).attr('class').indexOf('mid') > -1)
                parent = 2;
            else
                parent = 3;

            $(this).children().each(function (i) {
                //var li = $(this);
                //newOrder += " " + li.attr("data-widgetid") + '=' + i + '&';
                var widgetID = $(this).attr("data-widgetid");
                if ($(this).attr('class').indexOf('pie') > -1)
                    new jarvis.visualisation.dashboard.Pie().init(null, $(this));
                if ($(this).attr('class').indexOf('timeline') > -1)
                    new jarvis.visualisation.dashboard.Timeline().init(null, $(this));
                jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/UpdateWidgetPosition', {ID: widgetID, Column: parent, Ordinal: i + 1 }, function (sender, data, error) {
                    data = $.parseJSON(data.data);
                });
            });
        },
        stop: function (event, ui) {

        }
    }).disableSelection();
    */
    //populate widgets
    $(widgets).each(function (index, item) {

        jarvis.debug.log('INFO', 'Jarvis.Dashboards.Visualisation.Panel', 6, 'Drawing widget (\'' + item.title+ '\')');

        switch (item.type) {
            case 'timeline':
                if (item.metrics[0] == null)
                    break;

                var metricslist = item.metrics[0];
                if (item.metrics[1] && item.metrics[1] != null && item.metrics[1] != '')
                    metricslist += ', ' + item.metrics[1];

                _html = '<div class="jarvis dashboard timeline widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-metrics="' + metricslist + '" data-period="' + item.period + '" data-limit="' + item.limit + '" data-height="' + _this.options.widgets.timeline.height + '"></div>';
                if (item.column == 1) {
                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    //_html = '<div  class="jarvis dashboard pie widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }

                break;
            case 'bar':
                if (item.metrics[0] == null)
                    break;
                if (item.dimensions[0] == null )
                    break;

                _html = '<div class="jarvis dashboard bar widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-metrics="' + item.metrics[0] + '" data-dimensions="' + item.dimensions[0]+ '" data-period="' + item.period + '" data-limit="' + item.limit + '" data-height="' + _this.options.widgets.timeline.height + '"></div>';
                if (item.column == 1) {
                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    //_html = '<div  class="jarvis dashboard pie widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }

                break;
            case 'metricbox':
                if (item.metrics[0] == null)
                    break;

                _html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-dimensions="' + '' + '" data-metrics="' +item.metrics[0] + '" data-period="' + item.period + '" data-limit="' + item.limit + '" data-minichart-height="' + _this.options.widgets.metricbox.minichart.height + '" data-minichart-width="' + _this.options.widgets.metricbox.minichart.width + '"></div>';
                if (item.column == 1) {

                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    //_html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + '' + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    //_html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + '' + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }
                break;
            case 'table':
                if (item.metrics[0] == null)
                    break;
                if (item.dimensions[0] == null)
                    break;
                var metricslist = item.metrics[0];
                if (item.metrics[1] && item.metrics[1] != null && item.metrics[1] != '')
                    metricslist += ', ' + item.metrics[1];

                _html = '<div class="jarvis dashboard jtable widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-dimensions="' + item.dimensions[0] + '" data-metrics="' + metricslist + '" data-period="' + item.period + '" data-limit="' + item.limit + '"></div>';
                if (item.column == 1) {
                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    //_html = '<div  class="jarvis dashboard jtable widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + metricslist + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    $(container).find('.column-right').append(_html);
                }
                break;
            case 'bartable':
                if (item.metrics[0] == null)
                    break;
                if (item.dimensions[0] == null)
                    break;
                var metricslist = item.metrics[0];
                if (item.metrics[1]&& item.metrics[1]!= null && item.metrics[1]!= '')
                    metricslist += ', ' + item.metrics[1];

                _html = '<div class="jarvis dashboard bartable widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-dimensions="' + item.dimensions[0]+ '" data-metrics="' + metricslist + '" data-period="' + item.period + '" data-limit="' + item.limit + '"></div>';
                if (item.column == 1) {
                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    //_html = '<div  class="jarvis dashboard jtable widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + metricslist + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    $(container).find('.column-right').append(_html);
                }
                break;
            case "pie":
                if (item.metrics[0] == null)
                    break;
                if (item.dimensions[0] == null )
                    break;
                _html = '<div class="jarvis dashboard pie widget" data-widgetid="' + item.id + '" data-title="' + item.title + '" data-dimensions="' + item.dimensions[0] + '" data-metrics="' + item.metrics[0] + '" data-period="' + item.period + '" data-limit="' + item.limit + '" data-legend="' + _this.options.widgets.pie.legend + '"></div>';
                if (item.column == 1) {
                    $(container).find('.column-left').append(_html);
                }
                else if (item.column == 2) {
                    $(container).find('.column-mid').append(_html);
                }
                else {
                    //_html = '<div  class="jarvis dashboard pie widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }
            default:
                break;
        }
    });

    //redraw=true;
    if (redraw == true) {
        jarvis.debug.log('INFO', 'Jarvis.Dashboards.Visualisation.Panel', 6, 'Redraw');
        new jarvis.visualisation.dashboard.MetricBox().init();
        new jarvis.visualisation.dashboard.Timeline().init();
        new jarvis.visualisation.dashboard.Table().init();
        new jarvis.visualisation.dashboard.Pie().init();
        new jarvis.visualisation.dashboard.Bar().init();
        new jarvis.visualisation.dashboard.BarTable().init();

        $(jarvis).trigger('jarvis-dashboard-draw');
    }
};

jarvis.visualisation.dashboard.Panel.prototype.baseHTML = function (sender) {
    var _this = sender;
    var _html = '';



    _html = '<div class="jarvis realtime row-top row fluid-row">' +
        '</div>';

    _html += '<div class="row fluid-row">' +
        '<div class="jarvis dashboard column-left span3 columns ">&nbsp;' +
        '</div>' +
        '<div class="jarvis dashboard column-mid span5 columns">&nbsp;' +
        '</div>' +
        '<div class="jarvis dashboard column-right span4 columns ">&nbsp;' +
        '</div>' +
        '</div>';

    return _html;
};

jarvis.visualisation.dashboard.Panel.prototype.show = function (sender) {
    $('.jarvis.dashboard.panel').show();
};

jarvis.visualisation.dashboard.Panel.prototype.hide = function (sender) {
    $('.jarvis.dashboard.panel').hide();
};

jarvis.visualisation.dashboard.Panel.prototype.get = function (sender, id) {
    if (id == -1)
        return;

    var data = jarvis.objects.Dashboards.Get(null, {id: id});

    //var data = jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/get', {id:id}, null);
    //data = $.parseJSON(data.data);

    sender.panelID = data.id

    return data;
};

jarvis.visualisation.dashboard.Panel.prototype.updateDisplay = function (options) {
    //jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/get', {id:options.panelID}, function (sender, data, error) {
    //data = $.parseJSON(data.data);

    var $container = $(options.container);
    var data = options._this.panel;
    $('body').find('.jarvis.caption').text(data.name).trigger('contentchange');
    $('body').find('.jarvis.description').text(data.description).trigger('contentchange');
    //});


    if ($('body').attr('class')) {
        if (!$('body').attr('class').indexOf(data.name))
            $('body').addClass(data.name);
    }
    else
        $('body').addClass(data.name);
    // var $panellist = $('.jarvis.realtime.container').find('.panel-list');
    // if ($panellist) {
    //     options._this.list($panellist);
    // }

};

jarvis.visualisation.dashboard.Panel.prototype.showEdit = function (options) {
    var _this = options._this;
    var $container = $(options.container);
    var addnew = options.addNew;


    var _html = '';
    _html += '';
    _html += '<div class="panel-modal modal" style="left:50%;">';
    _html += '<div class="modal-header">';
    _html += '<a type="button" class="close" data-dismiss="modal">×</a>';

    if (options.addNew == true) {
        _html += '<h3>Add a new Dashboard Panel</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-name">Name</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="panel-edit-name" placeholder="Enter a name for the new Dashboard">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-description">Description</label>' +
            '<div class="controls">' +
            '<textarea class="input-xlarge" id="panel-edit-description" rows="3" placeholder="Describe the new Dashboard with a few words."></textarea>' +
            '</div>' +
            '</div>';

        /*
         _html += '<div class="row-fluid">' +
         '<div class="span6">' +
         '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios1" value="fiftyfifty" checked="true">' +
         '<h6>Two column layout</h6></label>' +
         '<div class="mini-layout fluid">' +
         '<div class="mini-layout-header"></div>' +
         '<div class="mini-layout-column-thirty"></div>' +
         '<div class="mini-layout-column-thirty"></div>' +
         '<div class="mini-layout-column-thirty"></div>' +
         '</div>' +
         '</div>' +

         '<div class="span6">' +
         '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios2" value="wideleft">' +
         '<h6>Wide left column layout</h6></label>' +
         '<div class="mini-layout fluid">' +
         '<div class="mini-layout-header"></div>' +
         '<div class="mini-layout-body" style="margin-right: 2.5%;margin-left:0;"></div>' +
         '<div class="mini-layout-sidebar"></div>' +
         '</div>' +
         '</div>' +

         '</div>';*/

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>';
    }
    else {
        var panel = _this.panel;
        _html += '<h3>Customize Dashboard Panel</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-name">Name</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="panel-edit-name" value="' + panel.name + '">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-description">Description</label>' +
            '<div class="controls">' +
            '<textarea class="input-xlarge" id="panel-edit-description" rows="3">' + panel.description + '</textarea>' +
            '</div>' +
            '</div>';

        /*
         _html += '<div class="row-fluid">' +
         '<div class="span6">' +
         '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios1" value="fiftyfifty" checked="true">' +
         '<h6>Two column layout</h6></label>' +
         '<div class="mini-layout fluid">' +
         '<div class="mini-layout-header"></div>' +
         '<div class="mini-layout-column-fiftyfifty"></div>' +
         '<div class="mini-layout-column-fiftyfifty"></div>' +
         '</div>' +
         '</div>' +

         '<div class="span6">' +
         '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios2" value="wideleft">' +
         '<h6>Wide left column layout</h6></label>' +
         '<div class="mini-layout fluid">' +
         '<div class="mini-layout-header"></div>' +
         '<div class="mini-layout-body" style="margin-right: 2.5%;margin-left:0;"></div>' +
         '<div class="mini-layout-sidebar"></div>' +
         '</div>' +
         '</div>' +

         '</div>';
         */

        _html += '</fieldset>';
        _html += '</form>';

        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="panel-edit-delete" style="cursor:pointer;float:left;margin-top:5px;">Delete</a>';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>';
    }

    _html += '</div>';
    _html += '</div>';

    //draw the modal
    var $modal = $(_html);
    $('body').append($modal);
    $modal.modal();

    $modal.find('.panel-edit-delete').off('click');
    $modal.find('.panel-edit-delete').on('click', function (e) {
        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/Delete', {ID: _this.panelID}, function (sender, data, error) {
            data = $.parseJSON(data.data);

            jarvis.objects.Dashboards.List(null, null, null, true);
            buildContentMenu_Dashboards();
            _this.panelID = jarvis.objects.Dashboards[0].id;
            _this.init(null, null, true);


            $modal.modal('hide');
        });
    });

    $modal.find('.panel-edit-save').off('click');
    $modal.find('.panel-edit-save').on('click', function (e) {
        var name = '';
        var description = '';

        name = $modal.find('#panel-edit-name').val();
        description = $modal.find('#panel-edit-description').val();

        var panelID = -1;
        if (!addnew)
            panelID = _this.panelID;

        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/Update', {ID: panelID, Name: name, Description: description}, function (sender, data, error) {
            data = $.parseJSON(data.data);

            var matchedContainers = $('.jarvis.dashboard.widgets');
            options = new Object();

            _this.panelID = data;
            _this.init(null, matchedContainers, true);
            jarvis.objects.Dashboards.List(null, null, null, true);
            buildContentMenu_Dashboards();
            $modal.modal('hide');
        });
    });

    //remove when done
    $modal.on('hidden', function () {
        $modal.remove();
    })
};

jarvis.visualisation.dashboard.Panel.prototype.generateSettings = function (type, widget) {
    var _html = '';

    var dimension = '';
    var metric = '';
    var secondaryMetric = '';
    if (widget) {
        if (widget.Dimension)
            dimension = widget.Dimension.name;

        metric = widget.PrimaryMetric.name;
        if (widget.SecondaryMetric)
            secondaryMetric = widget.SecondaryMetric.name;

    }

    if (type == 'Table' || type == 'Pie Chart') {

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-dimension">Dimension</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-dimension">';

        var dimensions = jarvis.objects.Dimensions;
        $(dimensions).each(function (index, item) {
            _html += '<option value="' + item.id + '" ' + (dimension == item.name ? 'selected' : '') + ' >' + item.name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';
    }

    _html += '<div class="control-group">' +
        '<label class="control-label" for="widget-edit-metric">Metric</label>' +
        '<div class="controls">' +
        '<select id="widget-edit-metric">';

    var metrics = jarvis.objects.Metrics;
    $(metrics).each(function (index, item) {
        _html += '<option value="' + item.Id + '" ' + (metric == item.name ? 'selected' : '') + '>' + item.name + '</option>';
    });

    _html += '</select>' +
        '</div>' +
        '</div>';

    if (type == 'Table' || type == 'Timeline') {
        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-secondarymetric">Secondary Metric</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-secondarymetric">' +
            '<option value="-1">Please select</option>';

        var metrics = jarvis.objects.Metrics;
        $(metrics).each(function (index, item) {
            _html += '<option value="' + item.Id + '" ' + (secondaryMetric == item.name ? 'selected' : '') + '>' + item.name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';
    }

    if (type == 'Table') {
        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-limit">Show a Table with</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-limit">' +
            '<option value=5>5 rows</option>' +
            '<option value=6>6 rows</option>' +
            '<option value=7>7 rows</option>' +
            '<option value=8>8 rows</option>' +
            '<option value=9>9 rows</option>' +
            '<option value=10 selected>10 rows</option>' +
            '</select>' +
            '</div>' +
            '</div>';
    }

    if (type == 'Pie Chart') {
        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-limit">Show up to</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-limit">' +
            '<option value=3>3 slices</option>' +
            '<option value=4>4 slices</option>' +
            '<option value=5>5 slices</option>' +
            '<option value=6 selected>6 slices</option>' +
            '</select>' +
            '</div>' +
            '</div>';
    }

    return _html;
};

jarvis.visualisation.dashboard.Panel.prototype.showEditWidget = function (options) {
    var _this = options._this;
    var $container = $(options.container);
    var addnew = options.addNew;
    var widgetID = -1;

    var column = -1;
    var ordinal = -1;

    var widgetType = 'Table';

    var _html = '';
    _html += '';
    _html += '<div class="widget-modal modal" style="left:50%;">';
    _html += '<div class="modal-header">';
    _html += '<a type="button" class="close" data-dismiss="modal">×</a>';

    if (options.addNew == true) {
        _html += '<h3>Add a new Dashboard Widget</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-name">Caption</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-type">Type</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-type">' +
            '<option value="Metric Box" ' + (widgetType == 'Metric Box' ? 'selected' : '') + '>Metric Box</option>' +
            '<option value="Table" ' + (widgetType == 'Table' ? 'selected' : '') + '>Table</option>' +
            '<option value="Pie Chart" ' + (widgetType == 'Pie Chart' ? 'selected' : '') + '>Pie Chart</option>' +
            '<option value="Timeline" ' + (widgetType == 'Timeline' ? 'selected' : '') + '>Timeline</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr>';

        _html += '<div class="specificsettings">';

        _html += _this.generateSettings(widgetType, null);

        _html += '</div>';

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>';
    }
    else {
        widgetID = options.widgetID;
        var widget = jarvis.dataaccess.getDashboardWidget(widgetID);
        widgetType = widget.Type;

        try {
            column = widget.Column;
            ordinal = widget.Ordinal;
        }
        catch (ex) {
            column = -1;
            ordinal = -1;
        }
        _html += '<h3>Widget Settings</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-name">Caption</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget" value="' + widget.name + '">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-type">Type</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-type">' +
            '<option value="Metric Box" ' + (widgetType == 'Metric Box' ? 'selected' : '') + '>Metric Box</option>' +
            '<option value="Table" ' + (widgetType == 'Table' ? 'selected' : '') + '>Table</option>' +
            '<option value="Pie Chart" ' + (widgetType == 'Pie Chart' ? 'selected' : '') + '>Pie Chart</option>' +
            '<option value="Timeline" ' + (widgetType == 'Timeline' ? 'selected' : '') + '>Timeline</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr >';

        _html += '<div class="specificsettings">';

        _html += _this.generateSettings(widgetType, widget);

        _html += '</div>';

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="widget-edit-delete" style="cursor:pointer;float:left;margin-top:5px;">Delete</a>';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>';
    }

    _html += '</div>';
    _html += '</div>';


    //draw the modal
    var $modal = $(_html);

    $modal.find('#widget-edit-type').off('change');
    $modal.find('#widget-edit-type').on('change', function (e) {
        $modal.find('.specificsettings').html(_this.generateSettings($modal.find('#widget-edit-type').val(), widget));
    });

    $('body').append($modal);
    $modal.modal();

    $modal.find('.widget-edit-delete').off('click');
    $modal.find('.widget-edit-delete').on('click', function (e) {
        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/DeleteWidget', {ID: widgetID}, function (sender, data, error) {
            jarvis.objects.Dashboards.Get(null, {id: _this.panelID}, null, true);
            data = $.parseJSON(data.data);

            //_this.panelID = _this.getDefaultPanel();
            //_this.init(null, null, true);

            var sender = options.sender;
            var container = options.sendercontainer;

            $(container).remove();

            $modal.modal('hide')
        });
    });

    $modal.find('.widget-edit-save').off('click');
    $modal.find('.widget-edit-save').on('click', function (e) {
        var name = '';
        var type = 'Table';
        var dimension = '';
        var dimension_name = '';
        var metric = '';
        var metric_name = '';
        var secondary_metric = '';
        var secondary_metric_name = '';
        var limit = 5;

        name = $modal.find('#widget-edit-name').val();
        type = $modal.find('#widget-edit-type').val();
        dimension = $modal.find('#widget-edit-dimension').val();
        dimension_name = $modal.find('#widget-edit-dimension option:selected').text();
        metric = $modal.find('#widget-edit-metric').val();
        metric_name = $modal.find('#widget-edit-metric option:selected').text();
        secondary_metric = $modal.find('#widget-edit-secondarymetric').val();
        secondary_metric_name = $modal.find('#widget-edit-secondarymetric option:selected').text();
        limit = $modal.find('#widget-edit-limit').val();

        if (typeof dimension == 'undefined') {
            dimension = -1;
            dimension_name = '';
        }
        if (typeof secondary_metric == 'undefined') {
            secondary_metric = -1;
            secondary_metric_name = '';
        }


        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/UpdateWidget', {PanelID: _this.panelID, ID: widgetID, Name: name, Type: type, Dimension: dimension, Metric: metric, SecondaryMetric: secondary_metric, Limit: limit, Column: column, Ordinal: ordinal }, function (sender, data, error) {
            jarvis.objects.Dashboards.Get(null, {id: _this.panelID}, null, true);
            data = $.parseJSON(data.data);

            //var matchedContainers = $('.jarvis.container.realtime');
            //options = new Object();

            //_this.panelID = data;
            //_this.init(null,null,true);

            if (options.addNew) {
                if (secondary_metric > -1)
                    metric_name += ', ' + secondary_metric_name;

                if (type == 'Table')
                    _html = '<div class="jarvis dashboard jtable widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>';
                if (type == 'Metric Box')
                    _html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>';
                if (type == 'Pie Chart')
                    _html = '<div class="jarvis dashboard pie widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>';
                if (type == 'Timeline')
                    _html = '<div class="jarvis dashboard timeline widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>';

                _html = $(_html);
                $('.jarvis.dashboard.column-left').html($('.jarvis.dashboard.column-left')
                    .html()
                    .replace('&nbsp;', ''));
                $('.jarvis.dashboard.column-left').prepend(_html);
                $('.jarvis.dashboard.column-left').prepend('&nbsp;');
                if (type == 'Table') {
                    new jarvis.visualisation.dashboard.Table().init(null, _html);
                }
                if (type == 'Metric Box') {
                    new jarvis.visualisation.dashboard.MetricBox().init(null, _html);
                }
                if (type == 'Pie Chart') {
                    new jarvis.visualisation.dashboard.Pie().init(null, _html);
                }
                if (type == 'Timeline') {
                    new jarvis.visualisation.dashboard.Timeline().init(null, _html);
                }

            }
            else {
                var sender = options.sender;
                var container = options.sendercontainer;

                $(container).attr('data-title', name);
                $(container).attr('data-dimensions', dimension_name);
                $(container).attr('data-metrics', metric_name);
                $(container).attr('data-limit', limit);

                $(container).removeClass('pie');
                $(container).removeClass('jtable');
                $(container).removeClass('timeline');
                $(container).removeClass('metricbox');

                if (type == 'Table')
                    $(container).addClass('jtable');
                if (type == 'Metric Box')
                    $(container).addClass('metricbox');
                if (type == 'Pie Chart')
                    $(container).addClass('pie');
                if (type == 'Timeline')
                    $(container).addClass('timeline');

                if (type == 'Table') {
                    new jarvis.visualisation.dashboard.Table().init(null, container);
                }
                if (type == 'Metric Box') {
                    new jarvis.visualisation.dashboard.MetricBox().init(null, container);
                }
                if (type == 'Pie Chart') {
                    new jarvis.visualisation.dashboard.Pie().init(null, container);
                }
                if (type == 'Timeline') {
                    new jarvis.visualisation.dashboard.Timeline().init(null, container);
                }
            }


            $modal.modal('hide')
        });
    });

    //remove when done
    $modal.on('hidden', function () {
        $modal.remove();
    })
};
jarvis.debug.log('INFO', 'Dashboard.Visualisation.Panel', 6, 'JS source loaded');
/*
 var dashboardPanel = new jarvis.visualisation.dashboard.Panel();
 $(document).ready(function (e) {
 if (jarvis.state.view == 'dashboard') {

 var options = {panelID:jarvis.state.dashboardID};
 dashboardPanel.init(options, null, true, true, false);
 }
 });*/