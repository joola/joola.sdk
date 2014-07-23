describe("system", function () {
  before(function (done) {
    this.uid = joola.common.uuid();
    done();
  });

  it("should get the version", function (done) {
    joola.system.version(function (err, version) {
      if (err)
        return done(err);

      expect(version).to.be.ok;
      done();
    });
  });

  it("should get the node UID", function (done) {
    joola.system.nodeUID(function (err, uid) {
      if (err)
        return done(err);

      expect(uid).to.be.ok;
      done();
    });
  });

  xit("should get the node list", function (done) {
    joola.system.nodeList(function (err, list) {
      if (err)
        return done(err);

      expect(list).to.be.ok;
      done();
    });
  });

  it("should get the node details", function (done) {
    joola.system.nodeDetails(function (err, details) {
      if (err)
        return done(err);

      expect(details).to.be.ok;
      done();
    });
  });

  xit("should list the connected clients", function (done) {
    joola.system.connectedClients(function (err, clients) {
      if (err)
        return done(err);

      expect(clients).to.be.ok;
      done();
    });
  });

  xit("should blacklist an ip", function (done) {
    joola.system.blacklist('255.255.255.255', true, 0, function (err) {
      if (err)
        return done(err);

      done();
    });
  });

  xit("should remove blacklisted ip", function (done) {
    joola.system.blacklist('255.255.255.255', false, 0, function (err) {
      if (err)
        return done(err);

      done();
    });
  });

  xit("should blacklist an ip with ttl", function (done) {
    joola.system.blacklist('255.255.255.255', true, 1000, function (err) {
      if (err)
        return done(err);

      //TODO: Check expired
      done();
    });
  });

  xit("should purge the cache", function (done) {
    joola.system.purgeCache(function (err) {
      if (err)
        return done(err);

      done();
    });
  });
});