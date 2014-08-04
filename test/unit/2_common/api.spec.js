describe("api", function () {
  before(function () {
    this._enabled = joola.options.debug.enabled;
    this.joolaHost = 'http://joola-io-example.herokuapp.com:80';
  });

  it("should fetch api", function (done) {
    $.get(this.joolaHost + '/system/version?APIToken=apitoken-demo', function (data, status) {
      if (status !== 'success')
        return done(err);
      return done();
    });
  });
});