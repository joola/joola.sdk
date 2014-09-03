describe("logger", function () {
  before(function () {
    this._enabled = joola.options.debug.enabled;
    joola.options.debug.enabled = true;
  });

  it("should output log message [silly]", function () {
    joola.logger.silly('test log message');
  });

  it("should output log message [debug]", function () {
    joola.logger.debug('test log message');
  });

  it("should output log message [info]", function () {
    joola.logger.info('test log message');
  });

  it("should output log message [warn]", function () {
    joola.logger.warn('test log message');
  });

  it("should output log message [error]", function () {
    joola.options.isBrowser = true; //check also other routes for coverage.
    console.debug = console.log;
    joola.logger.error('test log message');
  });

  it("should output log message [json]", function () {
    joola.logger.silly({test: 'log message'});
  });

  after(function () {
    joola.options.debug.enabled = this._enabled;
  });
});