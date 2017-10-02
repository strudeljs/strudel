const path = require('path');

const CIRCLE_BUILD_NUM = process.env.CIRCLE_BUILD_NUM;
const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_commands_path: ['node_modules/nightwatch-helpers/commands'],
  custom_assertions_path: ['node_modules/nightwatch-helpers/assertions'],
  globals_path: path.join(__dirname, 'globals.js'),
  test_workers: false,

  test_settings: {
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: SAUCE_USERNAME,
      access_key: SAUCE_ACCESS_KEY,
      desiredCapabilities: {
        build: `build-${CIRCLE_BUILD_NUM}`,
        'tunnel-identifier': CIRCLE_BUILD_NUM
      }
    },

    chrome56: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '56.0',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    ie11: {
      integration: true,
      desiredCapabilities: {
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.103',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox51: {
      integration: true,
      desiredCapabilities: {
        browserName: 'firefox',
        platform: 'Windows 10',
        version: '51.0',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    safari10: {
      integration: true,
      desiredCapabilities: {
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '10.0',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
