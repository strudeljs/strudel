module.exports = {
  events(browser) {
    browser
      .url('http://localhost:9876/examples/events')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .end();
  }
};
