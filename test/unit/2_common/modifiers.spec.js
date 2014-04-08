describe("modifiers", function () {
  it("should format toJSON", function (done) {
    var err = new Error('This is a test error');
    console.log(err.toJSON());
    done();
  });
});