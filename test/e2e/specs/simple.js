module.exports = {
  simple(browser) {
    browser
      .url('http://localhost:9876/examples/simple')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.greeter', 'Greetings: User!')
      .end();
  }
};
