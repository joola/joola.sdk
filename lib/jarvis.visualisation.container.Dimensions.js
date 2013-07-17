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
 * @fileoverview Provides a report visualisation to display current server date and time.
 *
 */


jarvis.provide('jarvis.visualisation.container.dimensions');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation');

jarvis.visualisation.container.Dimensions = function (options) {
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
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Dimensions', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.container.Dimensions.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    $container.empty();
    $container.html(_this.baseHTML(_this));

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Dimensions', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.container.Dimensions.prototype.baseHTML = function (sender) {
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
                var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
                var $close = $dimension.find('.close');
                $close.off('click');
                $close.on('click', function (e) {
                    $dimension.remove();
                    $(_this).trigger('dimension-removed', dimension.name);
                });

                var v = new jarvis.visualisation.picker.Dimensions({container:$($dimension.find('.picker')), showgrip:true, selected:dimension.name});
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
    var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
    var $close = $dimension.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $dimension.remove();
        $(_this).trigger('dimension-removed', $(this).attr('data-id'));
    });

    var v = new jarvis.visualisation.picker.Dimensions({container:$($dimension.find('.picker')), showgrip:true});
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

jarvis.visualisation.container.Dimensions.prototype.addDimensionBox = function (sender, selectedDimension) {
    var _this = sender;
    var $container = sender.container.find('.dimensionscollection');

    var currentboxes = $container.find('.pickerwrapper').length;
    if (currentboxes >= _this.options.limit && _this.options.limit > -1)
        return;

    var customboxcount = $container.find('.jarvis.picker.dimensions:not(.on)').length;
    if (customboxcount > 0)
        return;

    var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');

    var $close = $dimension.find('.close');
    $close.off('click');
    $close.on('click', function (e) {
        $dimension.remove();
        $(_this).trigger('dimension-removed', $(this).attr('data-id'));
    });

    var v = new jarvis.visualisation.picker.Dimensions({container:$dimension.find('.picker'), showgrip:true});
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

jarvis.loaded.push('jarvis.visualisation.container.dimensions');
jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container.Dimensions', 6, 'JS source loaded');
