module.exports = {
  simple(browser) {
    browser
      .url('http://127.0.0.1:9876/examples/simple')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.greeter', 'Greetings: User!')
      .end();
  }
};
