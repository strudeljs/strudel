module.exports = {
  interactive(browser) {
    browser
      .url('http://127.0.0.1:9876/examples/interactive')
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('.message')
      .click('.clicker__btn')
      .assert.elementPresent('.message')
      .click('.clicker__btn')
      .assert.elementPresent('.message:nth-child(2)')
      .end();
  }
};
