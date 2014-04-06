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
  require('joola.io').init({}, function (err, joola) {
    if (err)
      return done(err);
    joola.state.on('state:change', function (state) {
      if (state !== 'online')
        return done(new Error('Failed to initialize engine, check logs.'));

      global.joola = require('../../index.js');
      global.uid = joola.common.uuid();
      joolaio.init({host: 'http://127.0.0.1:8080', APIToken: 'apitoken-root'}, function (err) {
        if (err)
          return done(err);
        
        done();
      });
    });
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