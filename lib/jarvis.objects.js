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
 * @fileoverview File for Jarvis Client SDK JS Library (Jarvis).
 * Base class for the jarvis.objects namespace.
 * @author itay@joo.la (itay weinberger)
 */

/**
 * @namespace jarvis.objects
 */


jarvis.provide('jarvis.objects');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

/**
 * Initializes a new APITokens object.
 * @class responsible for communication with Jarvis Analytics Engine for the APITokens Interface
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @param options {object} base settings for the object.
 * @constructor
 */
jarvis.objects;

jarvis.debug.log('INFO', 'jarvis.objects', 6, 'JS source loaded');