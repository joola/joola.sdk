describe("globals", function () {
  it("should have sinon defined", function () {
    expect(sinon).to.be.ok;
  });

  it("should have expect defined", function () {
    expect(expect).to.be.ok;
  });

  it("should have underscore defined", function () {
    expect(_).to.be.ok;
  });

  it("should set timezone [0]", function () {
    joola.timezone(0);
  });

  it("should set timezone [2]", function () {
    joola.timezone(2);
  });
});