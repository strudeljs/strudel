const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const uglify = require('uglify-js');
const version = require('../package.json').version;

const banner =
  '/*!\n' +
  ' * Strudel.js v' + (process.env.VERSION || version) + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' Mateusz Łuczak\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const builds = [
  {
    moduleName: 'Strudel',
    entry: './src/main.js',
    format: 'umd',
    dest: './dist/strudel.js',
    banner,
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    moduleName: 'Strudel',
    entry: './src/main.js',
    format: 'umd',
    dest: './dist/strudel.min.js',
    banner,
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    entry: './src/main.js',
    format: 'es',
    dest: './dist/strudel.es.js',
    banner
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
  const isProd = /min\.js$/.test(config.dest);
  rollup.rollup(config).then((bundle) => {
    const code = bundle.generate(config).code;
    if (isProd) {
      var minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
          fromString: true,
          output: {
            screw_ie8: true,
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
      return write(config.dest, minified, true);
    } else {
      return write(config.dest, code);
    }
  });
});


