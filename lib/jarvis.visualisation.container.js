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
 * A Container Visualisation base class
 * @author itay@joo.la (itay weinberger)
 */

/**
 * @namespace jarvis.visualisation.container
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.visualisation
 */

jarvis.provide('jarvis.visualisation.container');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation');

/**
 * The container visualisation reference
 * @type {object}
 */
jarvis.visualisation.container;

jarvis.debug.log('INFO', 'Jarvis.Visualisation.Container', 6, 'JS source loaded');
