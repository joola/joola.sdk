describe("config", function () {
  before(function (done) {
    this.uid = joola.common.uuid();
    return done();
  });

  it("should set a config value", function (done) {
    joola.config.set('test-config-' + this.uid, 'test', function (err) {
      if (err)
        return done(err);
      return done();
    });
  });

  it("should get config value", function (done) {
    joola.config.get('test-config-' + this.uid, function (err, value) {
      if (err)
        return done(err);

      expect(value.value).to.equal('test');
      return done();
    });
  });

  xit("should get all config", function (done) {
    joola.config.get('*', function (err, config) {
      if (err)
        return done(err);

      expect(config.version).to.be.ok;
      return done();
    });
  });
});