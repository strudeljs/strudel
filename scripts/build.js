const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const uglify = require('uglify-js');
const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ' * Strudel.js v' + (process.env.VERSION || version) + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' Mateusz Łuczak\n' +
  ' * Released under the MIT License.\n' +
  ' */';

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const builds = [
  {
    input: './src/index.js',
    output: {
      file: './dist/strudel.js',
      name: 'Strudel',
      format: 'umd',
      banner
    },
    plugins: [
      buble({
        exclude: 'node_modules/**'
      }),
      replace({
        __VERSION__: version
      })
    ]
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/strudel.min.js',
      name: 'Strudel',
      format: 'umd',
      banner,
    },
    plugins: [
      buble({
        exclude: 'node_modules/**'
      }),
      replace({
        __VERSION__: version
      })
    ]
  },
  {
    input: './src/index.js',
    output: {
      format: 'es',
      file: './dist/strudel.esm.js',
      banner,
    },
    plugins: [
      replace({
        __VERSION__: version
      })
    ]
  }
];

const yellow = (str) => {
  return '\x1b[1m\x1b[33m' + str + '\x1b[39m\x1b[22m';
}

const getSize = (code) => {
  return (code.length / 1024).toFixed(2) + 'kb'
}

const write = (dest, code, zip) => {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(yellow(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(' (gzipped: ' + getSize(zipped) + ')');
        })
      } else {
        report();
      }
    })
  })
}

builds.forEach((config) => {
  const output = config.output;
  const { file, banner } = output;
  const isProd = /min\.js$/.test(file);
  rollup.rollup(config)
    .then((bundle) => bundle.generate(output))
    .then(({ code }) => {
      if (isProd) {
        var minified = (banner ? banner + '\n' : '') + uglify.minify(code, {
            output: {
              ascii_only: true
            },
            compress: {
              pure_funcs: ['makeMap']
            }
          }).code
        return write(file, minified, true);
      } else {
        return write(file, code);
      }
    });
});


