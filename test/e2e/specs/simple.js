module.exports = {
  simple: function (browser) {
    browser
      .url('localhost:8001/simple')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.greeter', 'Greetings: User!')
      .end();
  }
};
