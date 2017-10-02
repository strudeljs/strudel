module.exports = {
  tabs(browser) {
    browser
      .url('http://localhost:9876/examples/tabs')
      .waitForElementVisible('body', 1000)
      .assert.visible('#home')
      .click('#profile-tab')
      .assert.visible('#profile')
      .end();
  }
};
