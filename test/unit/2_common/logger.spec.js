describe("logger", function () {
  before(function () {
    this._enabled = joolaio.options.debug.enabled;
    joolaio.options.debug.enabled = true;
  });

  it("should output log message [silly]", function () {
    joolaio.logger.silly('test log message');
  });

  it("should output log message [debug]", function () {
    joolaio.logger.debug('test log message');
  });

  it("should output log message [info]", function () {
    joolaio.logger.info('test log message');
  });

  it("should output log message [warn]", function () {
    joolaio.logger.warn('test log message');
  });

  it("should output log message [error]", function () {
    joolaio.options.isBrowser = true; //check also other routes for coverage.
    console.debug = console.log;
    joolaio.logger.error('test log message');
  });

  it("should output log message [json]", function () {
    joolaio.logger.silly({test: 'log message'});
  });

  after(function () {
    joolaio.options.debug.enabled = this._enabled;
  });
});