describe("collections", function () {
  before(function (done) {
    this.workspace = 'root';
    this.collection = 'test-collection-dispatch-' + joola.common.uuid();

    return done();
  });

  it("should return a valid list of collections", function (done) {
    joola.dispatch.collections.list(this.workspace, function (err, collections) {
      if (err)
        return done(err);

      expect(collections).to.be.ok;
      return done();
    });
  });

  it("should add a collection", function (done) {
    var collection = {
      key: this.collection,
      name: this.collection
    };
    joola.dispatch.collections.add(this.workspace, collection, function (err, collection) {
      if (err)
        return done(err);

      expect(collection).to.be.ok;
      return done();
    });
  });

  it("should fail adding an existing collection", function (done) {
    var collection = {
      key: this.collection,
      name: this.collection
    };
    joola.dispatch.collections.add(this.workspace, collection, function (err) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should fail adding collection with incomplete details", function (done) {
    var collection = {
      key: this.collection + '1'
    };
    joola.dispatch.collections.add(this.workspace, collection, function (err) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should update a collection", function (done) {
    var collection = {
      key: this.collection,
      name: this.collection,
      test: 1
    };

    joola.dispatch.collections.patch(this.workspace, collection.key, collection, function (err, _collection) {
      if (err)
        return done(err);

      expect(_collection.test).to.equal(1);
      return done();
    });
  });

  it("should fail updating non existing collection", function (done) {
    var collection = {
      key: this.collection + '1',
      name: this.collection
    };
    joola.dispatch.collections.patch(this.workspace, collection.key, collection, function (err, _collection) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should get a collection", function (done) {
    var self = this;
    joola.dispatch.collections.get(this.workspace, this.collection, function (err, collection) {
      if (err)
        return done(err);

      console.log(collection);

      expect(collection).to.be.ok;
      expect(collection.key).to.equal(self.collection);
      return done();
    });
  });

  it("should get collection stats", function (done) {
    joola.dispatch.collections.stats(this.workspace, this.collection, function (err, stats) {
      if (err)
        return done(err);
      expect(stats).to.be.ok;
      done();
    });
  });

  it("should fail getting stats for non-existing collection", function (done) {
    joola.dispatch.collections.stats(this.workspace, this.collection + '1', function (err) {
      if (err)
        return done();

      done(new Error('This should fail'));
    });
  });

  xit("should get collection min date", function (done) {
    var self = this;
    joola.beacon.insert(this.workspace, this.collection, {timestamp: null}, function (err) {
      if (err)
        return done(err);
      joola.dispatch.collections.mindate(self.workspace, self.collection, null, function (err, mindate) {
        if (err)
          return done(err);

        expect(joola.common.typeof(new Date(mindate))).to.equal('date');
        done();
      });
    });
  });

  it("should fail getting non-existing collection min date", function (done) {
    joola.dispatch.collections.mindate(this.workspace, this.collection + '3', null, function (err) {
      if (err)
        return done();

      done(new Error('This should fail'));
    });
  });

  xit("should get collection max date", function (done) {
    var self = this;
    joola.beacon.insert(this.workspace, this.collection, {timestamp: null}, function (err) {
      if (err)
        return done(err);
      joola.dispatch.collections.maxdate(self.workspace, self.collection, null, function (err, maxdate) {
        if (err)
          return done(err);

        expect(joola.common.typeof(new Date(maxdate))).to.equal('date');
        done();
      });
    });
  });

  it("should fail getting non-existing collection max date", function (done) {
    joola.dispatch.collections.maxdate(this.workspace, this.collection + '3', null, function (err) {
      if (err)
        return done();

      done(new Error('This should fail'));
    });
  });

  it("should delete a collection", function (done) {
    var self = this;
    joola.dispatch.collections.delete(this.workspace, this.collection, function (err) {
      if (err)
        return done(err);

      joola.dispatch.collections.get(self.workspace, self.collection, function (err, collections) {
        if (err)
          return done();

        done(new Error('This should fail'));
      });
    });
  });

  it("should fail deleting a non-existing collection", function (done) {
    joola.dispatch.collections.delete(this.workspace, this.collection, function (err) {
      if (err)
        return done();

      done(new Error('This should fail'));
    });
  });
}); 