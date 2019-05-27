module.exports = {
  lazyRegistration(browser) {
    browser
      .url('http://localhost:9876/examples/dynamic-cmp')
      .waitForElementVisible('.input-container', 5000)
      .assert.containsText('.input-value', 'Start')
      .click('.input-set')
      .assert.containsText('.input-value', 'test')
      .end();
  }
};
