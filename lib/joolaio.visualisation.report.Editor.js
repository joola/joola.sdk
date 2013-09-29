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


joolaio.provide('joolaio.visualisation.report.editor');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.report');
joolaio.require('joolaio.visualisation.report');


joolaio.visualisation.report.Editor = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;
    this.options = options;
    this.container = null;
    this.ordinal = 1;
    this.newordinal = -1;

    this.defaultTab =
    {
        id:-1,
        ordinal:1,
        active:true,
        title:'Report Tab',
        type:'explorer',
        mgroups:[
            {
                id:-1,
                title:'New metric group',
                metrics:[]}
        ],
        dimensions:[]
    };


    this.state = new Object();
    this.state.report = {
        id:-1,
        title:'',
        description:'',
        tabs:[
            clone(_this.defaultTab)
        ],
        tabcount:1
    };


    joolaio.visualisation.report.editor = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.Editor.prototype.init = function (sender, options) {
    var _this = sender;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Building Editor for ID (\'' + _this.reportID + '\')');

    _this.container = options.container;
    _this.reportID = options.reportID;
    this.reportID = options.reportID;
    if (this.reportID > -1) {
        this.report = joolaio.objects.Reports.Get(_this, {id:_this.reportID});
    }
    else {
    }

    var $container = $('.joolaio._container');
    var $head = $('.jumbotron.subhead');
    var $panel = $('.joolaio._container .joolaio.report.panel');
    $head.hide();
    $panel.hide();


    $('.report.editor').remove();
    var $editor = $('<div class="report editor"></div>');
    $container.append($editor);

    //// Buttons /////
    var $wrapper_buttons = $('<form class="form-horizontal wrapper_buttons" style="margin-left:50px;"></form>');
    var $buttons = $('<div class="control-group"></div>');
    $buttons.append('<label class="control-label" for=""></label><div class="controls"></div>');
    var $btn_submit = $('<a class="btn save">Save</a>');
    var $btn_cancel = $('<a class="btn cancel">Cancel</a>');
    var $btn_delete = $('<a class="btn delete">Delete</a>');

    $btn_cancel.off('click');
    $btn_cancel.on('click', function (e) {
        joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Cancelling.');
        if (_this.reportID == -1) {
            location.href = '/';
        }
        else {
            $editor.remove();
            $head.show();
            $panel.show();
            $(joolaio).trigger('reportchange', _this.reportID);
        }
    });

    $btn_submit.off('click');
    $btn_submit.on('click', function (e) {
        e.stopPropagation();
        _this.Save(_this, options);
    });

    $btn_delete.off('click');
    $btn_delete.on('click', function (e) {
        e.stopPropagation();
        _this.Delete(_this, options);
    });

    $buttons.find('.controls').append($btn_submit);
    $buttons.find('.controls').append($btn_cancel);
    if (_this.reportID > -1)
        $buttons.find('.controls').append($btn_delete);
    $wrapper_buttons.append($buttons);

    //// End of Buttons /////

    //// Header ////
    var $caption = $('<header class="jumbotron subhead"></header>');
    if (_this.reportID == -1)
        $caption.append('<h1 class="joolaio caption">Custom Report</h1>');
    else
        $caption.append('<h1 class="joolaio caption">Edit Report</h1>');

    $caption.append('<p class="joolaio description lead">Use the editor below to customize your report.</p>');
    //// End of Header ////

    //// General ////

    var $general_header = $('<div class="header"><div class="sectiontitle">General Information</div></div> ')
    var $content_header = $('<div class="header"><div class="sectiontitle">Report Content</div></div> ')

    var $wrapper_general = $('<form class="form-horizontal"></form>');
    var $title = $('<div class="control-group wrapper_title"></div>');
    $title.append('<label class="control-label" for="">Title</label>');
    $title.append('<div class="controls"><input class="input_title input-xlarge" type="text" data-param="title" placeholder="Enter report name"></div>');

    var $description = $('<div class="control-group wrapper_title"></div>');
    $description.append('<label class="control-label" for="">Description</label>');
    $description.append('<div class="controls"><textarea class="input_description input-xlarge" data-param="description" placeholder="Enter report description"></textarea></div>');

    var $category = $('<div class="control-group wrapper_category"></div>');
    $category.append('<label class="control-label" for="">Category</label>');
    $category.append('<div class="controls"><select id="categories"></select></div>');

    var categories = joolaio.objects.Reports.GetCategories();
    categories = $.parseJSON(categories.data);
    $(categories).each(function (index, category) {
        //console.log(category);
        var $option = $('<option value="' + category.key + '">' + category.value + '</option>');
        $category.find('select').append($option);
    });


    $wrapper_general.append($title);
    $wrapper_general.append($description);
    $wrapper_general.append($category);


    //// End of General ////

    //// DRAW LAYOUT ////

    if (_this.reportID > -1) {
        _this.populateTabs(_this, options);
    }

    $editor.append($caption);

    $editor.append($general_header);
    $editor.append($wrapper_general);
    $editor.append($content_header);
    $editor.append(_this.buildTabs(_this, options));
    //$editor.append('<hr style="margin-top:30px;">');
    $editor.append($wrapper_buttons);

    if (_this.reportID > -1) {
        _this.populate(_this, options);
    }
    $('.simpleerror').css('visibility', 'hidden');
};

joolaio.visualisation.report.Editor.prototype.dispose = function () {
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Dispose');
    $('.simpleerror').css('visibility', 'visible');
}

joolaio.visualisation.report.Editor.prototype.populate = function (sender, options) {
    var _this = sender;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Populating Editor for ID (\'' + _this.reportID + '\')');

    //// General ////
    var $input_title = $('.input_title');
    $input_title.val(_this.report.Name);
    var $input_description = $('.input_description');
    $input_description.val(_this.report.Description);


    $('#categories').find('option').each(function (index, option) {
        var $option = $(option);
        if (_this.report.Category.Name == $option.text())
            $option.attr('selected', true);
    });
    //// End of General  ////
};

joolaio.visualisation.report.Editor.prototype.populateTabs = function (sender, options) {
    var _this = sender;

    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Populating Tabs for ID (\'' + _this.reportID + '\')');

    $(_this.report.Tabs).each(function (index, tab) {
        _this.state.report.tabs[index] = {
            id:tab.ID,
            ordinal:tab.Ordinal,
            active:false,
            title:tab.Name,
            type:tab.Type,
            mgroups:function () {
                var groups = [];

                $(tab.MetricGroups).each(function (index2, mg) {
                    groups.push({
                        id:mg.ID,
                        newgroup:false,
                        title:mg.Name,
                        metrics:function () {
                            var metrics = [];

                            $(mg.Metrics).each(function (index3, metric) {
                                metric.ordinal = index3;
                                metrics.push(metric);
                            });

                            return metrics;
                        }()
                    })
                });
                return groups;
            }(),
            dimensions:function () {
                var dimensions = [];

                $(tab.Dimensions).each(function (index, dimension) {
                    dimension.ordinal = index;
                    dimension.deleted = false;
                    dimensions.push(dimension);
                });
                return dimensions;
            }()
        }
    });

    _this.state.report.tabs[0].active = true;
}

joolaio.visualisation.report.Editor.prototype.buildTabs = function (sender, options) {
    var _this = sender;

    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Building Tabs for ID (\'' + _this.reportID + '\')');

    var $wrapper_tabs = $('<div class="wrapper_tabs"></div>');
    var $tabs = $('<ul class="nav nav-tabs"></ul>');
    $(_this.state.report.tabs).each(function (index, tab) {
        if (!tab.deleted) {
            var $tab = $('<li class="tab" data-id="' + tab.ordinal + '"><button type="button" class="close">&times;</button><a class="tabname">' + tab.title + '</a></li>');

            var $close = $($tab.find('.close'));
            $close.off('click');
            $close.on('click', function (e) {
                $(_this.state.report.tabs).each(function (index, itab) {
                    if (itab.ordinal == $tab.attr('data-id')) {
                        //_this.state.report.tabs.splice(index, 1);
                        itab.deleted = true;
                    }
                });
                var length = 0;
                $(_this.state.report.tabs).each(function (index, itab) {
                    if (!itab.deleted)
                        length++;
                });
                if (length == 0) {
                    _this.state.report.tabs.push(clone(_this.defaultTab));
                    _this.state.report.tabcount = 1;
                }
                else {
                    var bActive = false;
                    $(_this.state.report.tabs).each(function (index, item) {
                        if (item.active == true && item.deleted == false)
                            bActive = true;
                    });
                    if (!bActive)
                        _this.state.report.tabs[0].active = true;
                }

                _this.state.report.tabcount--;
                _this.buildTabs(_this, options);
            });

            $tab.off('click');
            $tab.on('click', function (e) {
                $tabs.find('.tab.active').removeClass('active');
                $tab.addClass('active');

                var tab;
                $(_this.state.report.tabs).each(function (index, itab) {
                    if (itab.ordinal == $tab.attr('data-id')) {
                        itab.active = true;
                        tab = itab;
                        //console.log(itab);
                    }
                    else {
                        itab.active = false;

                    }
                });

                $tabspace.attr('data-id', tab.ordinal);
                //console.log(tab);
                _this.buildTab(_this, {tab:$tabspace, type:tab.type});
            });

            if (tab.active)
                $tab.addClass('active');

            $tabs.append($tab);
        }
    });
    var $tabs_add = $('<li class="tab"><a class="addtab">+ add report tab</a></li>');
    $tabs_add.off('click');
    $tabs_add.on('click', function (e) {
        joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Adding tab');

        $(_this.state.report.tabs).each(function (i, o) {
            o.active = false;
        });

        var newTab = clone(_this.defaultTab);
        newTab.active = true;
        newTab.ordinal = _this.ordinal + 1;
        _this.state.report.tabs.push(newTab);
        _this.state.report.tabcount++;
        _this.ordinal++;

        _this.buildTabs(_this, options);
    });

    $tabs.append($tabs_add);

    var $tabspace = $('<div class="tab" data-id="1"></div>');

    $wrapper_tabs.append($tabs);
    $wrapper_tabs.append($tabspace);

    var $editor = $('.report.editor');
    if ($editor.find('.wrapper_buttons').length > 0) {
        var $buttons = $editor.find('.wrapper_buttons');

        $editor.find('.wrapper_tabs').remove();
        $buttons.before($wrapper_tabs);
    }
    else {
        $editor.find('.wrapper_tabs').remove();
        $editor.append($wrapper_tabs);
    }

    $tabs.find('.tab.active').click();
    //return $wrapper_tabs;
}

joolaio.visualisation.report.Editor.prototype.buildTab = function (sender, options) {
    var _this = sender;

    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Building Tab for ID (\'' + _this.reportID + '\')');

    var $editor = $('.report.editor');
    var $tab = $(options.tab);
    var tab_type = options.type;
//console.log(tab_type);
    var oTab;

    $(_this.state.report.tabs).each(function (index, tab) {
        if (tab.ordinal == $tab.attr('data-id')) {
            oTab = tab;
            oTab.type = tab_type;
        }
    });

    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Building tab for tab "' + oTab.ordinal + '"');

    $tab.empty();

    //// General ////
    var $tab_general = $('<form class="form-horizontal"></form>');
    var $title = $('<div class="control-group"></div>');
    $title.append('<label class="control-label" for="">Title</label>');
    $title.append('<div class="controls"><input class="input_tab_title input-large" type="text" data-param="title" placeholder="Enter tab name" value="' + oTab.title + '"></div>');

    var $input_title = $($title.find('.input_tab_title'));
    $input_title.off('keyup');
    $input_title.on('keyup', function (e) {
        oTab.title = $input_title.val()

        var $tabmenu = $($editor.find('li.tab[data-id="' + oTab.ordinal + '"]'));
        var $tabmenu_title = $($tabmenu.find('a'));

        $tabmenu_title.html(oTab.title);
    });

    var $type = $('<div class="control-group"></div>');
    $type.append('<label class="control-label" for="">Type</label>');
    $type.append('<div class="controls"><div class="btn-group" data-toggle="buttons-radio">' +
        '<a class="btn btn_type_explorer">Explorer</a>' +
        '<a class="btn btn_type_table">Table</a>' +
        '<a class="btn btn_type_histogram">Histogram</a>' +
        '<!--<a class="btn btn_type_geo">Geographical</a>-->' +
        '<a class="btn btn_type_overview">Overview</a>' +
        '</div></div>');

    $type.find('.btn.btn_type_explorer').off('click');
    $type.find('.btn.btn_type_explorer').on('click', function (e) {
        _this.buildTab(_this, {tab:$tab, type:'explorer'});
    });
    $type.find('.btn.btn_type_table').off('click');
    $type.find('.btn.btn_type_table').on('click', function (e) {
        _this.buildTab(_this, {tab:$tab, type:'table'});
    });
    $type.find('.btn.btn_type_geo').off('click');
    $type.find('.btn.btn_type_geo').on('click', function (e) {
        _this.buildTab(_this, {tab:$tab, type:'geo'});
    });
    $type.find('.btn.btn_type_overview').off('click');
    $type.find('.btn.btn_type_overview').on('click', function (e) {
        _this.buildTab(_this, {tab:$tab, type:'overview'});
    });
    $type.find('.btn.btn_type_histogram').off('click');
    $type.find('.btn.btn_type_histogram').on('click', function (e) {
        _this.buildTab(_this, {tab:$tab, type:'histogram'});
    });

    $type.find('.btn.btn_type_explorer').removeClass('active');
    $type.find('.btn.btn_type_table').removeClass('active');
    $type.find('.btn.btn_type_geo').removeClass('active');
    $type.find('.btn.btn_type_overview').removeClass('active');
    $type.find('.btn.btn_type_histogram').removeClass('active');

    //console.log(oTab.type);

    switch (oTab.type) {
        case 'explorer':
            $type.find('.btn.btn_type_explorer').addClass('active');
            break;
        case 'table':
            $type.find('.btn.btn_type_table').addClass('active');
            break;
        case 'geo':
            $type.find('.btn.btn_type_geo').addClass('active');
            break;
        case 'overview':
            $type.find('.btn.btn_type_overview').addClass('active');
            break;
        case 'histogram':
            $type.find('.btn.btn_type_histogram').addClass('active');
            break;
        default:
            break;
    }

    $tab_general.append($title);
    $tab_general.append($type);
    //// End of General ////

    $tab.append($tab_general);

    if (oTab.type == 'explorer') {
        var $metrics = $('<div class="control-group"></div>');
        $metrics.append('<label class="control-label" for="">Metric Groups</label>');
        $metrics.append('<div class="controls"></div>');

        $(oTab.mgroups).each(function (index, mgroup) {
            if (!mgroup.deleted) {
                var $mcontainer = $('<div class="joolaio jcontainer metrics"></div>');
                var o = new joolaio.visualisation.container.Metrics({
                    container:$mcontainer,
                    title:mgroup.title,
                    metrics:mgroup.metrics,
                    id:mgroup.id
                });
                $(o).bind('metric-added', function (e, name) {

                    var m = _.find(joolaio.objects.Metrics, function (metric) {
                        return metric.Name == name;
                    });
                    mgroup.metrics.push(m);
                });
                $(o).bind('metric-removed', function (e, name) {

                    $(mgroup.metrics).each(function (index, m) {
                        if (m.Name == name) {
                            m.deleted = true;
                        }
                        //mgroup.metrics.splice(index, 1);
                    });
                });
                $(o).bind('rename', function (e, name) {
                    mgroup.title = name;
                });
                $(o).bind('group-removed', function (e, id) {
                    oTab.mgroups[index].deleted = true;
                    $mcontainer.remove();
                });
                $(o).bind('metric-reorder', function (e, id) {
                    $mcontainer.find('.pickerwrapper[data-id]').each(function (i, o) {
                        $(mgroup.metrics).each(function (i2, o2) {
                            if (o2.Name == $(o).attr('data-id'))
                                o2.ordinal = i;
                        });
                    });
                    //$mcontainer.remove();
                });
                $metrics.find('.controls').append($mcontainer);
            }
        });

        var $add_mgroup = $('<div class="wrapper_add_metric"></div>');
        $add_mgroup.append('<a class="btn btn_addgroup">+ Add metric group</a>');
        $add_mgroup.find('.btn').off('click');
        $add_mgroup.find('.btn').on('click', function (e) {
            var mgroup = {
                id:_this.newordinal - 1,
                newgroup:true,
                title:'New metric group',
                metrics:[]
            };
            oTab.mgroups.push(mgroup);
            _this.newordinal--;

            var $mcontainer = $('<div class="joolaio jcontainer metrics"></div>');
            var o = new joolaio.visualisation.container.Metrics({
                container:$mcontainer,
                title:mgroup.title,
                metrics:mgroup.metrics,
                id:mgroup.id
            });
            $(o).bind('metric-added', function (e, name) {
                var m = _.find(joolaio.objects.Metrics, function (metric) {
                    return metric.Name == name;
                });
                mgroup.metrics.push(m);
            });
            $(o).bind('metric-removed', function (e, name) {
                $(mgroup.metrics).each(function (index, m) {
                    if (m.Name == name)
                        mgroup.metrics.splice(index, 1);
                });
            });
            $(o).bind('rename', function (e, name) {
                mgroup.title = name;
            });
            $(o).bind('group-removed', function (e, id) {
                $(oTab.mgroups).each(function (i, o) {
                    if (o.id == id)
                        oTab.mgroups.splice(i, 1);
                });

                $mcontainer.remove();
            });
            $add_mgroup.before($mcontainer);
        });

        $metrics.find('.controls').append($add_mgroup);

        $tab_general.append($metrics);

        var $dimensions = $('<div class="control-group"></div>');
        $dimensions.append('<label class="control-label" for="">Dimension Drilldowns</label>');
        $dimensions.append('<div class="controls"></div>');

        var $dcontainer = $('<div class="joolaio jcontainer dimensions"></div>');
        var o = new joolaio.visualisation.container.Dimensions({
            container:$dcontainer,
            limit:4,
            dimensions:oTab.dimensions
        });
        $(o).bind('dimension-added', function (e, name) {
            var d = _.find(joolaio.objects.Dimensions, function (dimension) {
                return dimension.Name == name;
            });
            oTab.dimensions.push(d);

            //oTab.dimensions.metrics.push(m);
        });
        $(o).bind('dimension-removed', function (e, name) {
            //console.log('removing',name);
            $(oTab.dimensions).each(function (i, o) {
                if (o.Name == name) {
                    //console.log('found',o)
                    //oTab.drilldowns.splice(i, 1);
                    o.deleted = true;
                }
            });
            /*
             $(mgroup.metrics).each(function (index, m) {
             if (m.Name == name)
             mgroup.metrics.splice(index, 1);
             });
             */
        });
        $(o).bind('dimension-reorder', function (e, id) {
            //console.log('test');
            $dcontainer.find('.pickerwrapper[data-id]').each(function (i, o) {
                $(oTab.dimensions).each(function (i2, o2) {
                    if (o2.Name == $(o).attr('data-id'))
                        o2.ordinal = i;
                });
            });
            //$mcontainer.remove();
        });

        $dimensions.find('.controls').append($dcontainer);
        $tab_general.append($dimensions);
    }
    else if (oTab.type == 'table' || oTab.type == 'overview' || oTab.type == 'histogram') {
        var $metrics = $('<div class="control-group"></div>');
        $metrics.append('<label class="control-label" for="">Metrics</label>');
        $metrics.append('<div class="controls"></div>');

        $(oTab.mgroups[0]).each(function (index, mgroup) {
            if (!mgroup.deleted) {
                var $mcontainer = $('<div class="joolaio jcontainer metrics"></div>');
                var o = new joolaio.visualisation.container.Metrics({
                    container:$mcontainer,
                    title:mgroup.title,
                    metrics:mgroup.metrics,
                    id:mgroup.id,
                    hidetitle:true
                });
                $(o).bind('metric-added', function (e, name) {

                    var m = _.find(joolaio.objects.Metrics, function (metric) {
                        return metric.Name == name;
                    });
                    mgroup.metrics.push(m);
                });
                $(o).bind('metric-removed', function (e, name) {

                    $(mgroup.metrics).each(function (index, m) {
                        if (m.Name == name) {
                            m.deleted = true;
                        }
                        //mgroup.metrics.splice(index, 1);
                    });
                });
                $(o).bind('rename', function (e, name) {
                    mgroup.title = name;
                });
                $(o).bind('group-removed', function (e, id) {
                    oTab.mgroups[index].deleted = true;
                    $mcontainer.remove();
                });
                $(o).bind('metric-reorder', function (e, id) {
                    $mcontainer.find('.pickerwrapper[data-id]').each(function (i, o) {
                        $(mgroup.metrics).each(function (i2, o2) {
                            if (o2.Name == $(o).attr('data-id'))
                                o2.ordinal = i;
                        });
                    });
                    //$mcontainer.remove();
                });
                $metrics.find('.controls').append($mcontainer);
            }
        });

        $tab_general.append($metrics);

        var $dimensions = $('<div class="control-group"></div>');
        $dimensions.append('<label class="control-label" for="">Dimensions</label>');
        $dimensions.append('<div class="controls"></div>');

        var $dcontainer = $('<div class="joolaio jcontainer dimensions fortable"></div>');
        var o = new joolaio.visualisation.container.Dimensions({
            container:$dcontainer,
            limit:4,
            dimensions:oTab.dimensions
        });
        $(o).bind('dimension-added', function (e, name) {
            var d = _.find(joolaio.objects.Dimensions, function (dimension) {
                return dimension.Name == name;
            });
            oTab.dimensions.push(d);

            //oTab.dimensions.metrics.push(m);
        });
        $(o).bind('dimension-removed', function (e, name) {
            //console.log('removing',name);
            $(oTab.dimensions).each(function (i, o) {
                if (o.Name == name) {
                    //console.log('found',o)
                    //oTab.drilldowns.splice(i, 1);
                    o.deleted = true;
                }
            });
            /*
             $(mgroup.metrics).each(function (index, m) {
             if (m.Name == name)
             mgroup.metrics.splice(index, 1);
             });
             */
        });
        $(o).bind('dimension-reorder', function (e, id) {
            //console.log('test');
            $dcontainer.find('.pickerwrapper[data-id]').each(function (i, o) {
                $(oTab.dimensions).each(function (i2, o2) {
                    if (o2.Name == $(o).attr('data-id'))
                        o2.ordinal = i;
                });
            });
            //$mcontainer.remove();
        });

        $dimensions.find('.controls').append($dcontainer);
        $tab_general.append($dimensions);
    }
    else if (oTab.type == 'geo') {

    }
    else if (oTab.type == 'overview') {

    }
    //console.log('test');
}

joolaio.visualisation.report.Editor.prototype.populateTab = function (sender, options) {
    var _this = sender;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Populating tab');
};

joolaio.visualisation.report.Editor.prototype.Delete = function (sender, options) {
    var _this = sender;
    joolaio.objects.Reports.Delete(_this, {id:_this.reportID});

    joolaio.objects.Reports.List(null, null, null, true);
    buildContentMenu_Reports();

    location.href = '/';
};

joolaio.visualisation.report.Editor.prototype.Save = function (sender, options, wetrun) {
    var _this = sender;

    $('.save-error').remove();

    try {
        $(_.filter(_this.state.report.tabs, function (item) {
            return !item.deletd;
        })).each(function (i, oTab) {
                var participatingdimensions = _.filter(oTab.dimensions, function (item) {
                    return !item.deleted;
                });
                participatingdimensions = _.sortBy(participatingdimensions, function (item) {
                    return item.ordinal;
                });
                $(participatingdimensions).each(function (i2, o2) {
                    //if (o2.Name == $(o).attr('data-id'))
                    o2.ordinal = i2;
                });
            });

        if (wetrun) {
            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Saving report');
        }
        else {

        }
        var name = $('.report.editor .input_title').val();
        if (name == '') {
            throw 'Report name is missing.';
        }
        var description = $('.report.editor .input_description').val();
        if (description == '') {
            throw 'Report description is missing.';
        }

        var category = $('#categories').val();

        if (wetrun) {
            if (_this.state.report.reportID == -1) {
                joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Adding new report "' + _this.state.report.title + '"');
            }

            var result = joolaio.objects.Reports.Set(_this, sender.reportID, 'name', name);
            //console.log(result);
            result = $.parseJSON(result.data);
            sender.reportID = result.ID;
            _this.state.report.ID = result.ID;
            _this.state.report.reportID = result.ID;
            joolaio.objects.Reports.Set(_this, sender.reportID, 'description', description);

            joolaio.objects.Reports.Set(_this, sender.reportID, 'category', category);

            //this.report.Name = name;
            //this.report.Description = description;
            _this.state.report.Name = name;
            _this.state.report.Description = description;
            _this.state.report.Category = category;

        }

        if (_.find(_this.state.report.tabs,function (item) {
            return !item.deleted;
        }).length == 0) {
            throw 'Reports must contain at least one tab.';
        }
        $(_this.state.report.tabs).each(function (index, tab) {
            var name = tab.title;
            var ordinal = tab.ordinal;
            var type = tab.type;
            if (name == '') {
                throw 'Report tab name is missing.';
            }

            //check if this is a new tab
            if (tab.deleted && tab.id > -1) {
                //delete tab
                joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Deleting tab "' + tab.title + '"');
                joolaio.objects.Reports.DeleteTab(_this, {id:tab.id});
            }
            else if (!tab.deleted && tab.id <= -1) {
                //new tab
                if (wetrun) {
                    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Adding new tab "' + tab.title + '"');

                    var result = joolaio.objects.Reports.AddTab(_this, {reportID:_this.reportID, name:name, type:tab.type});
                    result = $.parseJSON(result.data);
                    tab.id = result.ID;
                }
            }
            else if (!tab.deleted) {
                //update existing tab
                if (wetrun) {
                    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating tab "' + tab.title + '"');

                    joolaio.objects.Reports.UpdateTab(_this, tab.id, 'name', name);
                    joolaio.objects.Reports.UpdateTab(_this, tab.id, 'ordinal', ordinal);
                    joolaio.objects.Reports.UpdateTab(_this, tab.id, 'type', type);
                }
            }

            if (wetrun) {
                joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating metric groups for tab "' + tab.id + '"');
            }

            if (_.find(tab.mgroups,function (item) {
                return !item.deleted;
            }).length == 0) {
                throw 'Report tab must contain at least one metric group.';
            }

            if (!tab.deleted) {
                $(tab.mgroups).each(function (i, mg) {
                    var name = mg.title;
                    if (name == '') {
                        throw 'Metric group name is missing.';
                    }
                    //var ordinal = mg.ordinal;

                    //check if this is a new tab
                    if (mg.deleted && mg.id > -1) {
                        if (wetrun) {
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Deleting metric group "' + mg.title + '"');

                            joolaio.objects.Metrics.DeleteGroup(_this, {id:mg.id});
                        }
                    }
                    else if (!mg.deleted && mg.id <= -1) {
                        //new metric group
                        if (wetrun) {
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Adding new metric group "' + mg.title + '"');

                            var result = joolaio.objects.Metrics.AddGroup(_this, {tabID:tab.id, 'name':name});
                            result = $.parseJSON(result.data);
                            mg.id = result.ID;
                        }
                    }
                    else if (!mg.deleted) {
                        //update existing metric group
                        if (wetrun) {
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating metric group "' + mg.title + '"');

                            joolaio.objects.Metrics.UpdateGroup(_this, mg.id, 'name', name);
                        }
                    }

                    if (!mg.deleted) {
                        if (wetrun) {
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating metrics for group "' + mg.id + '"');
                        }
                        if (_.find(mg.metrics,function (item) {
                            return !item.deleted;
                        }).length == 0) {
                            throw 'Metric group must contain at least one metric.';
                        }

                        $(mg.metrics).each(function (im, metric) {
                            if (metric.deleted) {
                                if (wetrun) {
                                    try {
                                        if (typeof(metric.ordinal) == 'undefined') {
                                            // console.log('setting ordinal');
                                            metric.ordinal = _.max(mg.metrics,function (item) {
                                                return item.ordinal;
                                            }).ordinal + 1;
                                        }
                                    } catch (ex) {
                                        metric.ordinal = 0;
                                    }
                                    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Deleting metric "' + metric.Name + '" for group ' + mg.id);
                                    joolaio.objects.Metrics.DeleteGroupMetric(_this, mg.id, metric.Id, metric.ordinal);
                                }
                            }
                            else {
                                if (wetrun) {
                                    //  console.log(metric.ordinal);
                                    try {
                                        if (typeof(metric.ordinal) == 'undefined') {
                                            // console.log('setting ordinal');
                                            metric.ordinal = _.max(mg.metrics,function (item) {
                                                return item.ordinal;
                                            }).ordinal + 1;
                                        }
                                    } catch (ex) {
                                        metric.ordinal = 0;
                                    }
                                    joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating metric "' + metric.Name + '" for group ' + mg.id + ', ordinal: ' + metric.ordinal);
                                    joolaio.objects.Metrics.UpdateGroupMetric(_this, mg.id, metric.Id, metric.ordinal);
                                }
                            }
                        });
                    }
                });
                if (_.find(tab.dimensions,function (item) {
                    return !item.deleted;
                }).length == 0) {
                    throw 'Report tabs must contain at least one dimension.';
                }
                $(tab.dimensions).each(function (i, dimension) {
                    //console.log(dimension);

                    if (dimension.deleted) {
                        if (wetrun) {
                            try {
                                if (typeof(dimension.ordinal) == 'undefined') {
                                    // console.log('setting ordinal');
                                    dimension.ordinal = _.max(tab.dimensions,function (item) {
                                        return item.ordinal;
                                    }).ordinal + 1;
                                }
                            } catch (ex) {
                                dimension.ordinal = 0;
                            }
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Deleting dimension "' + dimension.Name + '" for tab ' + tab.id);
                            joolaio.objects.Reports.DeleteTabDimension(_this, tab.id, dimension.Id, dimension.ordinal);
                        }
                    }
                    else {
                        if (wetrun) {
                            try {
                                if (typeof(dimension.ordinal) == 'undefined') {
                                    // console.log('setting ordinal');
                                    dimension.ordinal = _.max(tab.dimensions,function (item) {
                                        return item.ordinal;
                                    }).ordinal + 1;
                                }
                            } catch (ex) {
                                dimension.ordinal = 0;
                            }
                            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating dimension "' + dimension.Name + '" for tab ' + tab.id + ', ordinal: ' + dimension.ordinal);
                            joolaio.objects.Reports.UpdateTabDimension(_this, tab.id, dimension.Id, dimension.ordinal);
                        }
                    }


                })
            }
        });
    }
    catch (e) {
        _this.showAlert(_this, {message:e});

        throw (e);
        return;
    }

    if (wetrun) {
        //try reloading menus
        try {
            joolaio.objects.Reports.List(null, null, null, true);

            buildContentMenu_Reports();
            var $editor = $('.report.editor');
            var $head = $('.jumbotron.subhead');
            var $panel = $('.joolaio._container .joolaio.report.panel');

            $editor.remove();
            $head.show();
            $panel.show();
            $(joolaio).trigger('reportchange', _this.reportID);
            joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Saved.');
        }
        catch (e) {
            return;
        }
    }

    if (!wetrun) {
        joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Editor', 6, 'Updating layout...');
        //$("html, body").animate({ scrollTop:0 }, "slow");
        var layout = function () {
            //console.log('scroll');
            $(window).scrollTop(0);
            joolaio.visualisation.showLoading(true);
        };

        $(layout).promise().done(function () {
            //console.log('done');
            setTimeout(function () {
                _this.Save(_this, options, true);
            }, 13);
        })
    }
};

joolaio.visualisation.report.Editor.prototype.showAlert = function (sender, options) {
    var _this = sender;

    var $alert = $('<div class="alert alert-error save-error"><button type="button" class="close" data-dismiss="alert">×</button></div>');
    var message = '<strong>Error</strong>, we have failed to save the report due to the following issue(s):<br/>';
    //message += options.message;
    message += '<ul class="errors"></ul>';
    $alert.append(message);

    if (typeof options.message === 'string') {
        options.message = [ options.message ];
    }
    $(options.message).each(function (index, item) {
        $alert.find('.errors').append('<li>' + item + '</li>');
    });

    $('.report.editor .header:first-of-type').before($alert);

    $("html, body").animate({ scrollTop:0 }, "slow");

};

joolaio.debug.log('INFO', 'Report.Visualisation.Editor', 6, 'JS source loaded');
