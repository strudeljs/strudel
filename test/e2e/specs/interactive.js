module.exports = {
  interactive(browser) {
    browser
      .url('http://localhost:9876/examples/interactive')
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('.message')
      .click('.clicker__btn')
      .assert.elementPresent('.message')
      .click('.clicker__btn')
      .assert.elementPresent('.message:nth-child(2)')
      .end();
  }
};
