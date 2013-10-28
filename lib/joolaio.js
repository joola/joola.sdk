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


/**
 * This is the base namespace for joolaio SDK.
 * @namespace joolaio
 */

var joolaio = joolaio || {};

/**
 * Overridden to true by the compiler when --mark_as_compiled is specified.
 * @type {bool}
 */
var COMPILED = true;

/**
 * The current SDK version.
 * @type {string}
 */
joolaio.VERSION = '[[JOOLAIO-VERSION]]';

/**
 * Stores the current Security Token used in the context.
 * @type {string}
 */
joolaio.TOKEN = '[[JOOLAIO-TOKEN]]';

/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
joolaio.global = this;
/**
 * Indicates if we are manually drawing panels.
 */
joolaio.panelDraw = false;
/**
 * Should the SDK manage the page state.
 */
joolaio.managestate = false;
/**
 * Library load timestamp.
 */
joolaio.loadTimestamp = new Date();

/**
 * Provided as a convenience so that debugging code that should not be included in a production js_binary can be easily stripped by specifying --define joolaio.DEBUG=false to the JSCompiler. For example, most toString() methods should be declared inside an "if (joolaio.DEBUG)" conditional because they are generally used for debugging purposes and it is difficult for the JSCompiler to statically determine whether they are used.
 */
joolaio.DEBUG = true;


/**
 * @property {int} joolaio.DEBUGLEVEL asdasdasd
 */
joolaio.DEBUGLEVEL = 10;


/**
 * Defines the locale being used for compilation. It is used to select locale specific data to be compiled in js binary. BUILD rule can specify this value by "--define joolaio.LOCALE=<locale_name>" as JSCompiler option.
 */
joolaio.LOCALE = 'en';  // default to en

/**
 * HTTP page to joolaio Engine Endpoint.
 */
joolaio.joolaioPath = '';//http://edge.joolaioanalytics.com/joolaio';//http://109.64.28.168/';

/**
 * HTTP page to joolaio Content Assets.
 */
joolaio.contentPath = '/assets/';// 'http://edge.joolaioanalytics.com/framework/assets/'; //http://109.64.28.168/framework/assets/';
/**
 * Path for included scripts
 * @type {string}
 */
joolaio.svcPath = ''; //'http://edge.joolaioanalytics.com/joolaio/engine/'

/**
 * HTML path to the Engine base API path.
 * @type {string} HTML path to the Engine base API path2.
 */
joolaio.basePath = '/client/api/'; //'http://edge.joolaioanalytics.com/framework/api/'; //http://109.64.28.168/framework/api/';


joolaio.loginRedirectUrl = '[[JOOLAIO-LOGINREDIRECTURL]]';
if (!joolaio.loginRedirectUrl || joolaio.loginRedirectUrl == 'null')
    joolaio.loginRedirectUrl = null;

/**
 * A hook for overriding the base path.
 * @type {string|undefined}
 */
joolaio.global.CLOSURE_BASE_PATH = '';

joolaio.dateformat = 'mmm dd, yyyy';
joolaio.dateboxcssloaded = false;

/**
 * A function to import a single script. This is meant to be overridden when joolaio is being run in non-HTML contexts, such as web workers. It's defined in the global scope so that it can be set before joolaio.js is loaded, which allows deps to be imported properly.
 */
joolaio.global.CLOSURE_IMPORT_SCRIPT;
joolaio.bootstrap = eval('[[JOOLAIO-BOOTSTRAP]]');

joolaio.systemStartDate = null;
joolaio.systemEndDate = null;

/**
 * @define {boolean} Whether to enable the debug loader.
 *
 * If enabled, a call to joolaio.require() will attempt to load the namespace by
 * appending a script tag to the DOM (if the namespace has been registered).
 *
 * If disabled, joolaio.require() will simply assert that the namespace has been
 * provided (and depend on the fact that some outside tool correctly ordered
 * the script).
 */
joolaio.ENABLE_DEBUG_LOADER = true;


//IE Console wrapper
if (typeof console != "undefined") {
    console.log('joola.io client SDK, version ' + joolaio.VERSION + '.');
    try {
        //if (_gaq && typeof _gaq != "undefined") {
        //    _gaq.push(['_trackPageview', 'joolaio/start']);
        //_gaq.push(['_trackEvent', 'joolaio', 'start', '']);
        //console.log('Using GA Tracing...');
        //}

    } catch (e) {
    }
}
else {
    console = {};
    console.log = function () {
    };
}

/**
 * Null function used for default values of callbacks, etc.
 * @return {void} Nothing.
 */
joolaio.nullFunction = function () {
};


/**
 * The identity function. Returns its first argument.
 *
 * @param {...*} var_args The arguments of the function.
 * @return {*} The first argument.
 * @deprecated Use joolaio.functions.identity instead.
 */
joolaio.identityFunction = function (var_args) {
    return arguments[0];
};


/**
 * When defining a class Foo with an abstract method bar(), you can do:
 *
 * Foo.prototype.bar = joolaio.abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error
 * will be thrown when bar() is invoked.
 *
 * Note: This does not take the name of the function to override as
 * an argument because that would make it more difficult to obfuscate
 * our JavaScript code.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be
 *   overridden.
 */
joolaio.abstractMethod = function () {
    throw Error('unimplemented abstract method');
};


/**
 * Adds a {@code getInstance} static method that always return the same instance
 * object.
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
joolaio.addSingletonGetter = function (ctor) {
    ctor.getInstance = function () {
        return ctor.instance_ || (ctor.instance_ = new ctor());
    };
};


if (!COMPILED) {

    /**
     * Check if the given name has been joolaio.provided. This will return false for
     * names that are available only as implicit namespaces.
     * @param {string} name name of the object to look for.
     * @return {boolean} Whether the name has been provided.
     * @private
     */
    joolaio.isProvided_ = function (name) {
        return !joolaio.implicitNamespaces_[name] && !!joolaio.getObjectByName(name);
    };

    /**
     * Namespaces implicitly defined by joolaio.provide. For example, joolaio.provide('joolaio.events.Event') implicitly declares that 'joolaio' and 'joolaio.events' must be namespaces.
     *
     * @type {Object}
     * @private
     */
    joolaio.implicitNamespaces_ = {};
}


/**
 * Adds a dependency from a file to the files it requires.
 * @param {string} relPath The path to the js file.
 * @param {Array} provides An array of strings with the names of the objects
 *                         this file provides.
 * @param {Array} requires An array of strings with the names of the objects
 *                         this file requires.
 */
joolaio.addDependency = function (relPath, provides, requires) {
    if (!COMPILED) {
        var provide, require;
        var path = relPath.replace(/\\/g, '/');
        var deps = joolaio.dependencies_;
        for (var i = 0; provide = provides[i]; i++) {
            deps.nameToPath[provide] = path;
            if (!(path in deps.pathToNames)) {
                deps.pathToNames[path] = {};
            }
            deps.pathToNames[path][provide] = true;
        }
        for (var j = 0; require = requires[j]; j++) {
            if (!(path in deps.requires)) {
                deps.requires[path] = {};
            }
            deps.requires[path][require] = true;
        }
    }
};


/**
 * Implements a system for the dynamic resolution of dependencies
 * that works in parallel with the BUILD system. Note that all calls
 * to joolaio.require will be stripped by the JSCompiler when the
 * --closure_pass option is used.
 * @see joolaio.provide
 * @param {string} name Namespace to include (as was given in joolaio.provide())
 *     in the form "joolaio.package.part".
 */
joolaio.require = function (name) {

    // if the object already exists we do not need do do anything
    // TODO(user): If we start to support require based on file name this has
    //            to change
    // TODO(user): If we allow joolaio.foo.* this has to change
    // TODO(user): If we implement dynamic load after page load we should probably
    //            not remove this code for the compiled output
    if (!COMPILED) {
        if (joolaio.isProvided_(name)) {
            return;
        }

        if (joolaio.ENABLE_DEBUG_LOADER) {
            var path = joolaio.getPathFromDeps_(name);
            if (path) {
                joolaio.included_[path] = true;
                joolaio.writeScripts_();
                return;
            }
        }

        var errorMessage = 'joolaio.require could not find: ' + name;
        if (joolaio.global.console) {
            joolaio.global.console['error'](errorMessage);
        }


        throw Error(errorMessage);

    }
};


/**
 * Creates object stubs for a namespace.  The presence of one or more
 * joolaio.provide() calls indicate that the file defines the given
 * objects/namespaces.  Build tools also scan for provide/require statements
 * to discern dependencies, build dependency files (see deps.js), etc.
 * @see joolaio.require
 * @param {string} name Namespace provided by this file in the form
 *     "joolaio.package.part".
 */
joolaio.provide = function (name) {
    if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice. This is intended
        // to teach new developers that 'joolaio.provide' is effectively a variable
        // declaration. And when JSCompiler transforms joolaio.provide into a real
        // variable declaration, the compiled JS should work the same as the raw
        // JS--even when the raw JS uses joolaio.provide incorrectly.
        if (joolaio.isProvided_(name)) {
            throw Error('Namespace "' + name + '" already declared.');
        }
        delete joolaio.implicitNamespaces_[name];

        var namespace = name;
        while ((namespace = namespace.substring(0, namespace.lastIndexOf('.')))) {
            if (joolaio.getObjectByName(namespace)) {
                break;
            }
            joolaio.implicitNamespaces_[namespace] = true;
        }
    }

    joolaio.exportPath_(name);
};


if (!COMPILED) {
    /**
     * Object used to keep track of urls that have already been added. This
     * record allows the prevention of circular dependencies.
     * @type {Object}
     * @private
     */
    joolaio.included_ = {};


    /**
     * This object is used to keep track of dependencies and other data that is
     * used for loading scripts
     * @private
     * @type {Object}
     */
    joolaio.dependencies_ = {
        pathToNames: {}, // 1 to many
        nameToPath: {}, // 1 to 1
        requires: {}, // 1 to many
        // used when resolving dependencies to prevent us from
        // visiting the file twice
        visited: {},
        written: {} // used to keep track of script files we have written
    };


    /**
     * Tries to detect whether is in the context of an HTML document.
     * @return {boolean} True if it looks like HTML document.
     * @private
     */
    joolaio.inHtmlDocument_ = function () {
        var doc = joolaio.global.document;
        return typeof doc != 'undefined' &&
            'write' in doc;  // XULDocument misses write.
    };


    /**
     * Tries to detect the base path of the base.js script that bootstraps Closure
     * @private
     */
    joolaio.findBasePath_ = function () {
        if (joolaio.global.CLOSURE_BASE_PATH) {
            joolaio.basePath = joolaio.global.CLOSURE_BASE_PATH;
            return;
        } else if (!joolaio.inHtmlDocument_()) {
            return;
        }
        var doc = joolaio.global.document;
        var scripts = doc.getElementsByTagName('script');

        // Search backwards since the current script is in almost all cases the one
        // that has base.js.
        for (var i = scripts.length - 1; i >= 0; --i) {
            var src = scripts[i].src;
            var qmark = src.lastIndexOf('?');
            var l = qmark == -1 ? src.length : qmark;
            if (src.indexOf('joolaio.js')>-1||src.indexOf('joolaio.min.js')>-1) {
                joolaio.basePath = src.substr(0, l - 9);
                return;
            }
        }
    };


    /**
     * Imports a script if, and only if, that script hasn't already been imported.
     * (Must be called at execution time)
     * @param {string} src Script source.
     * @private
     */
    joolaio.importScript_ = function (src) {
        var importScript = joolaio.global.CLOSURE_IMPORT_SCRIPT ||
            joolaio.writeScriptTag_;
        if (!joolaio.dependencies_.written[src] && importScript(src)) {
            joolaio.dependencies_.written[src] = true;
        }
    };


    /**
     * The default implementation of the import function. Writes a script tag to
     * import the script.
     *
     * @param {string} src The script source.
     * @return {boolean} True if the script was imported, false otherwise.
     * @private
     */
    joolaio.writeScriptTag_ = function (src) {
        if (joolaio.inHtmlDocument_()) {
            var doc = joolaio.global.document;
            doc.write(
                '<script type="text/javascript" src="' + src + '"></' + 'script>');
            return true;
        } else {
            return false;
        }
    };


    /**
     * Resolves dependencies based on the dependencies added using addDependency
     * and calls importScript_ in the correct order.
     * @private
     */
    joolaio.writeScripts_ = function () {
        // the scripts we need to write this time
        var scripts = [];
        var seenScript = {};
        var deps = joolaio.dependencies_;

        function visitNode(path) {
            if (path in deps.written) {
                return;
            }

            // we have already visited this one. We can get here if we have cyclic
            // dependencies
            if (path in deps.visited) {
                if (!(path in seenScript)) {
                    seenScript[path] = true;
                    scripts.push(path);
                }
                return;
            }

            deps.visited[path] = true;

            if (path in deps.requires) {
                for (var requireName in deps.requires[path]) {
                    // If the required name is defined, we assume that it was already
                    // bootstrapped by other means.
                    if (!joolaio.isProvided_(requireName)) {
                        if (requireName in deps.nameToPath) {
                            visitNode(deps.nameToPath[requireName]);
                        } else {
                            throw Error('Undefined nameToPath for ' + requireName);
                        }
                    }
                }
            }

            if (!(path in seenScript)) {
                seenScript[path] = true;
                scripts.push(path);
            }
        }

        for (var path in joolaio.included_) {
            if (!deps.written[path]) {
                visitNode(path);
            }
        }

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i]) {
                joolaio.importScript_(joolaio.basePath + scripts[i]);
            } else {
                throw Error('Undefined script input');
            }
        }
    };


    /**
     * Looks at the dependency rules and tries to determine the script file that
     * fulfills a particular rule.
     * @param {string} rule In the form joolaio.namespace.Class or project.script.
     * @return {?string} Url corresponding to the rule, or null.
     * @private
     */
    joolaio.getPathFromDeps_ = function (rule) {
        if (rule in joolaio.dependencies_.nameToPath) {
            return joolaio.dependencies_.nameToPath[rule];
        } else {
            return null;
        }
    };

    joolaio.findBasePath_();

    // Allow projects to manage the deps files themselves.
    if (!joolaio.global.CLOSURE_NO_DEPS) {
        joolaio.importScript_(joolaio.basePath + 'joolaio.deps.js');
    }
}


/**
 * Builds an object structure for the provided namespace path,
 * ensuring that names that already exist are not overwritten. For
 * example:
 * "a.b.c" -> a = {};a.b={};a.b.c={};
 * Used by joolaio.provide and joolaio.exportSymbol.
 * @param {string} name name of the object that this file defines.
 * @param {*=} opt_object the object to expose at the end of the path.
 * @param {Object=} opt_objectToExportTo The object to add the path to; default
 *     is |joolaio.global|.
 * @private
 */
joolaio.exportPath_ = function (name, opt_object, opt_objectToExportTo) {
    var parts = name.split('.');
    var cur = opt_objectToExportTo || joolaio.global;

    // Internet Explorer exhibits strange behavior when throwing errors from
    // methods externed in this manner.  See the testExportSymbolExceptions in
    // base_test.html for an example.
    if (!(parts[0] in cur) && cur.execScript) {
        cur.execScript('var ' + parts[0]);
    }

    // Certain browsers cannot parse code in the form for((a in b); c;);
    // This pattern is produced by the JSCompiler when it collapses the
    // statement above into the conditional loop below. To prevent this from
    // happening, use a for-loop and reserve the init logic as below.

    // Parentheses added to eliminate strict JS warning in Firefox.
    for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && joolaio.isDef(opt_object)) {
            // last part and we have an object; use it
            cur[part] = opt_object;
        } else if (cur[part]) {
            cur = cur[part];
        } else {
            cur = cur[part] = {};
        }
    }
};


/**
 * Returns an object based on its fully qualified external name.  If you are
 * using a compilation pass that renames property names beware that using this
 * function will not find renamed properties.
 *
 * @param {string} name The fully qualified name.
 * @param {Object=} opt_obj The object within which to look; default is
 *     |joolaio.global|.
 * @return {?} The value (object or primitive) or, if not found, null.
 */
joolaio.getObjectByName = function (name, opt_obj) {
    var parts = name.split('.');
    var cur = opt_obj || joolaio.global;
    for (var part; part = parts.shift();) {
        if (joolaio.isDefAndNotNull(cur[part])) {
            cur = cur[part];
        } else {
            return null;
        }
    }
    return cur;
};


//==============================================================================
// Language Enhancements
//==============================================================================


/**
 * This is a "fixed" version of the typeof operator.  It differs from the typeof
 * operator in such a way that null returns 'null' and arrays return 'array'.
 * @param {*} value The value to get the type of.
 * @return {string} The name of the type.
 */
joolaio.typeOf = function (value) {
    var s = typeof value;
    if (s == 'object') {
        if (value) {
            // Check these first, so we can avoid calling Object.prototype.toString if
            // possible.
            //
            // IE improperly marshals tyepof across execution contexts, but a
            // cross-context object will still return false for "instanceof Object".
            if (value instanceof Array) {
                return 'array';
            } else if (value instanceof Object) {
                return s;
            }

            // HACK: In order to use an Object prototype method on the arbitrary
            //   value, the compiler requires the value be cast to type Object,
            //   even though the ECMA spec explicitly allows it.
            var className = Object.prototype.toString.call(
                /** @type {Object} */ (value));
            // In Firefox 3.6, attempting to access iframe window objects' length
            // property throws an NS_ERROR_FAILURE, so we need to special-case it
            // here.
            if (className == '[object Window]') {
                return 'object';
            }

            // We cannot always use constructor == Array or instanceof Array because
            // different frames have different Array objects. In IE6, if the iframe
            // where the array was created is destroyed, the array loses its
            // prototype. Then dereferencing val.splice here throws an exception, so
            // we can't use joolaio.isFunction. Calling typeof directly returns 'unknown'
            // so that will work. In this case, this function will return false and
            // most array functions will still work because the array is still
            // array-like (supports length and []) even though it has lost its
            // prototype.
            // Mark Miller noticed that Object.prototype.toString
            // allows access to the unforgeable [[Class]] property.
            //  15.2.4.2 Object.prototype.toString ( )
            //  When the toString method is called, the following steps are taken:
            //      1. Get the [[Class]] property of this object.
            //      2. Compute a string value by concatenating the three strings
            //         "[object ", Result(1), and "]".
            //      3. Return Result(2).
            // and this behavior survives the destruction of the execution context.
            if ((className == '[object Array]' ||
                // In IE all non value types are wrapped as objects across window
                // boundaries (not iframe though) so we have to do object detection
                // for this edge case
                typeof value.length == 'number' &&
                    typeof value.splice != 'undefined' &&
                    typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')

                )) {
                return 'array';
            }
            // HACK: There is still an array case that fails.
            //     function ArrayImpostor() {}
            //     ArrayImpostor.prototype = [];
            //     var impostor = new ArrayImpostor;
            // this can be fixed by getting rid of the fast path
            // (value instanceof Array) and solely relying on
            // (value && Object.prototype.toString.vall(value) === '[object Array]')
            // but that would require many more function calls and is not warranted
            // unless closure code is receiving objects from untrusted sources.

            // IE in cross-window calls does not correctly marshal the function type
            // (it appears just as an object) so we cannot use just typeof val ==
            // 'function'. However, if the object has a call property, it is a
            // function.
            if ((className == '[object Function]' ||
                typeof value.call != 'undefined' &&
                    typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('call'))) {
                return 'function';
            }


        } else {
            return 'null';
        }

    } else if (s == 'function' && typeof value.call == 'undefined') {
        // In Safari typeof nodeList returns 'function', and on Firefox
        // typeof behaves similarly for HTML{Applet,Embed,Object}Elements
        // and RegExps.  We would like to return object for those and we can
        // detect an invalid function by making sure that the function
        // object has a call method.
        return 'object';
    }
    return s;
};


/**
 * Safe way to test whether a property is enumarable.  It allows testing
 * for enumerable on objects where 'propertyIsEnumerable' is overridden or
 * does not exist (like DOM nodes in IE). Does not use browser native
 * Object.propertyIsEnumerable.
 * @param {Object} object The object to test if the property is enumerable.
 * @param {string} propName The property name to check for.
 * @return {boolean} True if the property is enumarable.
 * @private
 */
joolaio.propertyIsEnumerableCustom_ = function (object, propName) {
    // KJS in Safari 2 is not ECMAScript compatible and lacks crucial methods
    // such as propertyIsEnumerable.  We therefore use a workaround.
    // Does anyone know a more efficient work around?
    if (propName in object) {
        for (var key in object) {
            if (key == propName &&
                Object.prototype.hasOwnProperty.call(object, propName)) {
                return true;
            }
        }
    }
    return false;
};


/**
 * Safe way to test whether a property is enumarable.  It allows testing
 * for enumerable on objects where 'propertyIsEnumerable' is overridden or
 * does not exist (like DOM nodes in IE).
 * @param {Object} object The object to test if the property is enumerable.
 * @param {string} propName The property name to check for.
 * @return {boolean} True if the property is enumarable.
 * @private
 */
joolaio.propertyIsEnumerable_ = function (object, propName) {
    // In IE if object is from another window, cannot use propertyIsEnumerable
    // from this window's Object. Will raise a 'JScript object expected' error.
    if (object instanceof Object) {
        return Object.prototype.propertyIsEnumerable.call(object, propName);
    } else {
        return joolaio.propertyIsEnumerableCustom_(object, propName);
    }
};


/**
 * Returns true if the specified value is not |undefined|.
 * WARNING: Do not use this to test if an object has a property. Use the in
 * operator instead.  Additionally, this function assumes that the global
 * undefined variable has not been redefined.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is defined.
 */
joolaio.isDef = function (val) {
    return val !== undefined;
};


/**
 * Returns true if the specified value is |null|
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is null.
 */
joolaio.isNull = function (val) {
    return val === null;
};


/**
 * Returns true if the specified value is defined and not null
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is defined and not null.
 */
joolaio.isDefAndNotNull = function (val) {
    // Note that undefined == null.
    return val != null;
};


/**
 * Returns true if the specified value is an array
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
joolaio.isArray = function (val) {
    return joolaio.typeOf(val) == 'array';
};


/**
 * Returns true if the object looks like an array. To qualify as array like
 * the value needs to be either a NodeList or an object with a Number length
 * property.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
joolaio.isArrayLike = function (val) {
    var type = joolaio.typeOf(val);
    return type == 'array' || type == 'object' && typeof val.length == 'number';
};


/**
 * Returns true if the object looks like a Date. To qualify as Date-like
 * the value needs to be an object and have a getFullYear() function.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a like a Date.
 */
joolaio.isDateLike = function (val) {
    return joolaio.isObject(val) && typeof val.getFullYear == 'function';
};


/**
 * Returns true if the specified value is a string
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a string.
 */
joolaio.isString = function (val) {
    return typeof val == 'string';
};


/**
 * Returns true if the specified value is a boolean
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is boolean.
 */
joolaio.isBoolean = function (val) {
    return typeof val == 'boolean';
};


/**
 * Returns true if the specified value is a number
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a number.
 */
joolaio.isNumber = function (val) {
    return typeof val == 'number';
};


/**
 * Returns true if the specified value is a function
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a function.
 */
joolaio.isFunction = function (val) {
    return joolaio.typeOf(val) == 'function';
};


/**
 * Returns true if the specified value is an object.  This includes arrays
 * and functions.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an object.
 */
joolaio.isObject = function (val) {
    var type = joolaio.typeOf(val);
    return type == 'object' || type == 'array' || type == 'function';
};


Date.dateDiff = function (datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = { w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000 };

    return Math.floor(diff / divideBy[datepart]);
};

joolaio.cachestore = [];
joolaio.cache = {};

joolaio.cache.push = function (key, value) {
    var found = false;
    $(joolaio.cachestore).each(function (i, o) {
        if (o.key == key)
            found = true;
    });
    if (!found) {
        joolaio.cachestore.push({key: key, value: value});
    }
}

joolaio.cache.remove = function (key, value) {
    var index = -1;
    $(joolaio.cachestore).each(function (i, o) {
        if (o.key == key)
            index = i;
    })
    joolaio.cachestore.splice(index, 1);
}

joolaio.cache.get = function (key) {
    var result;
    $(joolaio.cachestore).each(function (i, o) {
        if (o.key == key) {
            //console.log('hit');
            //console.log(o);
            result = o;
        }
    })
    return result;
}

function percentageChange(y1, y2) {
    if (y1 == 0)
        return 0;
    return ((y2 - y1) / y1) * 100;
}


function clone(obj) {
    return jQuery.extend(true, {}, obj);
    /*

     // Handle the 3 simple types, and null or undefined
     if (null == obj || "object" != typeof obj) return obj;

     // Handle Date
     if (obj instanceof Date) {
     var copy = new Date();
     copy.setTime(obj.getTime());
     return copy;
     }

     // Handle Array
     if (obj instanceof Array) {
     var copy = [];
     for (i = 0, len = obj.length; i < len; ++i) {
     copy[i] = clone(obj[i]);
     }
     return copy;
     }

     // Handle Object
     if (obj instanceof Object) {
     var copy = {};
     for (var attr in obj) {
     if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
     }
     return copy;
     }

     throw new Error("Unable to copy obj! Its type isn't supported.");
     */
}

joolaio.colors = ['#058DC7', '#ED7E17', '#50B432', '#AF49C5', '#EDEF00', '#8080FF', '#A0A424', '#E3071C', '#6AF9C4', '#B2DEFF', '#64E572', '#CCCCCC' ];
joolaio.offcolors = ['#AADFF3', '#F2D5BD', '#C9E7BE', '#E1C9E8', '#F6F3B1', '#DADBFB', '#E7E6B4', '#F4B3BC', '#AADFF3', '#F2D5BD', '#C9E7BE', '#EEEEEE'];


joolaio.dashboards = [];
joolaio.realtimepanels = [];

joolaio.getDashboard = function () {
    return joolaio.dashboards[0];
};

joolaio.setDashboard = function (dashboard) {
    joolaio.dashboards = [];
    joolaio.dashboards.push(dashboard);
};

joolaio.getRealtimePanel = function () {
    return joolaio.realtimepanels[0];
};

joolaio.setRealtimePanel = function (panel) {
    joolaio.realtimepanels = [];
    joolaio.realtimepanels.push(panel);
};

joolaio.lastState;

joolaio.state = {
    view: '',
    dashboardID: -1,
    panelID: -1,
    reportID: -1,
    fromdate: null,
    todate: null
};

joolaio.inSaveState = false;

joolaio.saveState = function (message) {
    if (!joolaio.managestate)
        return;
    if (joolaio.inSaveState == true) {
        joolaio.debug.log('INFO', 'joolaio', 5, 'Skipping save state (' + message + ')');
        return;
    }

    joolaio.inSaveState = true;
    joolaio.debug.log('INFO', 'joolaio', 5, 'Saving state (' + message + ')');
    //console.log(joolaio.state);

    var guid = guidGenerator().replace(/-/g, '');
    joolaio.state.guid = guid;
    joolaio.lastState = guid;
    joolaio.state.timestamp = new Date();

    //console.log('Saving state (' + message + ') - ' + guid);
    //console.log(joolaio.state);
    if (typeof(localStorage) == 'undefined') {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            //console.log('a', joolaio.inSaveState)
            new joolaio.objects.State().SaveState(this, {id: guid, state: JSON.stringify(joolaio.state)}, function () {
                //console.log('b', joolaio.inSaveState)
                joolaio.debug.log('INFO', 'joolaio', 5, 'State saved (' + guid + ')');
                location.hash = guid;
                setTimeout(function () {
                    joolaio.inSaveState = false;
                }, 500);
            });

            //localStorage.setItem('state_' + guid, JSON.stringify(joolaio.state)); //saves to the database, "key", "value"
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }

        //console.log(JSON.parse(localStorage.getItem('state_' + guid ))); //Hello World!
        // localStorage.removeItem("state"); //deletes the matching item from the database
    }
};

joolaio.loadState = function (guid) {
    if (guid == '')
        return null;

    if (!joolaio.managestate)
        return null;

    joolaio.debug.log('INFO', 'joolaio', 5, 'Loading state (' + guid + ')');
    joolaio.inSaveState = true;
    try {
        var result = new joolaio.objects.State().LoadState(this, {id: guid});
        joolaio.lastState = guid;
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);

        return JSON.parse(result.data);
    }
    catch (ex) {
        return null;
    }
    //return JSON.parse(localStorage.getItem('state_' + guid));
};

function updateState(hash, initialLoad) {
    hash = location.hash.replace('#', '');
    if (hash == '')
        return;
    if (!joolaio.managestate)
        return;
    joolaio.debug.log('INFO', 'joolaio', 5, 'Updating state (' + hash + ')');

    if (hash == joolaio.lastState) {
        joolaio.debug.log('INFO', 'joolaio', 5, 'State hash match.');
    }
    else {
        //console.log('need to load settings');
        //console.log(joolaio.loadState(hash));
        var state = joolaio.loadState(hash);
        if (state) {
            //console.log('loading state', initialLoad);
            //var state = joolaio.loadState(hash);
            //if (state != null){
            joolaio.state = state;

            //}
            //console.log(joolaio.state.guid);
            //console.log(joolaio.state.view);
            //console.log(joolaio.state.dashboardID);

            /*
             if (joolaio.state.view == 'dashboard') {
             var o = new joolaio.dashboard.visualisation.Panel({panelID:joolaio.state.dashboardID});
             o.init(null, null, true, true, false);
             }*/
        }
        //if (!initialLoad) {


        joolaio.visualisation.bootstrap();
        return;

        if (hash == 'dashboard') {
            //console.log('test');
            joolaio.state.view = 'dashboard';
            joolaio.state.dashboardID = -1;
        }
        else if (hash == 'realtime') {
            // console.log('test');
            joolaio.state.view = 'realtime';
            joolaio.state.panelID = -1;
        }
        else if (hash == 'report') {
            //console.log('test');
            joolaio.state.view = 'report';
            joolaio.state.panelID = -1;
            joolaio.state.reportID = -1;
        }
        else if (hash == 'homepage') {
            //console.log('test');
            joolaio.state.view = 'homepage';
            joolaio.state.panelID = -1;
        }

        //console.log(joolaio.state.view);

        if (joolaio.state.view == 'dashboard') {
            //console.log('showing dashboard')
            var o = new joolaio.visualisation.dashboard.Panel({panelID: joolaio.state.dashboardID});
            o.init(null, null, true, true, false);
        }
        if (joolaio.state.view == 'realtime') {
            //console.log('showing realtime')
            var o = new joolaio.visualisation.realtime.Panel({panelID: joolaio.state.panelID});
            o.init(null, null, true, true, false);
        }
        if (joolaio.state.view == 'report') {
            //console.log('showing report')
            var o = new joolaio.visualisation.report.Panel({panelID: joolaio.state.panelID, reportID: joolaio.state.reportID});
            o.init(null, null, true, true, false);
        }
        if (joolaio.state.view == 'homepage') {
            //console.log('showing dashboard')
            joolaio.visualisation.showHomepage();
        }
        //}
    }
}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

joolaio.ajaxCounter = 0;

function supportsLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function purgeCache() {
    localStorage.clear(); //deletes the matching item from the database
}

joolaio.load = function (lib, callback) {
    var bLoadAll = false;
    var bExecuteCallback = false;
    if (typeof lib == 'undefined') {
        bLoadAll = true;
    }

    if (typeof callback != 'function') {
        bExecuteCallback = true;
    }

    //console.log('load');
    joolaio.require('joolaio.visualisation');
}

function callback() {
    //alert('callback');
}

joolaio.contenthost = '[[JOOLAIO-CONTENTHOST]]';
joolaio.hostname = '[[JOOLAIO-HOST]]';

joolaio.endpoints = {
    content: '[[JOOLAIO-ENDPOINT-CONTENT]]',
    query: ('[[JOOLAIO-ENDPOINT-QUERY]]' == '' ? joolaio.hostname : '[[JOOLAIO-ENDPOINT-QUERY]]'),
    api: ('[[JOOLAIO-ENDPOINT-API]]' == '' ? joolaio.hostname : '[[JOOLAIO-ENDPOINT-API]]')
}

var cssPath = 'joolaio.css';
//console.log('host', window.location.hostname);
//console.log('ref', document.
// );

try {
    if (typeof (joolaio.hostname) == 'undefined' || joolaio.hostname == '') {
        var getLocation = function (href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        };

        var scriptSrc = $('script[src*=joolaio\\.js]').attr('src');
        var l = getLocation(scriptSrc);

        //if (Object.prototype.toString.call( l) === '[object Object]')
        joolaio.hostname = window.location.protocol + "//" + window.location.hostname;
        //else
        //    joolaio.hostname = 'http://' + l;
        //console.log(joolaio.hostname);
    }
}
catch (e) {
    console.log('Failed to get script source');
    console.log(e);
}

if (!$('link[href*="' + this.cssPath + '"]').length) {
    $('head').append('<style type="text/css">@import "' + joolaio.contenthost + '/assets/css/' + this.cssPath + '"</style> ');
}

//lookup any containers relevant for the datebox


joolaio.loaded = [];

function group(data, index1, index2) {
    var o;
    var other = {};

    $.each(data, function (i, value) {
        o = data[i][index1][index2];
        if (!(o in other))
            other[o] = [];
        other[o].push(data[i]);
    });
    return other;
}

$(document).ready(function () {
    //throw new Error("Inside doc ready error");

    $.fn.removeCss = function () {
        var removedCss = $.makeArray(arguments);
        return this.each(function () {
            var e$ = $(this);
            var style = e$.attr('style');
            if (typeof style !== 'string') return;
            style = $.trim(style);
            var styles = style.split(/;+/);
            var sl = styles.length;
            for (var l = removedCss.length, i = 0; i < l; i++) {
                var r = removedCss[i];
                if (!r) continue;
                for (var j = 0; j < sl;) {
                    var sp = $.trim(styles[j]);
                    if (!sp || (sp.indexOf(r) === 0 && $.trim(sp.substring(r.length)).indexOf(':') === 0)) {
                        styles.splice(j, 1);
                        sl--;
                    } else {
                        j++;
                    }
                }
            }
            if (styles.length === 0) {
                e$.removeAttr('style');
            } else {
                e$.attr('style', styles.join(';'));
            }
        });
    };

});

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function scrollTop(destino) {
    var delay = 200;
    $('body').animate({scrollTop: '0px'}, delay);
    return true;
}

joolaio.options = {};
joolaio.options.picker = {};
joolaio.options.picker.metrics = {};
joolaio.options.picker.metrics.hideDisabledMetrics = false;
joolaio.options.picker.dimensions = {};
joolaio.options.timeline = {};
joolaio.options.timeline.plotDisabledWhenFiltered = true;