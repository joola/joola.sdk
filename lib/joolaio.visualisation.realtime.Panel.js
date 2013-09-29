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


joolaio.provide('joolaio.visualisation.realtime.Panel');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.realtime');
joolaio.require('joolaio.visualisation.realtime');


joolaio.visualisation.realtime.Panel = function (options) {
    //console.log('new panel');
    var start = new Date().getMilliseconds();

    joolaio.setRealtimePanel(this);

    var _this = this;
    this._this = this;
    this.options = options;

    //this.panelID = -1;

    try {
        this.panelID = options.panelID;
    }
    catch (e) {
        try{
        this.panelID = joolaio.dataaccess.realtimepanels[0].ID; //this.getDefaultPanel();
        }
        catch(e){
            this.panelID = -1;
        }
    }

    this.containers = [];

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    matchedContainers = $('.joolaio.realtime.widgets');
    if (matchedContainers.length > 0) {
        joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Panel', 6, 'Building Initial Panel (\'' + this.id + '\')');

        var $editbutton = $('body').find('.panel-edit');
        $editbutton.off('click');
        $editbutton.on('click', function (e) {
            _this.showEdit({container:matchedContainers, addNew:false, _this:_this});
        });

        var $addwidgetbutton = $('body').find('.widget-add');
        $addwidgetbutton.off('click');
        $addwidgetbutton.on('click', function (e) {
            _this.showEditWidget({container:matchedContainers, addNew:true, _this:_this});
        });
    }

    var $addwidgetbutton = $('body').find('.widget-add');
    $addwidgetbutton.show();

    $(joolaio).unbind('realtimepanelchange');
    $(joolaio).bind('realtimepanelchange', function (e, panelID) {
        _this.panelID = panelID;
        matchedContainers = $('.joolaio.realtime.widgets');

        var $editbutton = $('body').find('.panel-edit');
        $editbutton.off('click');
        $editbutton.on('click', function (e) {
            _this.showEdit({container:matchedContainers, addNew:false, _this:_this});
        });

        var $addwidgetbutton = $('body').find('.widget-add');
        $addwidgetbutton.off('click');
        $addwidgetbutton.on('click', function (e) {
            _this.showEditWidget({container:matchedContainers, addNew:true, _this:_this});
        });

        _this.setDisplay();

        _this.init(_this, matchedContainers, true, true,false);
        _this.drawWidgets(_this, $('.joolaio.realtime.widgets'), true, true);

        joolaio.state.view = 'realtime';
        joolaio.state.panelID = _this.panelID;
        joolaio.saveState('Realtime Panel Click');
    });

    //_this.setDisplay();

    this.container = matchedContainers;
    joolaio.visualisation.realtime.panel = this;

    joolaio.visualisation.realtime.start();

    joolaio.objects.RealtimePanels.List();
    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Panel', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.Panel.prototype.init = function (options, container, drawWidgets, breakBindLoop, saveState) {
    //console.log('init panel');
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Panel', 6, 'Building panel for ID (\'' + this.panelID + '\')');

    var _this = this;
    try {
        if (options.panelID > -1)
            this.panelID = options.panelID;
        else if (this.panelID == -1)
            this.panelID = options.panelID;
    }
    catch (e) {
        if (this.panelID == -1)
        this.panelID = joolaio.objects.RealtimePanels[0].ID; //this.getDefaultPanel();
    }

    _this.setDisplay();

    //turn on realtime comet
    joolaio.visualisation.realtime.start();
    if (typeof saveState == 'undefined' || saveState == true) {
        joolaio.state.view = 'realtime';
        joolaio.state.panelID = _this.panelID;
        joolaio.saveState('Realtime Panel Init');
    }

    try {
        if (this.panelID == -1)
            this.panelID = options.panelID;
    }
    catch (e) {
        this.panelID = joolaio.objects.RealtimePanels[0].ID; //this.getDefaultPanel();
    }

    //console.log(this.panelID);

    _this.panel = _this.get(_this, _this.panelID);
    if (!this.panel)
        return;

    //console.log(_this.panel);

    if (!breakBindLoop) {
        joolaio.visualisation.realtime.panelFilter = _this.panel.Segment;
        joolaio.visualisation.realtime.processFilter();
    }
    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.widgets');
    if (matchedContainers.length == 0)
        return;

    //console.log('test');

    $(matchedContainers).each(function (index, item) {
        if (options == null)
            options = new Object();

        options.panelID = _this.panelID;
        options.container = item;
        options._this = _this;
        _this.updateDisplay(options);
        //_this.drawWidgets(_this, item, drawWidgets);
        _this.drawWidgets(_this, item, true);
        $(joolaio.realtime).unbind('filterchange');;
        $(joolaio.realtime).bind('filterchange', function (e) {
            //console.log('filter change');
            //if (!breakBindLoop) {
                joolaio.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'Applying Filter');
                $(joolaio.visualisation.realtime.subscribers).each(function (index, item) {
                    joolaio.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'Unsubscribing \'' + _this.key + '\'');
                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        key:this.key
                    };
                    joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/unsubscribe', queryOptions, function () {
                    });
                });
                joolaio.visualisation.realtime.subscribers = [];

                _this.init(_this, item, true, true);
                //_this.drawWidgets(_this, $('.joolaio.container.realtime'), true);
            //}
        });

        joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Panel', 6, 'Applying to container (\'' + this.id + '\')');
    });
};

joolaio.visualisation.realtime.Panel.prototype.setDisplay = function () {
    //console.log('set display');
    /*
    $('body').find('.homepage').hide();
    $('.joolaio.container').show();
    $('body').find('.joolaio.report.panel').hide();
    $($('body').find('.joolaio.report.panel')).find('.timeline').empty();
    $($('body').find('.joolaio.report.panel')).find('.metricbox').empty();
    $($('body').find('.joolaio.report.panel')).find('.jtable').empty();
    $('body').find('.joolaio.dashboard.panel').hide();
    $($('body').find('.joolaio.dashboard.panel')).find('.widgets').empty();
    $('body').find('.joolaio.picker.datebox').hide();
    $('.joolaio.realtime.panel').show();
    */
}

joolaio.visualisation.realtime.Panel.prototype.drawWidgets = function (sender, container, redraw) {

    //console.log('draw widgets');

    var _this = sender;
    var panel = _this.panel;
    var widgets = panel.Widgets;

    //console.log(container);

    var _html = '';
    //preapre the container with the columns
    //$(container).find('.joolaio.realtime.widgets').empty();
    $(container).empty();
    _html = '<div class="joolaio realtime row-top row fluid-row">&nbsp;' +
        '</div>';

    _html += '<div class="row fluid-row">' +
        '<div class="joolaio realtime column-left span4 columns ">&nbsp;' +
        '</div>' +
        '<div class="joolaio realtime column-right span8 columns">&nbsp;' +
        '</div>' +
        '</div>';

    $(container).append(_html);


    $('.joolaio.realtime.column-left, .joolaio.realtime.column-right').sortable({
        connectWith:".columns",
        handle:'.header .move',
        placeholder:{
            element:function (currentItem) {
                return $('<div class="droptarget">' + $(currentItem).attr('data-title') + '</div>')[0];
            },
            update:function (container, p) {


                return;
            }
        },
        update:function (e, p) {
            var parent = 1;
            if ($(this).attr('class').indexOf('left') > -1)
                parent = 1;
            else
                parent = 2;

            $(this).children().each(function (i) {
                //var li = $(this);
                //newOrder += " " + li.attr("data-widgetid") + '=' + i + '&';
                var widgetID = $(this).attr("data-widgetid");
                joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/UpdateWidgetPosition', {ID:widgetID, Column:parent, Ordinal:i + 1 }, function (sender, data, error) {
                    data = $.parseJSON(data.data);
                });
            });
        },
        stop:function (event, ui) {

        }
    }).disableSelection();


    //populate widgets
    $(widgets).each(function (index, item) {
        joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Panel', 6, 'Drawing widget (\'' + item.Name + '\')');

        switch (item.Type) {
            case 'Realtime Timeline':
                _html = '<div class="span3 columns maincounter">' +
                    '<div id="metricbox" class="joolaio realtime metricbox" data-metrics="' + item.PrimaryMetric.Name + '"></div>' +
                    '</div>' +
                    '<div class="span9 columns">' +
                    '<div id="timeline" class="joolaio realtime timeline" data-metrics="' + item.PrimaryMetric.Name + '"></div>' +
                    '</div>';
                $(container).find('.row-top').append(_html);
                break;
            case 'Realtime Table':
                if (item.Column == 1) {
                    _html = '<div class="joolaio realtime table" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-left').append(_html);
                }
                else {
                    _html = '<div  class="joolaio realtime table" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }
                break;
            case "Realtime GeoChart":
                if (item.Column == 1) {
                    _html = '<div class="joolaio realtime geo" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-left').append(_html);
                }
                else {
                    _html = '<div  class="joolaio realtime geo" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
                    $(container).find('.column-right').append(_html);
                }
            default:

                break;
        }
    });

    if (redraw == true) {
        //console.log('true');
        //console.log(new joolaio.realtime.visualisation.MetricBox());
        new joolaio.visualisation.realtime.MetricBox().init();
        new joolaio.visualisation.realtime.Timeline().init();
        new joolaio.visualisation.realtime.Table().init();
    }
};
/*
 joolaio.visualisation.realtime.Panel.prototype.list = function (container) {
 joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/list', null, function (sender, data, error) {
 data = $.parseJSON(data.data);

 $(container).empty();
 $(data).each(function (index, item) {

 if (sender.panelID == -1)
 sender.panelID = item.ID;

 var $item = $('<li><a href="#' + item.ID + '">' + item.Name + '</a></li>');
 $item.off('click');
 $item.on('click', function (e) {

 console.log(sender.panel);
 $('body').removeClass(sender.panel.Name);

 joolaio.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'Switching Panel');
 $(joolaio.realtime.subscribers).each(function (index, item) {
 joolaio.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'Unsubscribing \'' + this.key + '\'');
 var client_id = PokeIn.GetClientId();
 var queryOptions = {
 ClientID:client_id,
 key:this.key
 };
 joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/unsubscribe', queryOptions, function () {
 });
 });
 joolaio.realtime.subscribers = [];

 //joolaio.realtime.paused = false;

 sender.panelID = item.ID;
 joolaio.realtime.panelFilter = item.Segment;
 joolaio.realtime.processFilter();
 //sender.init(null, null, true, true);
 //sender.drawWidgets(sender, $('.joolaio.container.realtime'), true);
 });
 $(container).append($item);
 });
 $(container).append('<li class="divider"></li>');
 var $item = $('<li class="add-panel"><a href="#">+ Add Panel</a></li>');
 $item.off('click');
 $item.on('click', function (e) {
 var matchedContainers = $('.joolaio.container.realtime');
 sender._this.showEdit({container:matchedContainers, addNew:true, _this:sender._this});
 });
 $(container).append($item);
 });

 };
 */
joolaio.visualisation.realtime.Panel.prototype.get = function (sender, id) {
    if (id == -1)
        return;
    //var data = joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/get', {id:id}, null);
    //data = $.parseJSON(data.data);

    var data = joolaio.objects.RealtimePanels[0];

    sender.panelID = data.ID

    return data;
};

joolaio.visualisation.realtime.Panel.prototype.getDefaultPanel = function (container) {
    //var data = joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/list', null, null);
    //data = $.parseJSON(data.data);

    var data = joolaio.objects.RealtimePanels;
    data = data[0].ID;

    return data;
};

joolaio.visualisation.realtime.Panel.prototype.updateDisplay = function (options) {
    //joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/get', {id:options.panelID}, function (sender, data, error) {
    //data = $.parseJSON(data.data);
//console.log(options);
//    console.log('updatedisplay');

    var $container = $(options.container);
    var data = options._this.panel;
    $('body').find('.joolaio.caption').text(data.Name);
    $('body').find('.joolaio.description').text(data.Description);
    //});


    if ($('body').attr('class')) {
        if (!$('body').attr('class').indexOf(data.Name))
            $('body').addClass(data.Name);
    }
    else
        $('body').addClass(data.Name);
    // var $panellist = $('.joolaio.realtime.container').find('.panel-list');
    // if ($panellist) {
    //     options._this.list($panellist);
    // }

};

joolaio.visualisation.realtime.Panel.prototype.showEdit = function (options) {
    var _this = options._this;
    var $container = $(options.container);
    var addnew = options.addNew;

    var _html = '';
    _html += '';
    _html += '<div class="panel-modal modal" style="left:50%;">';
    _html += '<div class="modal-header">';
    _html += '<button type="button" class="close" data-dismiss="modal">×</button>';

    if (options.addNew == true) {
        _html += '<h3>Add a new Realtime Panel</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-name">Name</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="panel-edit-name" placeholder="Enter a name for the new Realtime Panel">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-description">Description</label>' +
            '<div class="controls">' +
            '<textarea class="input-xlarge" id="panel-edit-description" rows="3" placeholder="Describe the new Realtime Panel with a few words."></textarea>' +
            '</div>' +
            '</div>';


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

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>';
    }
    else {
        var panel = _this.panel;
        _html += '<h3>Customize Realtime Panel</h3>';
        _html += '</div>';
        _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';

        _html += '<form class="form-horizontal">';
        _html += '<fieldset>';
        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-name">Name</label>' +
            '<div class="controls">' +
            '<input type="text" class="input-xlarge" id="panel-edit-name" value="' + panel.Name + '">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="panel-edit-description">Description</label>' +
            '<div class="controls">' +
            '<textarea class="input-xlarge" id="panel-edit-description" rows="3">' + panel.Description + '</textarea>' +
            '</div>' +
            '</div>';


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

        _html += '</fieldset>';
        _html += '</form>';

        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="panel-edit-delete" style="float:left;margin-top:5px;">Delete</a>';
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
        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Delete', {ID:_this.panelID}, function (sender, data, error) {
            data = $.parseJSON(data.data);

            joolaio.dataaccess.listRealtimePanels(true);
            _this.panelID = -1; //_this.getDefaultPanel();
            _this.init(null, null, true);

            $modal.modal('hide')
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

        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Update', {ID:panelID, Name:name, Description:description}, function (sender, data, error) {
            data = $.parseJSON(data.data);

            var matchedContainers = $('.joolaio.realtime.widgets');
            options = new Object();

            _this.panelID = data;
            //console.log(_this.panelID);
            _this.init(null, matchedContainers, true);
            joolaio.dataaccess.listRealtimePanels(true);
            $modal.modal('hide')
        });
    });

    //remove when done
    $modal.on('hidden', function () {
        $modal.remove();
    })
};

joolaio.visualisation.realtime.Panel.prototype.showEditWidget = function (options) {
    var _this = options._this;
    var $container = $(options.container);
    var addnew = options.addNew;
    var widgetID = -1;

    var column = -1;
    var ordinal = -1;

    var _html = '';
    _html += '';
    _html += '<div class="widget-modal modal" style="left:50%;">';
    _html += '<div class="modal-header">';
    _html += '<button type="button" class="close" data-dismiss="modal">×</button>';

    if (options.addNew == true) {
        _html += '<h3>Add a new Widget</h3>';
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
            '<option value=1>Table</option>' +
            '<!--<option value=2>GeoMap</option>-->' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr >';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Dimension</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-dimension">';

        var dimensions = joolaio.dataaccess.dimensions;
        $(dimensions).each(function (index, item) {
            _html += '<option value="' + item.Id + '">' + item.Name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Metric</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-metric">';

        var metrics = joolaio.dataaccess.metrics;
        $(metrics).each(function (index, item) {
            _html += '<option value="' + item.Id + '">' + item.Name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr >';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Show a Table with</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-limit">' +
            '<option value=3>3 rows</option>' +
            '<option value=5>5 rows</option>' +
            '<option value=10>10 rows</option>' +
            '<option value=20>20 rows</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Interval</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-interval">' +
            '<option value=1>1 sec</option>' +
            '<option value=3 selected>3 sec</option>' +
            '<option value=5>5 sec</option>' +
            '<option value=10>10 sec</option>' +
            '<option value=30>30 sec</option>' +
            '<option value=60>60 sec</option>' +
            '</select>' +
            '<p class="help-block">The number of seconds between each Refresh.</p>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-period">Period</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-period">' +
            '<option value=1>1 sec</option>' +
            '<option value=3 selected>3 sec</option>' +
            '<option value=5>5 sec</option>' +
            '<option value=10>10 sec</option>' +
            '<option value=30>30 sec</option>' +
            '<option value=60>60 sec</option>' +
            '</select>' +
            '<p class="help-block">The time Period to be queried every Interval.</p>' +
            '</div>' +
            '</div>';

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>';
    }
    else {
        widgetID = options.widgetID;
        var widget = joolaio.dataaccess.getWidget(widgetID);

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
            '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget" value="' + widget.Name + '">' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-type">Type</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-type">' +
            '<option value=1>Table</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr >';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Dimension</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-dimension">';

        var dimensions = joolaio.dataaccess.dimensions;
        $(dimensions).each(function (index, item) {
            _html += '<option value="' + item.Id + '" ' + (item.Id == widget.Dimension.Id ? 'selected' : '') + '>' + item.Name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Metric</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-metric">';

        var metrics = joolaio.dataaccess.metrics;
        $(metrics).each(function (index, item) {
            _html += '<option value="' + item.Id + '" ' + (item.Id == widget.PrimaryMetric.Id ? 'selected' : '') + '>' + item.Name + '</option>';
        });

        _html += '</select>' +
            '</div>' +
            '</div>';

        _html += '<hr >';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Show a Table with</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-limit">' +
            '<option value="3" ' + (widget.itemCount == 3 ? 'selected' : '') + '>3 rows</option>' +
            '<option value="5" ' + (widget.itemCount == 5 ? 'selected' : '') + '>5 rows</option>' +
            '<option value="10" ' + (widget.itemCount == 10 ? 'selected' : '') + '>10 rows</option>' +
            '<option value="20" ' + (widget.itemCount == 20 ? 'selected' : '') + '>20 rows</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-interval">Interval</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-interval">' +
            '<option value="1" ' + (widget.Interval == 1 ? 'selected' : '') + '>1 sec</option>' +
            '<option value="3" ' + (widget.Interval == 3 ? 'selected' : '') + '>3 sec</option>' +
            '<option value="5" ' + (widget.Interval == 5 ? 'selected' : '') + '>5 sec</option>' +
            '<option value="10" ' + (widget.Interval == 10 ? 'selected' : '') + '>10 sec</option>' +
            '<option value="30" ' + (widget.Interval == 30 ? 'selected' : '') + '>30 sec</option>' +
            '<option value="60" ' + (widget.Interval == 60 ? 'selected' : '') + '>60 sec</option>' +
            '</select>' +
            '<p class="help-block">The number of seconds between each Refresh.</p>' +
            '</div>' +
            '</div>';

        _html += '<div class="control-group">' +
            '<label class="control-label" for="widget-edit-period">Period</label>' +
            '<div class="controls">' +
            '<select id="widget-edit-period">' +
            '<option value="1" ' + (widget.Period == 1 ? 'selected' : '') + '>1 sec</option>' +
            '<option value="3" ' + (widget.Period == 3 ? 'selected' : '') + '>3 sec</option>' +
            '<option value="5" ' + (widget.Period == 5 ? 'selected' : '') + '>5 sec</option>' +
            '<option value="10" ' + (widget.Period == 10 ? 'selected' : '') + '>10 sec</option>' +
            '<option value="30" ' + (widget.Period == 30 ? 'selected' : '') + '>30 sec</option>' +
            '<option value="60" ' + (widget.Period == 60 ? 'selected' : '') + '>60 sec</option>' +
            '</select>' +
            '<p class="help-block">The time Period to be queried every Interval.</p>' +
            '</div>' +
            '</div>';

        _html += '</fieldset>';
        _html += '</form>';
        _html += '</div>';
        _html += '<div class="modal-footer">';
        _html += '<a class="widget-edit-delete" style="float:left;margin-top:5px;">Delete</a>';
        _html += '<a class="btn" data-dismiss="modal">Close</a>';
        _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>';
    }

    _html += '</div>';
    _html += '</div>';


    //draw the modal
    var $modal = $(_html);
    $('body').append($modal);
    $modal.modal();

    $modal.find('.widget-edit-delete').off('click');
    $modal.find('.widget-edit-delete').on('click', function (e) {
        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/DeleteWidget', {ID:widgetID}, function (sender, data, error) {
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
        var type = 1;
        var dimension = '';
        var dimension_name = '';
        var metric = '';
        var metric_name = '';
        var interval = 3;
        var period = 3;
        var limit = 5;


        name = $modal.find('#widget-edit-name').val();
        type = $modal.find('#widget-edit-type').val();
        dimension = $modal.find('#widget-edit-dimension').val();
        dimension_name = $modal.find('#widget-edit-dimension option:selected').text();
        metric = $modal.find('#widget-edit-metric').val();
        metric_name = $modal.find('#widget-edit-metric option:selected').text();
        interval = $modal.find('#widget-edit-interval').val();
        period = $modal.find('#widget-edit-period').val();
        limit = $modal.find('#widget-edit-limit').val();

        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/UpdateWidget', {panelID:_this.panelID, ID:widgetID, Name:name, Type:type, Dimension:dimension, Metric:metric, Interval:interval, Period:period, Limit:limit, Column:column, Ordinal:ordinal }, function (sender, data, error) {
            data = $.parseJSON(data.data);

            //var matchedContainers = $('.joolaio.container.realtime');
            //options = new Object();

            //_this.panelID = data;
            //_this.init(null,null,true);

            if (options.addNew) {
                _html = '<div class="joolaio realtime table" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '"data-period="' + period + '" data-limit="' + limit + '"></div>';
                _html = $(_html);
                $('.joolaio.realtime.panel').find('.column-left').prepend(_html);

                var t = new joolaio.visualisation.realtime.Table();
                t.init(null, _html);
                if (joolaio.visualisation.realtime.paused)
                    t.processFetch(t, joolaio.visualisation.realtime.pausedTime, _html, dimension_name, metric_name, limit);

            }
            else {
                var sender = options.sender;
                var container = options.sendercontainer;
                $(container).attr('data-title', name);
                $(container).attr('data-dimensions', dimension_name);
                $(container).attr('data-metrics', metric_name);
                $(container).attr('data-period', period);
                $(container).attr('data-limit', limit);
                sender.init(null, container);
                if (joolaio.visualisation.realtime.paused)
                    sender.processFetch(sender, joolaio.visualisation.realtime.pausedTime, container, dimension_name, metric_name, limit);

            }


            $modal.modal('hide')
        });
    });

    //remove when done
    $modal.on('hidden', function () {
        $modal.remove();
    })
};
joolaio.debug.log('INFO', 'Realtime.Visualisation.RealtimePanel', 6, 'JS source loaded');
/*
var realtimePanel = new joolaio.visualisation.realtime.Panel();
$(document).ready(function (e) {
    if (joolaio.state.view == 'realtime'){

        var options = {panelID:joolaio.state.panelID};
        realtimePanel.init(options, null, true, true, false);
    }
})

*/