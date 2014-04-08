describe("api", function () {
  before(function () {
    this._enabled = joolaio.options.debug.enabled;
    joolaio.options.debug.enabled = true;
  });

  it("should fetch api", function (done) {
    joolaio.api.fetch('/api/system/nodeDetails', {}, function (err, result) {
      console.log(err, result);
      done();
    });
  });

  it("should fail to fetch api w/ wrong token", function (done) {
    joolaio.api.fetch('/api/system/nodeDetails?token=1234', {}, function (err, result) {
      console.log(err, result);
      done();
    });
  });

  it("should test stringify of different types", function (done) {
    var options = {
      ajax: true
    };
    var objOptions = {
      a: 'test',
      b: 123,
      c: true,
      d: {
        a: 1
      },
      e: []
    };
    joolaio.api.getJSON(options, objOptions, function (err, result) {
      console.log(err, result);
      done();
    });
  });

  it("should test stringify of different string", function (done) {
    var options = {
      ajax: true
    };
    var objOptions = 'test';
    joolaio.api.getJSON(options, objOptions, function (err, result) {
      console.log(err, result);
      done();
    });
  });
});