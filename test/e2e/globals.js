const SauceLabs = require('saucelabs');

module.exports = {
  afterEach(client, done) {
    const saucelabs = new SauceLabs({
      username: process.env.SAUCE_USER,
      password: process.env.SAUCE_ACCESS_KEY
    });

    const title = client.currentTest.name;
    const sessionId = client.capabilities['webdriver.remote.sessionid'];
    const passed = client.currentTest.results.failed === 0 && client.currentTest.results.errors === 0;

    saucelabs.updateJob(sessionId, {
      title,
      passed
    }, done);
  }
};
