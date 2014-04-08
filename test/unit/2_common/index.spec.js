describe("common", function () {
  it("should async stringify objects", function (done) {
    var obj = {
      a: 1,
      b: 2
    };

    joolaio.common.stringify(obj, function (err, str) {
      expect(str).to.equal(JSON.stringify(obj));
      done();
    });
  });

  it("should async parse json string", function (done) {
    var obj = {
      a: 1,
      b: 2
    };
    var str = JSON.stringify(obj);

    joolaio.common.parse(str, function (err, _obj) {
      expect(str).to.equal(JSON.stringify(_obj));
      done();
    });
  });

  it("should hash strings correctly", function () {
    var expected = '26207976637e23e1bed51683c33a6d73';
    var actual = joolaio.common.hash('thisisatestforhash');
    expect(actual).to.equal(expected);
  });

  it("should generate uuid - 9 chars long", function () {
    var expected = 9;
    var actual = joolaio.common.uuid().length;
    expect(actual).to.equal(expected);
  });

  it("should generate uuid - unique", function (done) {
    var ids = [];

    for (var i = 0; i < 3200; i++) {
      var uuid = joolaio.common.uuid();
      if (ids.indexOf(uuid) > -1) {
        return done(new Error('Found duplicate uuid [' + uuid + ']'));
      }
      ids.push(uuid);
    }

    return done();
  });

});