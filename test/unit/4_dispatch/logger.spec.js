describe("logger", function () {
  before(function (done) {
    return done();
  });

  it("should return an array of logged items", function (done) {
    joola.logger.fetch(function (err, logs) {
      if (err)
        return done(err);

      expect(logs.length).to.be.greaterThan(0);
      return done();
    });
  });

  it("should return an array of logged items from timestamp", function (done) {
    var start_ts = new Date();
    start_ts.setMinutes(start_ts.getMinutes() - 1);
    joola.logger.fetchSince(start_ts, function (err, logs) {
      if (err)
        return done(err);

      expect(logs.length).to.be.greaterThan(0);
      return done();
    });
  });

  it("should return an array of logged items until timestamp", function (done) {
    var end_ts = new Date();
    joola.logger.fetchUntil(end_ts, function (err, logs) {
      if (err)
        return done(err);

      expect(logs.length).to.be.greaterThan(0);
      return done();
    });
  });
});