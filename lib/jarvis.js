// Copyright 2013 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Bootstrap for Jarvis Client SDK JS Library (Jarvis).
 *
 * In uncompiled mode jarvis.js will dynamically add relevant scripts from the
 * base path. This allows projects to include their own deps file(s) from different locations.
 *
 * @author itay@joo.la (itay weinberger)
 *
 */


/**
 * This is the base namespace for Jarvis Client SDK.
 * @namespace jarvis
 */

var jarvis = jarvis || {};

/**
 * Overridden to true by the compiler when --mark_as_compiled is specified.
 * @type {bool}
 */
var COMPILED = true;

/**
 * The current Jarvis Client SDK version.
 * @type {string}
 */
jarvis.VERSION = '[[JARVIS-VERSION]]';

/**
 * Stores the current Security Token used in the context.
 * @type {string}
 */
jarvis.TOKEN = '[[JARVIS-TOKEN]]';

/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
jarvis.global = this;
/**
 * Indicates if we are manually drawing panels.
 */
jarvis.panelDraw = false;
/**
 * Should the SDK manage the page state.
 */
jarvis.managestate = false;
/**
 * Library load timestamp.
 */
jarvis.loadTimestamp = new Date();

/**
 * Provided as a convenience so that debugging code that should not be included in a production js_binary can be easily stripped by specifying --define jarvis.DEBUG=false to the JSCompiler. For example, most toString() methods should be declared inside an "if (jarvis.DEBUG)" conditional because they are generally used for debugging purposes and it is difficult for the JSCompiler to statically determine whether they are used.
 */
jarvis.DEBUG = true;


/**
 * @property {int} jarvis.DEBUGLEVEL asdasdasd
 */
jarvis.DEBUGLEVEL = 10;


/**
 * Defines the locale being used for compilation. It is used to select locale specific data to be compiled in js binary. BUILD rule can specify this value by "--define jarvis.LOCALE=<locale_name>" as JSCompiler option.
 */
jarvis.LOCALE = 'en';  // default to en

/**
 * HTTP page to Jarvis Analytics Engine Endpoint.
 */
jarvis.JarvisPath = '';//http://edge.jarvisanalytics.com/jarvis';//http://109.64.28.168/Jarvis/';

/**
 * HTTP page to Jarvis Analytics Content Assets.
 */
jarvis.contentPath = '/assets/';// 'http://edge.jarvisanalytics.com/framework/assets/'; //http://109.64.28.168/framework/assets/';
/**
 * Path for included scripts
 * @type {string}
 */
jarvis.svcPath = ''; //'http://edge.jarvisanalytics.com/jarvis/engine/'

/**
 * HTML path to the Engine base API path.
 * @type {string} HTML path to the Engine base API path2.
 */
jarvis.basePath = '/client/api/'; //'http://edge.jarvisanalytics.com/framework/api/'; //http://109.64.28.168/framework/api/';


jarvis.loginRedirectUrl = '[[JARVIS-LOGINREDIRECTURL]]';
if (!jarvis.loginRedirectUrl || jarvis.loginRedirectUrl == 'null')
    jarvis.loginRedirectUrl = null;

/**
 * A hook for overriding the base path.
 * @type {string|undefined}
 */
jarvis.global.CLOSURE_BASE_PATH = '';

jarvis.dateformat = 'mmm dd, yyyy';
jarvis.dateboxcssloaded = false;

/**
 * A function to import a single script. This is meant to be overridden when Jarvis is being run in non-HTML contexts, such as web workers. It's defined in the global scope so that it can be set before jarvis.js is loaded, which allows deps to be imported properly.
 */
jarvis.global.CLOSURE_IMPORT_SCRIPT;
jarvis.bootstrap = eval('[[JARVIS-BOOTSTRAP]]');

jarvis.systemStartDate = null;
jarvis.systemEndDate = null;

/**
 * @define {boolean} Whether to enable the debug loader.
 *
 * If enabled, a call to jarvis.require() will attempt to load the namespace by
 * appending a script tag to the DOM (if the namespace has been registered).
 *
 * If disabled, jarvis.require() will simply assert that the namespace has been
 * provided (and depend on the fact that some outside tool correctly ordered
 * the script).
 */
jarvis.ENABLE_DEBUG_LOADER = true;


//IE Console wrapper
if (typeof console != "undefined") {
    console.log('Jarvis Client SDK Started, version ' + jarvis.VERSION + '.');
    try {
        //if (_gaq && typeof _gaq != "undefined") {
        //    _gaq.push(['_trackPageview', 'jarvis/start']);
        //_gaq.push(['_trackEvent', 'jarvis', 'start', '']);
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
jarvis.nullFunction = function () {
};


/**
 * The identity function. Returns its first argument.
 *
 * @param {...*} var_args The arguments of the function.
 * @return {*} The first argument.
 * @deprecated Use jarvis.functions.identity instead.
 */
jarvis.identityFunction = function (var_args) {
    return arguments[0];
};


/**
 * When defining a class Foo with an abstract method bar(), you can do:
 *
 * Foo.prototype.bar = jarvis.abstractMethod
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
jarvis.abstractMethod = function () {
    throw Error('unimplemented abstract method');
};


/**
 * Adds a {@code getInstance} static method that always return the same instance
 * object.
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
jarvis.addSingletonGetter = function (ctor) {
    ctor.getInstance = function () {
        return ctor.instance_ || (ctor.instance_ = new ctor());
    };
};


if (!COMPILED) {

    /**
     * Check if the given name has been jarvis.provided. This will return false for
     * names that are available only as implicit namespaces.
     * @param {string} name name of the object to look for.
     * @return {boolean} Whether the name has been provided.
     * @private
     */
    jarvis.isProvided_ = function (name) {
        return !jarvis.implicitNamespaces_[name] && !!jarvis.getObjectByName(name);
    };

    /**
     * Namespaces implicitly defined by jarvis.provide. For example, jarvis.provide('jarvis.events.Event') implicitly declares that 'jarvis' and 'jarvis.events' must be namespaces.
     *
     * @type {Object}
     * @private
     */
    jarvis.implicitNamespaces_ = {};
}


/**
 * Adds a dependency from a file to the files it requires.
 * @param {string} relPath The path to the js file.
 * @param {Array} provides An array of strings with the names of the objects
 *                         this file provides.
 * @param {Array} requires An array of strings with the names of the objects
 *                         this file requires.
 */
jarvis.addDependency = function (relPath, provides, requires) {
    if (!COMPILED) {
        var provide, require;
        var path = relPath.replace(/\\/g, '/');
        var deps = jarvis.dependencies_;
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
 * to jarvis.require will be stripped by the JSCompiler when the
 * --closure_pass option is used.
 * @see jarvis.provide
 * @param {string} name Namespace to include (as was given in jarvis.provide())
 *     in the form "jarvis.package.part".
 */
jarvis.require = function (name) {

    // if the object already exists we do not need do do anything
    // TODO(user): If we start to support require based on file name this has
    //            to change
    // TODO(user): If we allow jarvis.foo.* this has to change
    // TODO(user): If we implement dynamic load after page load we should probably
    //            not remove this code for the compiled output
    if (!COMPILED) {
        if (jarvis.isProvided_(name)) {
            return;
        }

        if (jarvis.ENABLE_DEBUG_LOADER) {
            var path = jarvis.getPathFromDeps_(name);
            if (path) {
                jarvis.included_[path] = true;
                jarvis.writeScripts_();
                return;
            }
        }

        var errorMessage = 'jarvis.require could not find: ' + name;
        if (jarvis.global.console) {
            jarvis.global.console['error'](errorMessage);
        }


        throw Error(errorMessage);

    }
};


/**
 * Creates object stubs for a namespace.  The presence of one or more
 * jarvis.provide() calls indicate that the file defines the given
 * objects/namespaces.  Build tools also scan for provide/require statements
 * to discern dependencies, build dependency files (see deps.js), etc.
 * @see jarvis.require
 * @param {string} name Namespace provided by this file in the form
 *     "jarvis.package.part".
 */
jarvis.provide = function (name) {
    if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice. This is intended
        // to teach new developers that 'jarvis.provide' is effectively a variable
        // declaration. And when JSCompiler transforms jarvis.provide into a real
        // variable declaration, the compiled JS should work the same as the raw
        // JS--even when the raw JS uses jarvis.provide incorrectly.
        if (jarvis.isProvided_(name)) {
            throw Error('Namespace "' + name + '" already declared.');
        }
        delete jarvis.implicitNamespaces_[name];

        var namespace = name;
        while ((namespace = namespace.substring(0, namespace.lastIndexOf('.')))) {
            if (jarvis.getObjectByName(namespace)) {
                break;
            }
            jarvis.implicitNamespaces_[namespace] = true;
        }
    }

    jarvis.exportPath_(name);
};


if (!COMPILED) {
    /**
     * Object used to keep track of urls that have already been added. This
     * record allows the prevention of circular dependencies.
     * @type {Object}
     * @private
     */
    jarvis.included_ = {};


    /**
     * This object is used to keep track of dependencies and other data that is
     * used for loading scripts
     * @private
     * @type {Object}
     */
    jarvis.dependencies_ = {
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
    jarvis.inHtmlDocument_ = function () {
        var doc = jarvis.global.document;
        return typeof doc != 'undefined' &&
            'write' in doc;  // XULDocument misses write.
    };


    /**
     * Tries to detect the base path of the base.js script that bootstraps Closure
     * @private
     */
    jarvis.findBasePath_ = function () {
        if (jarvis.global.CLOSURE_BASE_PATH) {
            jarvis.basePath = jarvis.global.CLOSURE_BASE_PATH;
            return;
        } else if (!jarvis.inHtmlDocument_()) {
            return;
        }
        var doc = jarvis.global.document;
        var scripts = doc.getElementsByTagName('script');

        // Search backwards since the current script is in almost all cases the one
        // that has base.js.
        for (var i = scripts.length - 1; i >= 0; --i) {
            var src = scripts[i].src;
            var qmark = src.lastIndexOf('?');
            var l = qmark == -1 ? src.length : qmark;
            if (src.substr(l - 9, 9) == 'Jarvis.js') {
                jarvis.basePath = src.substr(0, l - 9);
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
    jarvis.importScript_ = function (src) {
        var importScript = jarvis.global.CLOSURE_IMPORT_SCRIPT ||
            jarvis.writeScriptTag_;
        if (!jarvis.dependencies_.written[src] && importScript(src)) {
            jarvis.dependencies_.written[src] = true;
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
    jarvis.writeScriptTag_ = function (src) {
        if (jarvis.inHtmlDocument_()) {
            var doc = jarvis.global.document;
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
    jarvis.writeScripts_ = function () {
        // the scripts we need to write this time
        var scripts = [];
        var seenScript = {};
        var deps = jarvis.dependencies_;

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
                    if (!jarvis.isProvided_(requireName)) {
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

        for (var path in jarvis.included_) {
            if (!deps.written[path]) {
                visitNode(path);
            }
        }

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i]) {
                jarvis.importScript_(jarvis.basePath + scripts[i]);
            } else {
                throw Error('Undefined script input');
            }
        }
    };


    /**
     * Looks at the dependency rules and tries to determine the script file that
     * fulfills a particular rule.
     * @param {string} rule In the form jarvis.namespace.Class or project.script.
     * @return {?string} Url corresponding to the rule, or null.
     * @private
     */
    jarvis.getPathFromDeps_ = function (rule) {
        if (rule in jarvis.dependencies_.nameToPath) {
            return jarvis.dependencies_.nameToPath[rule];
        } else {
            return null;
        }
    };

    jarvis.findBasePath_();

    // Allow projects to manage the deps files themselves.
    if (!jarvis.global.CLOSURE_NO_DEPS) {
        jarvis.importScript_(jarvis.basePath + 'jarvis.deps.js');
    }
}


/**
 * Builds an object structure for the provided namespace path,
 * ensuring that names that already exist are not overwritten. For
 * example:
 * "a.b.c" -> a = {};a.b={};a.b.c={};
 * Used by jarvis.provide and jarvis.exportSymbol.
 * @param {string} name name of the object that this file defines.
 * @param {*=} opt_object the object to expose at the end of the path.
 * @param {Object=} opt_objectToExportTo The object to add the path to; default
 *     is |jarvis.global|.
 * @private
 */
jarvis.exportPath_ = function (name, opt_object, opt_objectToExportTo) {
    var parts = name.split('.');
    var cur = opt_objectToExportTo || jarvis.global;

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
        if (!parts.length && jarvis.isDef(opt_object)) {
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
 *     |jarvis.global|.
 * @return {?} The value (object or primitive) or, if not found, null.
 */
jarvis.getObjectByName = function (name, opt_obj) {
    var parts = name.split('.');
    var cur = opt_obj || jarvis.global;
    for (var part; part = parts.shift();) {
        if (jarvis.isDefAndNotNull(cur[part])) {
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
jarvis.typeOf = function (value) {
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
            // we can't use jarvis.isFunction. Calling typeof directly returns 'unknown'
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
jarvis.propertyIsEnumerableCustom_ = function (object, propName) {
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
jarvis.propertyIsEnumerable_ = function (object, propName) {
    // In IE if object is from another window, cannot use propertyIsEnumerable
    // from this window's Object. Will raise a 'JScript object expected' error.
    if (object instanceof Object) {
        return Object.prototype.propertyIsEnumerable.call(object, propName);
    } else {
        return jarvis.propertyIsEnumerableCustom_(object, propName);
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
jarvis.isDef = function (val) {
    return val !== undefined;
};


/**
 * Returns true if the specified value is |null|
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is null.
 */
jarvis.isNull = function (val) {
    return val === null;
};


/**
 * Returns true if the specified value is defined and not null
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is defined and not null.
 */
jarvis.isDefAndNotNull = function (val) {
    // Note that undefined == null.
    return val != null;
};


/**
 * Returns true if the specified value is an array
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
jarvis.isArray = function (val) {
    return jarvis.typeOf(val) == 'array';
};


/**
 * Returns true if the object looks like an array. To qualify as array like
 * the value needs to be either a NodeList or an object with a Number length
 * property.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
jarvis.isArrayLike = function (val) {
    var type = jarvis.typeOf(val);
    return type == 'array' || type == 'object' && typeof val.length == 'number';
};


/**
 * Returns true if the object looks like a Date. To qualify as Date-like
 * the value needs to be an object and have a getFullYear() function.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a like a Date.
 */
jarvis.isDateLike = function (val) {
    return jarvis.isObject(val) && typeof val.getFullYear == 'function';
};


/**
 * Returns true if the specified value is a string
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a string.
 */
jarvis.isString = function (val) {
    return typeof val == 'string';
};


/**
 * Returns true if the specified value is a boolean
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is boolean.
 */
jarvis.isBoolean = function (val) {
    return typeof val == 'boolean';
};


/**
 * Returns true if the specified value is a number
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a number.
 */
jarvis.isNumber = function (val) {
    return typeof val == 'number';
};


/**
 * Returns true if the specified value is a function
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is a function.
 */
jarvis.isFunction = function (val) {
    return jarvis.typeOf(val) == 'function';
};


/**
 * Returns true if the specified value is an object.  This includes arrays
 * and functions.
 * @param {*} val Variable to test.
 * @return {boolean} Whether variable is an object.
 */
jarvis.isObject = function (val) {
    var type = jarvis.typeOf(val);
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

jarvis.cachestore = [];
jarvis.cache = {};

jarvis.cache.push = function (key, value) {
    var found = false;
    $(jarvis.cachestore).each(function (i, o) {
        if (o.key == key)
            found = true;
    });
    if (!found) {
        jarvis.cachestore.push({key: key, value: value});
    }
}

jarvis.cache.remove = function (key, value) {
    var index = -1;
    $(jarvis.cachestore).each(function (i, o) {
        if (o.key == key)
            index = i;
    })
    jarvis.cachestore.splice(index, 1);
}

jarvis.cache.get = function (key) {
    var result;
    $(jarvis.cachestore).each(function (i, o) {
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

jarvis.colors = ['#058DC7', '#ED7E17', '#50B432', '#AF49C5', '#EDEF00', '#8080FF', '#A0A424', '#E3071C', '#6AF9C4', '#B2DEFF', '#64E572', '#CCCCCC' ];
jarvis.offcolors = ['#AADFF3', '#F2D5BD', '#C9E7BE', '#E1C9E8', '#F6F3B1', '#DADBFB', '#E7E6B4', '#F4B3BC', '#AADFF3', '#F2D5BD', '#C9E7BE', '#EEEEEE'];


jarvis.dashboards = [];
jarvis.realtimepanels = [];

jarvis.getDashboard = function () {
    return jarvis.dashboards[0];
};

jarvis.setDashboard = function (dashboard) {
    jarvis.dashboards = [];
    jarvis.dashboards.push(dashboard);
};

jarvis.getRealtimePanel = function () {
    return jarvis.realtimepanels[0];
};

jarvis.setRealtimePanel = function (panel) {
    jarvis.realtimepanels = [];
    jarvis.realtimepanels.push(panel);
};

jarvis.lastState;

jarvis.state = {
    view: '',
    dashboardID: -1,
    panelID: -1,
    reportID: -1,
    fromdate: null,
    todate: null
};

jarvis.inSaveState = false;

jarvis.saveState = function (message) {
    if (!jarvis.managestate)
        return;
    if (jarvis.inSaveState == true) {
        jarvis.debug.log('INFO', 'jarvis', 5, 'Skipping save state (' + message + ')');
        return;
    }

    jarvis.inSaveState = true;
    jarvis.debug.log('INFO', 'jarvis', 5, 'Saving state (' + message + ')');
    //console.log(jarvis.state);

    var guid = guidGenerator().replace(/-/g, '');
    jarvis.state.guid = guid;
    jarvis.lastState = guid;
    jarvis.state.timestamp = new Date();

    //console.log('Saving state (' + message + ') - ' + guid);
    //console.log(jarvis.state);
    if (typeof(localStorage) == 'undefined') {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        try {
            //console.log('a', jarvis.inSaveState)
            new jarvis.objects.State().SaveState(this, {id: guid, state: JSON.stringify(jarvis.state)}, function () {
                //console.log('b', jarvis.inSaveState)
                jarvis.debug.log('INFO', 'jarvis', 5, 'State saved (' + guid + ')');
                location.hash = guid;
                setTimeout(function () {
                    jarvis.inSaveState = false;
                }, 500);
            });

            //localStorage.setItem('state_' + guid, JSON.stringify(jarvis.state)); //saves to the database, "key", "value"
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }

        //console.log(JSON.parse(localStorage.getItem('state_' + guid ))); //Hello World!
        // localStorage.removeItem("state"); //deletes the matching item from the database
    }
};

jarvis.loadState = function (guid) {
    if (guid == '')
        return null;

    if (!jarvis.managestate)
        return null;

    jarvis.debug.log('INFO', 'jarvis', 5, 'Loading state (' + guid + ')');
    jarvis.inSaveState = true;
    try {
        var result = new jarvis.objects.State().LoadState(this, {id: guid});
        jarvis.lastState = guid;
        setTimeout(function () {
            jarvis.inSaveState = false;
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
    if (!jarvis.managestate)
        return;
    jarvis.debug.log('INFO', 'jarvis', 5, 'Updating state (' + hash + ')');

    if (hash == jarvis.lastState) {
        jarvis.debug.log('INFO', 'jarvis', 5, 'State hash match.');
    }
    else {
        //console.log('need to load settings');
        //console.log(jarvis.loadState(hash));
        var state = jarvis.loadState(hash);
        if (state) {
            //console.log('loading state', initialLoad);
            //var state = jarvis.loadState(hash);
            //if (state != null){
            jarvis.state = state;

            //}
            //console.log(jarvis.state.guid);
            //console.log(jarvis.state.view);
            //console.log(jarvis.state.dashboardID);

            /*
             if (jarvis.state.view == 'dashboard') {
             var o = new jarvis.dashboard.visualisation.Panel({panelID:jarvis.state.dashboardID});
             o.init(null, null, true, true, false);
             }*/
        }
        //if (!initialLoad) {


        jarvis.visualisation.bootstrap();
        return;

        if (hash == 'dashboard') {
            //console.log('test');
            jarvis.state.view = 'dashboard';
            jarvis.state.dashboardID = -1;
        }
        else if (hash == 'realtime') {
            // console.log('test');
            jarvis.state.view = 'realtime';
            jarvis.state.panelID = -1;
        }
        else if (hash == 'report') {
            //console.log('test');
            jarvis.state.view = 'report';
            jarvis.state.panelID = -1;
            jarvis.state.reportID = -1;
        }
        else if (hash == 'homepage') {
            //console.log('test');
            jarvis.state.view = 'homepage';
            jarvis.state.panelID = -1;
        }

        //console.log(jarvis.state.view);

        if (jarvis.state.view == 'dashboard') {
            //console.log('showing dashboard')
            var o = new jarvis.visualisation.dashboard.Panel({panelID: jarvis.state.dashboardID});
            o.init(null, null, true, true, false);
        }
        if (jarvis.state.view == 'realtime') {
            //console.log('showing realtime')
            var o = new jarvis.visualisation.realtime.Panel({panelID: jarvis.state.panelID});
            o.init(null, null, true, true, false);
        }
        if (jarvis.state.view == 'report') {
            //console.log('showing report')
            var o = new jarvis.visualisation.report.Panel({panelID: jarvis.state.panelID, reportID: jarvis.state.reportID});
            o.init(null, null, true, true, false);
        }
        if (jarvis.state.view == 'homepage') {
            //console.log('showing dashboard')
            jarvis.visualisation.showHomepage();
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

jarvis.ajaxCounter = 0;

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

jarvis.load = function (lib, callback) {
    var bLoadAll = false;
    var bExecuteCallback = false;
    if (typeof lib == 'undefined') {
        bLoadAll = true;
    }

    if (typeof callback != 'function') {
        bExecuteCallback = true;
    }

    //console.log('load');
    jarvis.require('jarvis.visualisation');
}

function callback() {
    //alert('callback');
}

jarvis.contenthost = '[[JARVIS-CONTENTHOST]]';
jarvis.hostname = '[[JARVIS-HOST]]';

jarvis.endpoints = {
    content: '[[JARVIS-ENDPOINT-CONTENT]]',
    query: ('[[JARVIS-ENDPOINT-QUERY]]' == '' ? jarvis.hostname : '[[JARVIS-ENDPOINT-QUERY]]'),
    api: ('[[JARVIS-ENDPOINT-API]]' == '' ? jarvis.hostname : '[[JARVIS-ENDPOINT-API]]')
}

var cssPath = 'jarvis.css';
//console.log('host', window.location.hostname);
//console.log('ref', document.
// );

try {
    if (typeof (jarvis.hostname) == 'undefined' || jarvis.hostname == '') {
        var getLocation = function (href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        };

        var scriptSrc = $('script[src*=jarvis\\.js]').attr('src');
        var l = getLocation(scriptSrc);

        //if (Object.prototype.toString.call( l) === '[object Object]')
        jarvis.hostname = window.location.protocol + "//" + window.location.hostname;
        //else
        //    jarvis.hostname = 'http://' + l;
        //console.log(jarvis.hostname);
    }
}
catch (e) {
    console.log('Failed to get script source');
    console.log(e);
}

if (!$('link[href*="' + this.cssPath + '"]').length) {
    $('head').append('<style type="text/css">@import "' + jarvis.contenthost + '/assets/css/' + this.cssPath + '"</style> ');
}

//lookup any containers relevant for the datebox


jarvis.loaded = [];

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
