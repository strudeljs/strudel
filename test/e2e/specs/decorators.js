module.exports = {
  customDecorators(browser) {
    browser
      .url('http://localhost:9876/examples/decorators')
      .waitForElementVisible('.count', 5000)
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .click('.control-increment')
      .assert.containsText('.count', '101')
      .click('.control-decrement')
      .assert.containsText('.count', '100')
      .assert.containsText('.counter-increment', '2')
      .assert.containsText('.counter-decrement', '2')
      .end();
  }
};
