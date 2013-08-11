jarvis.visualisation.Template = function (container, options, next) {
    var self = this;

    $(jarvis).trigger('jarvis-vizname-load-before');

    self.container = container;
    self.$container = $(container);

    self.options = self.defaultOptions;
    jQuery.extend(true, self.options, options);

    self._draw(options);

    if (typeof(next) == 'function')
        next(options, true);

    $(jarvis).trigger('jarvis-vizname-load-after');
    return self;
};

/**
 * Contains definitions for base and default options of the visualization
 * @type {{name: string, type: string, category: string}}
 */
jarvis.visualisation.Template.prototype.defaultOptions = {
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

jarvis.visualisation.Template.prototype.events = {
    //call during constructor
    'jarvis-vizname-load-before': 1,
    'jarvis-vizname-load-after': 1,

    //called during destory
    'jarvis-vizname-destroy-before': 1,
    'jarvis-vizname-destroy-after': 1,

    //draw the base html placeholder
    'jarvis-vizname-draw-before': 1,
    'jarvis-vizname-draw-after': 1,

    //get's called during fetch
    'jarvis-vizname-fetch-before': 1,
    'jarvis-vizname-fetch-after': 1,

    //get's called after fetch is done to update the contents with data
    'jarvis-vizname-renderbefore': 1,
    'jarvis-vizname-render-after': 1
};

jarvis.visualisation.Template.prototype.destroy = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

jarvis.visualisation.Template.prototype.render = function (options, next) {
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

jarvis.visualisation.Template.prototype.getOptions = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

jarvis.visualisation.Template.prototype.setOptions = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

jarvis.visualisation.Template.prototype.getState = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

jarvis.visualisation.Template.prototype.setState = function (options, next) {
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
jarvis.visualisation.Template.prototype._draw = function (options, next) {
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
jarvis.visualisation.Template.prototype._fetch = function (options, next) {
    var self = this;

    if (typeof(next) == 'function')
        next(options, true);
    return self;
};

