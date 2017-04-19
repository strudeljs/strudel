const fs = require('fs');
const path = require('path');
const register = require('babel-core/register');
const chai = require('chai');

const rcPath = path.join(__dirname, '../..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);

register(config);
global.expect = chai.expect;
