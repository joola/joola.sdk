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
        - [`update(collection, key, document, [callback])`](#joolaiobeaconupdatecollection-key-document-callback)
    - [`query`](#joolaioquery)
        - [`fetch(options, [callback])`](#joolaio-query-fetchoptions-callback)
            - [Timeframes](#Timeframes)
            - [Intervals](#intervals)
            - [Filters](#intervals)
            - [Calculated Metrics](#intervals)
            - [Dimension/Metric Transformations](#intervals)
        - [`raw(options, [callback])`](#joolaio-query-rawoptions-callback)
    - [`viz`](#joolaioviz)
        - [`viz` overview](#viz-overview)
        - [`Metric(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`MiniTable(options, [callback])`](#joolaio-viz-minitableoptions-callback)
        - [`Pie(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Sparkline(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Geo(options, [callback])`](#joolaio-viz-geooptions-callback)
        - [`PunchCard(options, [callback])`](#joolaio-viz-punchcardoptions-callback)
        
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

```js
joolaio.beacon.insert('visits', {username: 'thisisme', visits: 1}, function(err, saved){
  console.log('Saved document with key: ', saved._key);
});
```

##### Collection processing
It's not required for a collection to be pre-defined before pushing the first document. 
In such a case, the meta of the document, or the top document in case of an array is used to build the collection's meta.

When pushing a document with a new meta, the collection meta will get updated accordingly, however, the collection meta can only be expanded, i.e. more attributes added.
In case that a document with fewer attributes is pushed, no meta change will occur. In order to modify or delete attributes from a collection, please refer to [Collection Management](http://github.com/joola/joola.io/wiki/Collections).

##### Document processing
Documents are processed in the order they are sent, it is highly recommended that whenever possible documents are batched into an array, rather than sent one-by-one.
Each document is assigned with a unique key based on its attributes (not metrics) and this key is checked when inserting new documents to prevent duplicates. Duplicate documents are not allowed and an error will be returned if a duplicate is found.

When joola.io returns the saved document collection via the `callback` of the `joolaio.beacon.insert` call, each document in the array has two additional attributes:
 
 - `saved` bool indicating if the save completed.
 - `error` string containing any error message from the underlying caching database.

#### `joolaio.beacon.update(collection, key, document, [callback])`

Updates a single document matching the provided `key`, the cached document is overwritten with the new `document`. Upon completion, `callback(err, document)` is called.

- `collection` - the name of the collection holding the document for the update.
- `key` - The unique identifier of the document to update.
- `document` - A JSON object describing the information to update.
- `callback(err, document)` - called on completion with `err` containing any errors raised or null. `documents` contain an the updated cached document.

### `joolaio.query`

Used to query and analyze stored documents.

#### `joolaio.query.fetch(query, [callback])`

Query joola.io for a set of documents based on criteria passed in `query`. Upon completion, `callback(err, results)` is called.

`query` holds the following options:

- `timeframe` - timeframe for the query, can be either a [shorthand timeframe](#timeframes) or an object with:
  - `start` - start date for the query.
  - `end` - end date for the query.
- `interval` - a string specifying the [interval](#intervals) for the query.
- `dimensions` - an array of string/object containing definitions for dimensions requested. You can specify the dimension name as `string` literal or use a JSON object with:
  - `key` - the dimension name as passed in the document. Nesting is supported, for example: `user.username`.
  - `name` - a display name for the dimension that can be used by visualizations.
  - `datatype` - date type of the dimension, currently supported: `date`, `string` and `ip`.
  - `transform` - a string containing a javascript function to run on the value before returning results. See [dimension/metric transformations](#dimension-metric-transformations) for more details.
- `metrics` - an array of string/object containing definitions for metrics requested. You can specify the metric name as `string` literal or use a JSON object with:
  - `key` - the metric name as passed in the document. Nesting is supported, for example: `visits.count`.
  - `name` - a display name for the metric that can be used by visualizations.
  - `aggregation` - aggregation type for the metric, currently supported: `sum`, `avg`, `ucount`, `min`, `max`.
  - `prefix` - string to add before the value, for example '$'.
  - `suffix` - string to add after the value, for example 'MB'.
  - `decimals` - number of decimal points to return, for example: 4 will yield 1.1234. 
  - `dependsOn` - if this is a calculated metric, then specify here what is the base metric for the calculation. 
  - `filter` - a [filter](#filters) object.
  - `transform` - a string containing a javascript function to run on the value before returning results. See [dimension/metric transformations](#dimension-metric-transformations) for more details.
  - `formula` - an object containing the formula defintions:
    - `dependsOn` - an array of metric names/objects
    - `run` - a string containing the javascript function to run on the values. See [calculated metrics](#calculated-metrics) for additional information.
- `filter` - An array of [filters](#filters).
- `realtime` - Specify that this is a realtime query and results are expected back from the server every 1 second.

```js
var query = {
  timeframe: 'last_hour',
  interval: 'minute',
  dimensions: [],
  metrics: 'visits'
};

joolaio.query.fetch(query, function(err, results) {
  console.log('We have results, count: ', results.documents.length);
});
```

##### Timeframes

Timeframes provide a shorthand for specifying the query from/to dates. There are three main groups of timeframes: `this`, `last` and `previous`:

- `this_second`
- `this_n_second`
- `this_n_minute`
- `this_n_hour`
- `this_n_day`
- `this_n_month`

- `last_second`
- `last_n_second`
- `last_n_minute`
- `last_n_hour`
- `last_n_day`
- `last_n_month`

- `previous_second`
- `previous_n_second`
- `previous_n_minute`
- `previous_n_hour`
- `previous_n_day`
- `previous_n_month`

##### Intervals

Intervals are based on the document's [timebucket](#), and the following are available: `second`, `minute`, `hour`, `day`, `month` and `year`.

Also, there are two additional special attributes: 
- `timebucket.dow` stores the day of week
- `timebucket.hod` stored the hour the day
This two can be used when looking to compose visualizations or results based on day of week/hour of day, such as the [PunchCard](#joolaio-viz-punchcardoptions-callback) visualization.

##### Filters

##### Calculated Metrics

Calculated metrics offer you the option to query existing metric(s) and based on their values, perform a calculation that is later returned as part of the results.
In order to query a calculated metric you'll need to use the `formula` attribute:
- `dependsOn` - an array of metric names or objects. Each will be passed to the run function according to the order specifying in the array.
- `run` - a string containing a javascript function. The function is called with the metrics specifying in the `dependsOn` parameter and need to return a value which is then returned as part of the result set.

```js
var query = {
  timeframe: 'last_hour',
  interval: 'minute',
  dimensions: [],
  metrics: {
    key: 'visits', 
    name: 'Visit Count,
    formula: {
      dependsOn: ['visits', 'clicks'],
      run: 'function(visits, clicks) { return visits * clicks; }'
    }
};

joolaio.query.fetch(query, function(err, results) {
  console.log('We have results, count: ', results.documents.length);
});
```

##### Dimension/Metric Transformations

Transformations are used to alter the data output's `formattedValue` property, mainly for display purposes.

```js
var query = {
  timeframe: 'last_hour',
  interval: 'minute',
  dimensions: [],
  metrics: {
    key: 'bandwidth',
    name: 'Bandwidth (KB)', 
    transform: 'function(value) { return value / 1024 ; }'
    }
};

joolaio.query.fetch(query, function(err, results) {
  console.log('We have results, count: ', results.documents.length);
});
```








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