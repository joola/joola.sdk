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
        - [`fetch(options, [callback])`](#joolaioqueryfetchoptions-callback)
            - [Timeframes](#timeframes)
            - [Intervals](#intervals)
            - [Filters](#filters)
            - [Calculated Metrics](#calculated-metrics)
            - [Dimension/Metric Transformations](#intervals)
    - [`viz`](#joolaioviz)
        - [`viz` overview](#viz-overview)
        - [`Metric(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`MiniTable(options, [callback])`](#joolaio-viz-minitableoptions-callback)
        - [`Pie(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Sparkline(options, [callback])`](#joolaio-viz-metricoptions-callback)
        - [`Geo(options, [callback])`](#joolaio-viz-geooptions-callback)
        - [`PunchCard(options, [callback])`](#joolaio-viz-punchcardoptions-callback)
		- [Timezones](#timezones)
        
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
  - `collection` - a string specifying the collection to take the metric from.
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

Timeframes provide a shorthand for specifying the query from/to dates. The full representation of a timeframe is:
```js
{
	start: new Date(2014, 1, 14),
	end: new Date(2014, 1, 14, 23, 59, 59, 999)
}
```
We took the more common timeframes and created a shorthand string for them. There are three main groups of timeframes: `this`, `last` and `previous`:

- `this_n_seconds` - creates a timeframe with all of the current second and the previous completed n-1 seconds
- `this_n_minutes` - creates a timeframe with all of the current minute and the previous completed n-1 minutes
- `this_n_hours` - creates a timeframe with all of the current hour and the previous completed n-1 hours
- `this_n_days` - creates a timeframe with all of the current day and the previous completed n-1 days
- `this_n_months` - creates a timeframe with all of the current month and the previous completed n-1 months
- `this_n_years` - creates a timeframe with all of the current year and the previous completed n-1 years
- `last_n_second` - creates a timeframe with the start of `n` seconds before the most recent second and an end at the most recent second. Example: if right now it is 08:30:43.555 and we use “last_3_seconds”, this will result in a timeframe of 08:30:40 until 08:30:43.
- `last_n_minute` - creates a timeframe with the start of `n` minutes before the most recent second and an end at the most recent second. Example: if right now it is 08:30:43 and we use “last_3_minutes”, this will result in a timeframe of 08:27:43 until 08:30:43.
- `last_n_hour`- creates a timeframe with the start of `n` hours before the most recent second and an end at the most recent second. Example: if right now it is 08:30:43 and we use “last_3_hours”, this will result in a timeframe of 05:30:43 until 08:30:43.
- `last_n_day` - creates a timeframe with the start of `n` days before the most recent second and an end at the most recent second. Example: if right now it is 2014-02-14 08:30:43 and we use “last_3_days”, this will result in a timeframe of 2014-02-11 08:30:43 until 201-02-14 08:30:43.
- `last_n_month` - creates a timeframe with the start of `n` months before the most recent second and an end at the most recent second. Example: if right now it is 2014-02-14 08:30:43 and we use “last_3_months”, this will result in a timeframe of 2013-11-14 08:30:43 until 201-02-14 08:30:43.
- `last_n_years` - creates a timeframe with the start of `n` years before the most recent second and an end at the most recent second. Example: if right now it is 2014-02-14 08:30:43 and we use “last_3_years”, this will result in a timeframe of 2011-02-14 08:30:43 until 201-02-14 08:30:43.
- `previous_n_second` - creates a timeframe with the start of `n` seconds before the most recent complete second and an end at the most recent complete second. Example: if right now it is 08:30:43.555 and we use “previous_3_seconds”, this will result in a timeframe of 08:30:40 until 08:30:43.
- `previous_n_minute` - creates a timeframe with the start of `n` minutes before the most recent complete minute and an end at the most recent complete minute. Example: if right now it is 08:30:43 and we use “previous_7_minutes”, this will result in a timeframe of 08:23 until 08:30.
- `previous_n_hour` - creates a timeframe with the start of `n` hours before the most recent complete hour and an end at the most recent complete hour. Example: if right now it is 08:30:43 and we use “previous_3_hours”, this will result in a timeframe of 05:00 until 08:00.
- `previous_n_day` - creates a timeframe with the start of `n` days before the most recent complete minute and an end at the most recent complete day. Example: if right now it is 2014-02-14 08:30:43 and we use “previous_7_days”, this will result in a timeframe of 2014-02-07 until 2014-02-14.
- `previous_n_month` - creates a timeframe with the start of `n` months before the most recent complete month and an end at the most recent complete month. Example: if right now it is 2014-02-14 08:30:43 and we use “previous_4_months”, this will result in a timeframe of 2013-10-01 until 2014-02-01.
- `previous_n_years` - creates a timeframe with the start of `n` years before the most recent complete year and an end at the most recent complete year. Example: if right now it is 2014-02-14 08:30:43 and we use “previous_3_years”, this will result in a timeframe of 2011-01-01 until 2014-01-01.

###### Synonyms
- `today` - synonym for `this_day`.
- `yesterday` - synonym for `previous_1_day`.
- `this_second` - synonym for `this_1_second`.
- `this_minute` - synonym for `this_1_minute`.
- `this_hour` - synonym for `this_1_hour`.
- `this_day` - synonym for `this_1_day`.
- `this_month` - synonym for `this_1_month`.
- `this_year` - synonym for `this_1_year`.
- `last_second` - synonym for `last_1_second`.
- `last_minute` - synonym for `last_1_minute`.
- `last_hour` - synonym for `last_1_hour`.
- `last_day` - synonym for `last_1_day`.
- `last_month` - synonym for `last_1_month`.
- `last_year` - synonym for `last_1_year`.
- `previous_second` - synonym for `previous_1_second`.
- `previous_minute` - synonym for `previous_1_minute`.
- `previous_hour` - synonym for `previous_1_hour`.
- `previous_day` - synonym for `previous_1_day`.
- `previous_month` - synonym for `previous_1_month`.
- `previous_year` - synonym for `previous_1_year`.

##### Intervals

Intervals are based on the document's [timebucket](#), and the following are available: `second`, `minute`, `hour`, `day`, `month` and `year`.

Also, there are two additional special attributes: 
- `timebucket.dow` stores the day of week
- `timebucket.hod` stored the hour the day
This two can be used when looking to compose visualizations or results based on day of week/hour of day, such as the [PunchCard](#joolaio-viz-punchcardoptions-callback) visualization.

##### Filters

Filters are used to set a query criteria. The syntax is simple and can is based on an array of the following:
- `attribute` - the name of the document attribute to test against the `match`. For example, `user.username`.
- `operator` - the operator to apply between the attribute and the match, here are the supported operators:
	- `eq` - Matches values that are equal to the value specified in `match`.
	- `gt` - Matches values that are greater than the value specified in `match`.
	- `gte` - Matches values that are equal to or greater than the value specified in `match`.
	- `in` - Matches any of the values that exist in an array specified in `match`.
	- `lt` - Matches values that are less than the value specified in `match`.
	- `lte` - Matches values that are less than or equal to the value specified in `match`.
	- `ne` - Matches all values that are not equal to the value specified in `match`.
	- `nin` - Matches values that *do not exist* in an array specified in `match`.
	- `regex` - Selects documents where `attribute` match a specified regular expression.
- `match` - a string or array containing values to test `attribute` against using the `operator`.

```js
var query = {
  timeframe: 'last_hour',
  interval: 'minute',
  dimensions: [],
  metrics: {
    key: 'visits',
    name: 'Visit Count'
  },
  filter: [
  	['user.username', 'eq', 'thisisme']
  ]
};

joolaio.query.fetch(query, function(err, results) {
  console.log('We have results, count: ', results.documents.length);
});
```


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
    name: 'Visit Count',
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


## Timezones
All documents are stored with their timestamp and timezone.
Pushing a new document via `joolaio.beacon.insert` with `timestamp=null` will result in the server generating a `new Date()` timestamp and allocating it for you.


***


## Contributing
We would love to get your help! We have outlined a simple [Contribution Policy][18] to support a transparent and easy merging
of ideas, code, bug fixes and features.

If you're looking for a place to start, you can always go over the list of [open issues][17], pick one and get started.
If you're feeling lost or unsure, [just let us know](#Contact).

## Contact
Contacting us is easy, ping us on one of these:

- [@joolaio][19]
- [info@joo.la][20]
- \#joola.io on irc.freenode.net
- You can even fill out a [form][21].

## License
Copyright (c) 2012-2013 Joola Smart Solutions. GPLv3 Licensed, see [LICENSE][24] for details.


[1]: https://coveralls.io/repos/joola/joola.io.sdk/badge.png?branch=develop
[2]: https://coveralls.io/r/joola/joola.io.sdk?branch=develop
[3]: https://travis-ci.org/joola/joola.io.sdk.png?branch=develop
[4]: https://travis-ci.org/joola/joola.io.sdk?branch=develop
[17]: http://https://joolatech.atlassian.net/browse/JARVIS
[18]: https://github.com/joola/joola.io/blob/master/CONTRIBUTING.md
[19]: http://twitter.com/joolaio
[20]: mailto://info@joo.la
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