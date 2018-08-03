const base = require('./karma.base.config.js');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  const options = Object.assign(base, {
    browsers: ['ChromeHeadless'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../../coverage', subdir: '.' }
      ]
    },
    singleRun: true,
    plugins: base.plugins.concat([
      'karma-coverage',
      'karma-chrome-launcher'
    ])
  });

  options.webpack.module.rules[0].options = {
    plugins: [['istanbul', {
      exclude: [
        'test/',
        'src/dom/element.js'
      ]
    }]]
  };

  config.set(options);
};
