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

joolaio.visualisation.Template = function (container, options, next) {
    var self = this;

    $(joolaio).trigger('joolaio-vizname-load-before');

    self.container = container;
    self.$container = $(container);

    self.options = self.defaultOptions;
    jQuery.extend(true, self.options, options);

    self._draw(options);

    if (typeof(next) == 'function')
        next(options, true);

    $(joolaio).trigger('joolaio-vizname-load-after');
    return self;
};

/**
 * Contains definitions for base and default options of the visualization
 * @type {{name: string, type: string, category: string}}
 */
joolaio.visualisation.Template.prototype.defaultOptions = {
    name: 'viz name, timeline',
    type: 'viz type, chart',
    category: 'dashboard/report/realtime',

    'hook-render': function (options, next) {
        next();
    },
    'hook-draw': function (options, next) {
        next();
    }
};

joolaio.visualisation.Template.prototype.events = {
    //call during constructor
    'joolaio-vizname-load-before': 1,
    'joolaio-vizname-load-after': 1,

    //called during destory
    'joolaio-vizname-destroy-before': 1,
    'joolaio-vizname-destroy-after': 1,

    //draw the base html placeholder
    'joolaio-vizname-draw-before': 1,
    'joolaio-vizname-draw-after': 1,

    //get's called during fetch
    'joolaio-vizname-fetch-before': 1,
    'joolaio-vizname-fetch-after': 1,

    //get's called after fetch is done to update the contents with data
    'joolaio-vizname-renderbefore': 1,
    'joolaio-vizname-render-after': 1
};

joolaio.visualisation.Template.prototype.destroy = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

joolaio.visualisation.Template.prototype.render = function (options, next) {
    var self = this;

    var _render = function () {
        //do the actual rendering
        console.log('render finished');

        if (typeof(next) == 'function')
            next(options, true);
    };

    if (self.options['hook-render'] && typeof(self.options['hook-render']) == 'function')
        self.options['hook-render'](options, function () {
            _render();
        });
    else
        _render();

    return self;
};

joolaio.visualisation.Template.prototype.getOptions = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

joolaio.visualisation.Template.prototype.setOptions = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

joolaio.visualisation.Template.prototype.getState = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

joolaio.visualisation.Template.prototype.setState = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

/**
 * Responsible for applying baseHtml in container
 * @param options
 * @param next
 * @returns {*}
 * @private
 */
joolaio.visualisation.Template.prototype._draw = function (options, next) {
    var self = this;

    var html = '<h1>test</h1>';
    var $html = $(html);

    options.$html = $html;

    var _draw = function () {
        $html = options.$html;
        self.$container.append($html);
        console.log($html);
        if (typeof(next) == 'function')
            next(options, true);
    };

    if (self.options['hook-draw'] && typeof(self.options['hook-draw']) == 'function')
        self.options['hook-draw'](options, function () {
            _draw();
        });
    else
        _draw();

    return self;
};

/**
 * Responsible for data fetching from the server, compiles options into an actual ajax query
 * @param options
 * @param next
 * @returns {*}
 * @private
 */
joolaio.visualisation.Template.prototype._fetch = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

