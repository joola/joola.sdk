# joola.io.sdk [![Build Status][3]][4] [![Coverage Status][1]][2]

| **[API Docs] [apidocs]**     | **[joola.io Docs] [techdocs]**     | **[Issues] [issues]**     | **[Contributing] [contributing]**           | **[About] [about]**     |
|-------------------------------------|-------------------------------|-------------------------------------|---------------------------------------------|-------------------------------------|
| [![i2] [roadmap-image]] [apidocs] | [![i1] [techdocs-image]] [techdocs] | [![i6] [issues-image]] [issues] | [![i4] [contributing-image]] [contributing] | [![i5] [about-image]] [about] |

<img src="http://i.imgur.com/Kx6l8s3.png" alt="joola.io logo" title="joola.io" align="right" />

**joola.io.sdk** is used to communicate with the [**joola.io server**][21], the mass-scale data analytics and visualization framework. Use the SDK to push, query, analyze and visualize data.

### Getting the SDK

**Option 1:** Include `joola.io.sdk` in your HTML.
```html
<script src="http://localhost:8080"></script>
<script>
  console.log(joolaio.VERSION);
</script>
```

*Optional:* if you'll include `?APIToken=XXXXXX`, you'll be able to use joola.io.sdk without calling `init`.

**Option 2:** Require the SDK `require('joola.io.sdk');`
```bash
$ npm install joola.io.sdk
```
```js
var joolaio = require('joola.io.sdk');
console.log(joolaio.VERSION);
```

### Quick Example
```html
<!DOCTYPE html>
<html>
<head></head>
<body>

<div id="metric-visits"></div>

<script src="http://localhost:8080/joola.io.js?APIToken=12345"></script>
<script>
  joolaio.events.on('ready', function () {
    joolaio.beacon.insert('visits', {username: 'thisisme', visits: 1});
    new joolaio.viz.Metric({
      container: '#metric-visits',
      query: {
        timeframe: 'last_hour',
        interval: 'minute',
        dimensions: [],
        metrics: ['visits']
      }
    });
  });
</script>
</body>
</html>
```

### SDK API
- [`joolaio`](#joolaio)
    - [`joolaio` properties](#joola-properties)
    - [`init(options, [callback])`](#initoptions-callback)
    - [Init options](#init-options)
    - [`beacon`](#joolaiobeacon)
        - [`insert(collection, documents, [callback])`](#joolaiobeaconinsertcollection-documents-callback)
            - [Collection processing](#collection-processing)
            - [Document processing](#document-processing)
        - [`update(collection, key, document, [callback])`](#joolaio-beacon-update-collection-key-document-callback)
        - [`find(collection, query, [callback])`](#joolaio-beacon-find-collection-query-callback)
        - [`delete(collection, query, [callback])`](#joolaio-beacon-delete-collection-query-callback)
    - [`query`](#joolaioquery)
        - [`fetch(options, [callback])`](#joolaio-query-fetchoptions-callback)
        - [`raw(options, [callback])`](#joolaio-query-rawoptions-callback)
    - [`viz`](#joolaioviz)
        - [`Metric(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`MiniTable(options, [callback])`](#joolaio-viz-minitableoptions-callback)
        - [`Pie(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Sparkline(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Geo(options, [callback])`](#joolaio-viz-geooptions-callback)
        - [`PunchCard(options, [callback])`](#joolaio-viz-metricoptions-callback)
        
## `joolaio`

### `joolaio` properties

joola.io has the following properties:
- `options` object containing all options used by the SDK for its operation.
- `VERSION` holds the current SDK version.
- `USER` holds the currently connected `user` object.

### `init(options, [callback])`

Connects to a joola.io server with the following arguments:

- `options` - An object with the host configuration as described in [init options](#init-options).
- `callback` - If provided, `callback(err)` is called once the SDK is ready. If an error as occurred then `err` will contain the details.

```js
var joolaio = require('joola.io.sdk');
joolaio.init({host: 'http://localhost:8080', APIToken: '12345'}, function(err) {
  if (err)
    throw err;
  console.log('joola.io initialized', joolaio.VERSION);
});
```

### Init options

When creating a server instance, the following options configure the server's behavior:

- `host` - the hostname or IP address of the joola.io server. Set to `127.0.0.1` or `localhost` if you're running on the same host as your joola.io server.
- `token` - if using server-side authentication, then the token generated via [`joola.auth.generateToken`](https://github.com/joola/joola.io/wiki/lib%5Cauth%5Cindex%20(jsdoc)).
- `APIToken` - the API Token to use when exchanging data with the server.

### `joolaio.beacon`

Used to store, retrieve, update and delete documents within a [collection](http://github.com/joola/joola.io/wiki/Collections).   
A valid document is any JSON valid document. 

#### `joolaio.beacon.insert(collection, documents, [callback])`

Insert a document or an array of documents into the provided `collection`. Upon completion, `callback(err, documents)` is called.

- `collection` - the name of the collection to write the document into.
- `documents` - A JSON object, or an array of JSON objects describing the information to store.
- `callback(err, documents)` - called on completion with `err` containing any errors raised or null. `documents` contain an array of JSON objects, one for every sent document, however they now contain additional flags relating to the save process.


##### Collection processing


##### Document processing




[1]: https://coveralls.io/repos/joola/joola.io.sdk/badge.png?branch=develop
[2]: https://coveralls.io/r/joola/joola.io.sdk?branch=develop
[3]: https://travis-ci.org/joola/joola.io.sdk.png?branch=develop
[4]: https://travis-ci.org/joola/joola.io.sdk?branch=develop

[21]: http://github.com/joola/joola.io/
[22]: http://joola.io/

[about-image]: https://github.com/joola/joola.io/wiki/images/about.png
[techdocs-image]: https://github.com/joola/joola.io/wiki/images/techdocs.png
[setup-image]: https://github.com/joola/joola.io/wiki/images/setup.png
[roadmap-image]: https://github.com/joola/joola.io/wiki/images/roadmap.png
[contributing-image]: https://github.com/joola/joola.io/wiki/images/contributing.png
[issues-image]: https://github.com/joola/joola.io/wiki/images/issues.png

[about]: https://github.com/joola/joola.io/wiki/joola.io-overview
[techdocs]: https://github.com/joola/joola.io/wiki/Technical-documentation
[apidocs]: #sdk-api
[setup]: #getting-the-sdk
[roadmap]: https://github.com/joola/joola.io/wiki/Product-roadmap
[contributing]: https://github.com/joola/joola.io/wiki/Contributing
[issues]: https://github.com/joola/joola.io.sdk/issues