/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

before(function (done) {
  require('../../index.js').init(
    {
      host: 'http://localhost:8080',
      APIToken: 'apitoken-root',
      debug: {
        enabled: true
      }
    },
    function (err, joola) {
      if (err)
        throw err;

      global.joola = joola;
      global.uid = joola.common.uuid();
      done();
    });
});