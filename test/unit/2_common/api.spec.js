describe("api", function () {
  before(function () {
    this._enabled = joolaio.options.debug.enabled;
    this.joolaioHost = 'http://joola-io-example.herokuapp.com:80';
  });

  it("should fetch api", function (done) {
    $.get(this.joolaioHost + '/system/version?APIToken=apitoken-demo', function (data, status) {
      if (status !== 'success')
        return done(err);
      return done();
    });
  });
});