module.exports = {
  events(browser) {
    browser
      .url('http://127.0.0.1:9001/examples/events')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .end();
  }
};
