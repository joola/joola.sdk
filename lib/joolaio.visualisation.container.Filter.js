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



joolaio.provide('joolaio.visualisation.container.Filter');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation');

joolaio.visualisation.container.Filter = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;

    var _options = {
        container:null
    };

    if (typeof options == 'undefined')
        throw 'Container not specified';
    else {
        _options.container = $(options.container);
        if (options.dimensions)
            _options.dimensions = options.dimensions;
        if (options.limit)
            _options.limit = options.limit;
    }

    _this.container = _options.container;
    _this.options = _options;
    _this.init(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.container.Filter', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.container.Filter.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    $container.empty();
    $container.html(_this.baseHTML(_this));

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.container.Filter', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.container.Filter.prototype.baseHTML = function (sender) {
    var _this = sender;
    var $html = $('');

    var $wrapper = $('<div class="search_filter_wrapper"></div>');
    var $condition_wrapper = $('<div class="condition_wrapper"></div>');

    var $group_wrapper = $('<div class="condition_group_wrapper"></div>');
    var $group = $('<div class="condition_group"></div>');
    var $conditions = $('<div class="conditions"><div class="close">&times;</div></div>');

    var $includeexclude = $('<div class="condition condition_include "><div class="btn-group">' +
        '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' +
        'Include' +
        '<span class="caret"></span>' +
        '</a>' +
        '<ul class="dropdown-menu">' +
        '<li class="active"><a>Include</a></li>' +
        '<li class=""><a>Exclude</a></li>' +
        '</ul>' +
        '</div></div>');
    var $picker = $('<div class="condition condition_picker"><div class="joolaio picker dimensions"></div></div>');

    var v = new joolaio.visualisation.picker.Dimensions({container:$picker.find('.picker'), showgrip:false,type:'placeholder'});
    $(v).bind('select', function (event, value) {
        //console.log('select3');
        if (value != '') {
            $close.attr('data-id', value);
            _this.addDimensionBox(_this, '');
            $(_this).trigger('dimension-added', value);
        }
        else {
            v.options.container.remove();
            v = null;
        }
    });

    var $type = $('<div class="condition condition_type"><div class="btn-group">' +
        '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' +
        'Containing' +
        '<span class="caret"></span>' +
        '</a>' +
        '<ul class="dropdown-menu">' +
        '<li class=""><a>Excatly matching</a></li>' +
        '<li class=""><a>Matching RegExp</a></li>' +
        '<li class=""><a>Begins with</a></li>' +
        '<li class=""><a>Ends with</a></li>' +
        '<li class="active"><a>Containing</a></li>' +
        '</ul>' +
        '</div></div>');
    var $term = $('<div class="condition condition_term"><div><input type="text" class="advancedsearch_text input-medium"></div></div>');

    $conditions.append($includeexclude);
    $conditions.append($picker);
    $conditions.append($type);
    $conditions.append($term);

    $group.append($conditions);
    $group_wrapper.append($group);
    $condition_wrapper.append($group_wrapper);

    var $sep = $('<div class="condition_sep_and">and</div>');


    var $newgroup = $('<div class="condition_group_wrapper"></div>');
    $conditions = $('<div class="conditions"></div>');

    var $addnewbutton = $('<div class="addnewconditionbutton" style=""><span><span class="pluscaption">+</span>&nbsp;Add another <span class="dimensioncaption">filter</span></span></div>');
    $conditions.append($addnewbutton)
    $newgroup.append($conditions);

    $condition_wrapper.append($sep);
    $condition_wrapper.append($newgroup);
    $wrapper.append($condition_wrapper);
    /*
     var $dimensions = $('<div class="dimensionscollection"></div>');
     $container.append($dimensions);

     if (_this.options.dimensions.length > 0) {
     $(_this.options.dimensions).each(function (index, dimension) {
     if (!dimension.deleted) {
     var $dimension = $('<div class="pickerwrapper"><div class="joolaio picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
     var $close = $dimension.find('.close');
     $close.off('click');
     $close.on('click', function (e) {
     $dimension.remove();
     $(_this).trigger('dimension-removed', dimension.Name);
     });

     var v = new joolaio.visualisation.picker.Dimensions({container:$($dimension.find('.picker')), showgrip:true, selected:dimension.Name});
     $(v).bind('select', function (event, value) {
     //console.log('select1');
     if (value != '') {
     $close.attr('data-id', value);
     _this.addDimensionBox(_this, '');
     $(_this).trigger('dimension-removed', dimension.Name);
     $(_this).trigger('dimension-added', value);
     }
     else {
     v.options.container.remove();
     v = null;
     }
     });
     $dimensions.append($dimension);
     }
     });
     }
     var $dimension = $('<div class="pickerwrapper"><div class="joolaio picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
     var $close = $dimension.find('.close');
     $close.off('click');
     $close.on('click', function (e) {
     $dimension.remove();
     $(_this).trigger('dimension-removed', $(this).attr('data-id'));
     });

     var v = new joolaio.visualisation.picker.Dimensions({container:$($dimension.find('.picker')), showgrip:true});
     $(v).bind('select', function (event, value) {
     //console.log('select2');
     if (value != '') {
     $close.attr('data-id', value);
     _this.addDimensionBox(_this, '');
     $(_this).trigger('dimension-added', value);
     }
     else {
     v.options.container.remove();
     v = null;
     }
     });

     $dimensions.append($dimension);


     $html.find('.dimensionscollection').sortable({
     connectWith:".pickerwrapper",
     handle:'.grip',
     distance:-250,
     update:function (e, p) {
     $(_this).trigger('dimension-reorder');
     },

     stop:function (event, ui) {

     }
     }).disableSelection();
     */
    $html = $wrapper;
    return $html;
};

joolaio.visualisation.container.Filter.prototype.addDimensionBox = function (sender, selectedDimension) {
    var _this = sender;
    var $container = sender.container.find('.dimensionscollection');

    var currentboxes = $container.find('.pickerwrapper').length;
    if (currentboxes >= _this.options.limit && _this.options.limit > -1)
        return;

    var customboxcount = $container.find('.joolaio.picker.dimensions:not(.on)').length;
    if (customboxcount > 0)
        return;

    var $dimension = $('<div class="pickerwrapper"><div class="joolaio picker dimensions" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');

    var $close = $dimension.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $dimension.remove();
        $(_this).trigger('dimension-removed', $(this).attr('data-id'));
    });

    var v = new joolaio.visualisation.picker.Dimensions({container:$dimension.find('.picker'), showgrip:true});
    $(v).bind('select', function (event, value) {
        //console.log('select3');
        if (value != '') {
            $close.attr('data-id', value);
            _this.addDimensionBox(_this, '');
            $(_this).trigger('dimension-added', value);
        }
        else {
            v.options.container.remove();
            v = null;
        }
    });
    $container.append($dimension);
}

joolaio.loaded.push('joolaio.visualisation.container.Filter');
joolaio.debug.log('INFO', 'joolaio.visualisation.container.Filter', 6, 'JS source loaded');
