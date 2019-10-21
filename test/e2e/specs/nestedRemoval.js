module.exports = {
  nestedRemoval(browser) {
    browser
      .url('http://localhost:9876/examples/nestedRemoval')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.nested-removal-result', '')
      .assert.containsText('.container-removal-result', '')
      .click('.detach-nested')
      .assert.elementNotPresent('.nested', 500)
      .assert.containsText('.nested-removal-result', 'Nested destroyed')
      .click('.reattach-nested')
      .assert.elementPresent('.nested', 500)
      .assert.cssClassPresent('.nested', 'strudel-init')
      .assert.containsText('.nested-removal-result', '')
      .click('.wrap-nested')
      .assert.elementPresent('.nested-wrapper')
      .assert.cssClassPresent('.nested', 'strudel-init')
      .click('.nested-remove')
      .waitForElementNotPresent('.container', 500)
      .assert.containsText('.nested-removal-result', 'Nested destroyed')
      .assert.containsText('.container-removal-result', 'Container destroyed')
      .end();
  }
};
