module.exports = {
  nestedRemoval(browser) {
    browser
      .url('http://localhost:9876/examples/nestedRemoval')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.removal-result', '')
      .click('.nested-remove')
      .waitForElementNotPresent('.container', 500)
      .assert.containsText('.removal-result', 'destroyed')
      .end();
  }
};
