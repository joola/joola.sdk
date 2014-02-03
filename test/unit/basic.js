var joolaio = require('../../index.js');

joolaio.init({APIToken: '12345', host: 'http://localhost:8080'}, function (err) {
  if (err)
    throw err;

  console.info('joola.io SDK ready, version: ' + joolaio.VERSION + ', token: ' + joolaio.TOKEN);
  var reader =
  {
    "username": "reader",
    "_password": "password",
    "_roles": ["reader"],
    "displayName": "reader user",
    "organization": "test123",
    "APIToken": '123'
  };

  joolaio.dispatch.users.add("test123", reader, function (err, res) {
    console.log(err, res)
  });
});