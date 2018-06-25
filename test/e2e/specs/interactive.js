module.exports = {
  interactive(browser) {
    browser
      .url('http://localhost:9876/examples/interactive')
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('.alert')
      .click('.clicker__btn')
      .assert.elementPresent('.alert')
      .click('.clicker__btn')
      .assert.elementPresent('.alert:nth-child(2)')
      .end();
  }
};
