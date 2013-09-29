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

joolaio.provide('joolaio.visualisation.container.dimensions');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation');

joolaio.visualisation.container.Dimensions = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;

    var _options = {
        container:null,
        placeholdertext:'Choose a dimension...',
        type:'button',
        selected:'',
        limit:4,
        dimensions:[]
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
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Dimensions', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.container.Dimensions.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    $container.empty();
    $container.html(_this.baseHTML(_this));

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Dimensions', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.container.Dimensions.prototype.baseHTML = function (sender) {
    var _this = sender;
    var $html = $('');

    var $wrapper = $('<div class="dimensioncontainer"></div>');
    var $container = $('<div class="well"></div>');

    /*$container.append('<button type="button" class="close">&times;</button>');
     $container.find('.close').off('click');
     $container.find('.close').on('click', function (e) {
     $wrapper.remove();
     $(_this).trigger('group-removed', _this.id);
     });*/
    $wrapper.append($container);

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
                    $(_this).trigger('dimension-removed', dimension.name);
                });

                var v = new joolaio.visualisation.picker.Dimensions({container:$($dimension.find('.picker')), showgrip:true, selected:dimension.name});
                $(v).bind('select', function (event, value) {
                    //console.log('select1');
                    if (value != '') {
                        $close.attr('data-id', value);
                        _this.addDimensionBox(_this, '');
                        $(_this).trigger('dimension-removed', dimension.name);
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
    $html = $wrapper;

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

    return $html;
};

joolaio.visualisation.container.Dimensions.prototype.addDimensionBox = function (sender, selectedDimension) {
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

joolaio.loaded.push('joolaio.visualisation.container.dimensions');
joolaio.debug.log('INFO', 'joolaio.Visualisation.Container.Dimensions', 6, 'JS source loaded');
