module.exports = {
  static(browser) {
    browser
      .url('http://localhost:9876/examples/static')
      .waitForElementVisible('.count', 5000)
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .click('.control-remove')
      .assert.containsText('.count', '-1')
      .end();
  }
};
