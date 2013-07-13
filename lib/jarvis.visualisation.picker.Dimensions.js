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


jarvis.provide('jarvis.visualisation.picker.dimensions');
jarvis.provide('jarvis.visualisation.picker.dimensions');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation');

jarvis.visualisation.picker.Dimensions = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;

    var _options = {
        container: null,
        placeholdertext: 'Choose a dimension...',
        prefix: '',
        multiple: false,
        type: 'button',
        showgrip: false,
        selected: '',
        showselected: true,
        dimensions: null
    };

    if (typeof options == 'undefined')
        throw 'Container not specified';
    else
        _options.container = $(options.container);

    if (typeof options.placeholdertext != 'undefined')
        _options.placeholdertext = options.placeholdertext;
    else if (typeof _options.container.attr('data-placeholdertext') != 'undefined')
        _options.placeholdertext = _options.container.attr('data-placeholdertext');

    if (typeof options.prefix != 'undefined')
        _options.prefix = options.prefix;
    else if (typeof _options.container.attr('data-prefix') != 'undefined')
        _options.prefix = _options.container.attr('data-prefix');

    if (typeof options.type != 'undefined')
        _options.type = options.type;
    else if (typeof _options.container.attr('data-type') != 'undefined')
        _options.type = _options.container.attr('data-type');

    if (typeof options.showgrip != 'undefined')
        _options.showgrip = options.showgrip;
    else if (typeof _options.container.attr('data-showgrip') != 'undefined')
        _options.showgrip = _options.container.attr('data-showgrip');

    if (typeof options.selected != 'undefined')
        _options.selected = options.selected;
    else if (typeof _options.container.attr('data-selected') != 'undefined')
        _options.selected = _options.container.attr('data-selected');

    if (typeof options.multiple != 'undefined')
        _options.multiple = options.multiple;
    else if (typeof _options.container.attr('data-multiple') != 'undefined')
        _options.multiple = _options.container.attr('data-multiple');

    if (typeof options.showselected != 'undefined')
        _options.showselected = options.showselected;
    else if (typeof _options.container.attr('data-showselected') != 'undefined')
        _options.showselected = _options.container.attr('data-showselected');

    if (typeof options.dimensions != 'undefined')
        _options.dimensions = options.dimensions;

    _this.container = _options.container;
    _this.options = _options;
    //_this.selected = null;

    if (!_options.dimensions) {
        jarvis.objects.Dimensions.List();
        _options.dimensions = jarvis.objects.Dimensions
    }

    _this.init(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Picker.Dimensions', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.picker.Dimensions.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    $container.empty();
    $container.html(_this.baseHTML(_this));

    if (_this.options.selected != '') {
        _this.setSelected(_this, _this.options.selected, _this.options.multiple);
    }

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Picker.Dimensions', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.picker.Dimensions.prototype.collapseAll = function (sender) {
    var _this = sender;

    $(_this.container.find('.node.level_0')).removeClass('on');
    $(_this.container.find('.jcontainer ')).removeClass('on');

};

jarvis.visualisation.picker.Dimensions.prototype.expandAll = function (sender) {
    var _this = sender;

    $(_this.container.find('.node.level_0')).addClass('on');
    $(_this.container.find('.jcontainer ')).addClass('on');
};

jarvis.visualisation.picker.Dimensions.prototype.setSelected = function (sender, dimensionname, multiple) {
    var _this = sender;

    sender.collapseAll(sender);
    if (!multiple) {
        $(_this.container.find('li[data-dimensionname]')).removeClass('on');
    }
    $(_this.container.find('li[data-dimensionname="' + dimensionname + '"]')[0]).toggleClass('on');

    _this.ensureVisible(_this, dimensionname);

    //console.log(dimensionname, _this.options.showselected)
    if (dimensionname != '' && _this.options.showselected) {
        $(_this.container.find('.jbtn')[0]).html(dimensionname + '<span class="caret"></span>');
        if (!$(_this.container).hasClass('on')) {
            $(_this.container).addClass('on');
            if (_this.options.allowremove)
                $(_this.container).append('<button class="close">&times;</button>');

            $($(this.container).find('.close')).off('click');
            $($(this.container).find('.close')).on('click', function (e) {
                _this.setSelected(_this, '');
                $(this).remove();
            });
        }
    }
    else {
        $(_this.container).removeClass('on');
        var s = ' + add dimension <span class="caret"></span>';
        if (_this.options.type == 'button')
            s = _this.options.placeholdertext + '<span class="caret"></span>';

        $(_this.container.find('.jbtn')[0]).html(s);
    }
    /*
     if (_this.options.type == 'button') {
     $(_this.container.find('.jbtn')[0]).html(sender.options.prefix + dimensionname + ' <b class="caret"></b>');
     }
     else{
     $(_this.container.find('.jbtn')[0]).html(dimensionname);
     }*/
    //to set the correct id for the container, used by report editor
    $(this.container).closest('.pickerwrapper').attr('data-id', dimensionname);


    var $container = $(_this.container.find('.dimensionscontainer'));
    if ($container.hasClass('on')) {
        $container.hide();
        $container.removeClass('on');
        $(_this.container.find('.jbtn')[0]).removeClass('active');
    }

    _this.options.selected = dimensionname;

    $(_this).trigger('select', dimensionname)
};

jarvis.visualisation.picker.Dimensions.prototype.ensureVisible = function (sender, dimensionname) {
    if (dimensionname != '') {
    }
    else {
        if (sender.options.selected != null) {
            dimensionname = sender.options.selected;
        }
    }
    //console.log('ensure', dimensionname);
    var _this = sender;
    var $li = $(_this.container.find('li[data-dimensionname="' + dimensionname + '"]')[0]);

    if (!$li.parent().hasClass('on'))
        $li.parent().addClass('on');
    $li.closest('.node.level_0').addClass('on');
};


jarvis.visualisation.picker.Dimensions.prototype.baseHTML = function (sender) {
    var _this = sender;
    var $html = $('<div class="dimensionswrapper"></div>');

    if (_this.options.type == 'button') {
        $html.append('<a class="btn jbtn">' + _this.options.placeholdertext + ' <b class="caret"></b></a>');
    }
    else if (_this.options.type == 'none') {
        $html.append('<bb class="jbtn">' + _this.options.placeholdertext + ' <b class="caret"></b></bb>');
    }
    else {
        if (_this.options.showgrip)
            $html.append('<div class="grip"></div>');
        $html.append('<div class="customadd dimension jbtn"> + add dimension </div>');
    }
    $html.append('<div class="dimensionscontainer"><div>');

    var $container = $($html.find('.dimensionscontainer'));
    //we first need to group the dimensions together

    //console.log(jarvis.dataaccess.dimensions);


    var search = function (e, term) {
        //console.log('search', term);
        if ((term == '' || term.length < 2 ) && e.which != 13) {
            _this.collapseAll(_this);
            _this.ensureVisible(_this, _this.options.selected);

            $container.find('.category').show();
            //$container.find('.node.level_0').removeClass('on');
            $container.find('.node.level_0').css('background-image', 'url(\'' + jarvis.hostname + '/assets/img/collapse.png\') no-repeat 0px 8px;');
            $container.find('.node.level_0').css('padding-left', '10px');

            $container.find('.node.level_0').removeCss('background');
            $container.find('.node.level_0').removeCss('background-image');

            $container.find('.node.leaf.level_1').find('.key').each(function (index, item) {
                var $this = $(this);
                $this.closest('.level_1').show();
            });
        }
        else {
            _this.expandAll(_this);

            $container.find('.category').hide();
            //$container.find('.node.level_0').addClass('on');
            $container.find('.node.level_0').css({'background-image': 'none', 'padding-left': 0});

            $container.find('.node.leaf.level_1').find('.key').each(function (index, item) {
                var $this = $(this);
                //console.log($this.text(), term);
                if ($this.text().toLowerCase().indexOf(term.toLowerCase()) > -1)
                    $this.closest('.level_1').show();
                else
                    $this.closest('.level_1').hide();
            })
        }
    };

    var $search = $('<div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div>');
    $search.keyup(function (e) {
        var term = $search.find('.quicksearch').val();
        search(e, term);
    });

    $search.find('.icon-search').off('click');
    $search.find('.icon-search').on('click', function (e) {
        var term = $search.find('.quicksearch').val();
        search(e, term);
    });

    $container.append($search);
    var _dimensions = _.groupBy(jarvis.objects.Dimensions, function (obj) {
        if (!obj.Category)
            return '(not set)';
        return obj.Category.Name;
    });


    _dimensions = _.sortBy(_dimensions, function (item) {
        //console.log(item);
        return item[0].Category.Ordinal;
    });

    //let's iterate the dimensions and add them to the drop down
    //console.log(_dimensions);
    $container.append('<ul class="categorylist"></ul>');
    var $categorylist = $($container.find('.categorylist'));
    _.each(_dimensions, function (item, index) {
        //console.log(item);
        //console.log(item)
        if (item[0].Category && item[0].Category.Name != '(not set)') {
            var $list = $('<li class="node  ' + 'level_' + '0' + '"></li>');
            $list.append('<div class="category">' + (!item[0].Category ? '(not set)' : item[0].Category.Name) + '</div>');
            $list.append('<ul class="jcontainer"></ul>');
            var bDrawn = false;
            $.each(item, function (index, dimension) {
                //console.log(dimension);
                if (dimension.ColumnName != dimension.DictionaryTable_Column || dimension.Id <= -1) {
                    var list = '<li class="node leaf ' + 'level_' + '1' + '" data-dimensionname="' + dimension.Name + '" data-dimensionid="' + dimension.Id + '">';

                    list += '<div class="box">';
                    list += '<div class="keyvaluepair">';

                    list += '<div class="key">' + dimension.Name + '</div>';
                    list += '<div class="help"> <i class="icon-question-sign icon-white" data-caption="' + dimension.Name + '" data-text="' + dimension.HelpText + '"></i> </div>';

                    list += '</div>';
                    list += '</div>';

                    list += '</li>';

                    var $li = $(list);

                    $($list.find('.jcontainer:last-of-type')).append($li);
                    bDrawn = true;
                }
            });
            if (bDrawn)
                $categorylist.append($list);

        }
    });

    $($container).find('.icon-question-sign').each(function (index, item) {
        $(item).popover({placement: 'right', trigger: 'hover', delay: 0, title: '<strong>' + $(item).attr('data-caption') + '</strong>', content: $(item).attr('data-text')});
    });

    $($html.find('.jbtn')[0]).off('click');
    $($html.find('.jbtn')[0]).on('click', function (e) {
        $container.toggle();
        $container.toggleClass('on');
        _this.collapseAll(_this);
        $search.find('.quicksearch').val('');
        $search.keyup();


        $search.focus();

        _this.ensureVisible(_this, _this.options.selected);
        $(this).toggleClass('active');
    });

    $('body').click(function () {
        if ($container.hasClass('on')) {
            $container.toggle();
            $container.toggleClass('on');
            $($html.find('.jbtn')[0]).toggleClass('active');
        }
    });

    $html.click(function (e) {
        e.stopPropagation();
    });

    $($container).find('.node.level_0').each(function (index, item) {
        var $li = $(this);
        $li.off('click');
        $li.on('click', function (e) {
            //alert('click');
            e.stopPropagation();

            $(this).toggleClass('on');
            $($(this).find('.jcontainer')[0]).toggleClass('on');
        });
    });

    $($container).find('.node.level_1').each(function (index, item) {
        var $li = $(this);
        $li.off('click');
        $li.on('click', function (e) {
            e.stopPropagation();
            _this.setSelected(_this, $(this).attr('data-dimensionname'), _this.options.multiple);
        });
    });

    $container.bind('mousewheel', function (e, d) {
        if (d > 0 && $(this).scrollTop() == 0)
            e.preventDefault();
        else if (d < 0 && $(this).scrollTop() == $(this).get(0).scrollHeight - $(this).innerHeight())
            e.preventDefault();
    });
    return $html;
};

jarvis.loaded.push('jarvis.visualisation.picker.dimensions');
jarvis.debug.log('INFO', 'Jarvis.Visualisation.Picker.Dimensions', 6, 'JS source loaded');
