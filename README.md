# joola.io.sdk [![Build Status][3]][4] [![Coverage Status][1]][2]

| **[API Docs] [apidocs]**     | **[joola.io Docs] [techdocs]**     | **[Issues] [issues]**     | **[Contributing] [contributing]**           | **[About] [about]**     |
|-------------------------------------|-------------------------------|-------------------------------------|---------------------------------------------|-------------------------------------|
| [![i2] [roadmap-image]] [apidocs] | [![i1] [techdocs-image]] [techdocs] | [![i6] [issues-image]] [issues] | [![i4] [contributing-image]] [contributing] | [![i5] [about-image]] [about] |

<img src="http://i.imgur.com/Kx6l8s3.png" alt="joola.io logo" title="joola.io" align="right" />

**joola.io.sdk** is used to communicate with the [**joola.io server**}][21], the mass-scale data analytics and visualization framework. Use the SDK to push, query, analyze and visualize data.

### Getting the SDK

**Option 1:** Include `joola.io.sdk` in your HTML.
```html
<script src="http://localhost:8080"></script>
<script>
  console.log(joolaio.VERSION);
</script>
```
**Option 2:** Require the SDK `require('joola.io.sdk');`
```bash
$ npm install joola.io.sdk
```
```js
var joolaio = require('joola.io.sdk');
console.log(joolaio.VERSION);
```

## SDK API
- [`joolaio`](#joolaio)
    - [`joolaio` properties](#joola-properties)
    - [`init(options, [callback])`](#initoptions-callback)
    - [Init options](#init-options)
    - [`beacon`](#beacon)
        - [`insert(collection, documents, [callback])`](#joolaio-beacon-insert-collection-documents-callback)
            - [Collection processing](#collection-processing)
            - [Document processing](#document-processing)
            - [Duplicate documents](#duplicate-documents)
        - [`update(collection, key, document, [callback])`](#joolaio-beacon-update-collection-key-document-callback)
        - [`find(collection, query, [callback])`](#joolaio-beacon-find-collection-query-callback)
        - [`delete(collection, query, [callback])`](#joolaio-beacon-delete-collection-query-callback)
    - [`query`](#query)
        - [`fetch(options, [callback])`](#joolaio-query-fetchoptions-callback)
    - [`viz`](#viz)
        - [`Metric(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Pie(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Sparkline(options, [callback])`](#joolaio-viz-metricoptions-callback)
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