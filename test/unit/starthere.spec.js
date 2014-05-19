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
  global.joola = require('../../src/lib/index.js');
  global.uid = joola.common.uuid();
  joolaio.init({host: 'https://joola-io-example.herokuapp.com:443', APIToken: 'apitoken-demo'}, function (err) {
    if (err)
      return done(err);

    done();
  });
});

after(function (done) {
  if (shutdown) {
    shutdown(0, function () {
      return done();
    });
  }
  else
    return done();
});