/* eslint-disable */

const path = require('path')
const spawn = require('cross-spawn')
const httpServer = require('http-server')
const server = httpServer.createServer({
  root: path.resolve(__dirname, '../../')
})

server.listen(9001)

let args = process.argv.slice(2)
if (args.indexOf('--config') === -1) {
  args = args.concat(['--config', 'test/e2e/config.js']);
}
if (args.indexOf('--env') === -1) {
  args = args.concat(['--env', 'chrome']);
}
const i = args.indexOf('--test');
if (i > -1) {
  args[i + 1] = 'test/e2e/specs/' + args[i + 1] + '.js';
}

const runner = spawn('./node_modules/.bin/nightwatch', args, {
  stdio: 'inherit'
});

runner.on('exit', (code) => {
  server.close();
  process.exit(code);
});

runner.on('error', (err) => {
  server.close();
  throw err;
});
