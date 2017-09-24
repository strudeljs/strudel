module.exports = {
  simple(browser) {
    browser
      .url('localhost:8888/simple')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.greeter', 'Greetings: User!')
      .end();
  }
};
