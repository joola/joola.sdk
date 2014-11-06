# joola.sdk [![Build Status][3]][4] [![Gitter chat](https://badges.gitter.im/joola/joola.png)](https://gitter.im/joola)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/joola-io.svg)](https://saucelabs.com/u/joola-io)

| **[API Docs] [apidocs]**     | **[joola Docs] [techdocs]**     | **[Issues] [issues]**     | **[Contributing] [contributing]**           | **[About] [about]**     |
|-------------------------------------|-------------------------------|-------------------------------------|---------------------------------------------|-------------------------------------|
| [![i2] [roadmap-image]] [apidocs] | [![i1] [techdocs-image]] [techdocs] | [![i6] [issues-image]] [issues] | [![i4] [contributing-image]] [contributing] | [![i5] [about-image]] [about] |

<img src="https://joo.la/img/logo-profile.png" alt="joola logo" title="joola" align="right" />

**joola.sdk** is a Software Development Kit (SDK) responsible for communication between a client using the SDK and the joola server. If you don't have a [joola][joola] server running yet, [get one up and running in minutes][joola] or open a free account with [free.joola][free.joola].

The SDK can consume ANY endpoint of the joola framework, however for brevity purposes, the API manual below includes only the main topics of:
- [**Pushing data**](http://github.com/joola/joola/wiki/pushing-data) is done by sending an array of JSON documents for storage in joola cache.
- When [**Querying**](http://github.com/joola/joola/wiki/analytics-and-visualization), you describe the data you wish to consume and shape it to your liking. 
- Transform your data into insight using [**Data Visualization**](http://github.com/joola/joola/wiki/analytics-and-visualization).

### Getting the SDK

**Option 1:** Include `joola.sdk` in your HTML.
```html
<script src="http://localhost:8080/joola.js"></script>
<script>
  console.log(joola.VERSION);
</script>
```
*Optional:* if you'll include `?APIToken=XXXXXX`, you'll be able to use joola.sdk without calling `init`.

**Option 2:** Require the SDK `require('joola.sdk');`
```bash
$ npm install http://github.com/joola/joola.sdk/tarball/develop
```
```js
var joola = require('joola.sdk');
console.log(joola.VERSION);
```

### Quick Example
```html
<!DOCTYPE html>
<html>
<head></head>
<body>

<div id="metric-visits"></div>

<script src="http://localhost:8080/joola.js?APIToken=12345"></script>
<script>
  joola.events.on('ready', function () {
    joola.beacon.insert('visits', {username: 'thisisme', visits: 1});
    new joola.viz.Metric({
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

[**Learn more about using the SDK**](http://github.com/joola/joola/wiki/sdk-api-documentation)

## Contributing
We would love to get your help! We have outlined a simple [Contribution Policy][18] to support a transparent and easy merging
of ideas, code, bug fixes and features.

If you're looking for a place to start, you can always go over the list of [open issues][17], pick one and get started.
If you're feeling lost or unsure, [just let us know](#Contact).

## Contact
Contacting us is easy, ping us on one of these:

- [![Gitter chat](https://badges.gitter.im/joola/joola.png)](https://gitter.im/joola)
- [@joola][19]
- [info@joo.la][20]
- You can even fill out a [form][21].

## License
Copyright (c) 2012-2014 Joola Smart Solutions. GPLv3 Licensed, see [LICENSE][24] for details.


[1]: https://coveralls.io/repos/joola/joola.sdk/badge.png?branch=develop
[2]: https://coveralls.io/r/joola/joola.sdk?branch=develop
[3]: https://travis-ci.org/joola/joola.sdk.png?branch=develop
[4]: https://travis-ci.org/joola/joola.sdk?branch=develop
[17]: http://https://joolatech.atlassian.net/browse/JARVIS
[18]: https://github.com/joola/joola/blob/master/CONTRIBUTING.md
[19]: http://twitter.com/joola
[20]: mailto://info@joo.la
[21]: http://github.com/joola/joola/
[22]: http://joola/
[24]: https://github.com/joola/joola/blob/master/LICENSE.md

[about-image]: https://github.com/joola/joola/wiki/images/about.png
[techdocs-image]: https://github.com/joola/joola/wiki/images/techdocs.png
[setup-image]: https://github.com/joola/joola/wiki/images/setup.png
[roadmap-image]: https://github.com/joola/joola/wiki/images/roadmap.png
[contributing-image]: https://github.com/joola/joola/wiki/images/contributing.png
[issues-image]: https://github.com/joola/joola/wiki/images/issues.png

[about]: https://github.com/joola/joola/wiki/joola-overview
[techdocs]: https://github.com/joola/joola/wiki/Technical-documentation
[apidocs]: http://github.com/joola/joola/wiki/sdk
[setup]: #getting-the-sdk
[roadmap]: https://github.com/joola/joola/wiki/Product-roadmap
[contributing]: https://github.com/joola/joola/wiki/Contributing
[issues]: https://github.com/joola/joola.sdk/issues

[joola]: http://joola/
[free.joola]: http://free.joola/
[highcharts]: http://www.highcharts.com
