module.exports = {
  tabs(browser) {
    browser
      .url('http://127.0.0.1:9001/examples/tabs')
      .waitForElementVisible('body', 1000)
      .assert.visible('#home')
      .click('#profile-tab')
      .assert.visible('#profile')
      .end();
  }
};
