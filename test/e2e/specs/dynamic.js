module.exports = {
  dynamic(browser) {
    browser
      .url('http://localhost:9876/examples/dynamic')
      .waitForElementVisible('.count', 5000)
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .end();
  }
};
