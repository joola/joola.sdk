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

joolaio.provide('joolaio.objects');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

/**
 * Initializes a new APITokens object.
 * @class responsible for communication with joolaio Engine for the APITokens Interface
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 * @param options {object} base settings for the object.
 * @constructor
 */
joolaio.objects;

joolaio.debug.log('INFO', 'joolaio.objects', 6, 'JS source loaded');