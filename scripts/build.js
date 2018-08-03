const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
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

const builds = [
  {
    moduleName: 'Strudel',
    entry: './src/index.js',
    format: 'umd',
    dest: './dist/strudel.js',
    env: 'development',
    banner,
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        __VERSION__: version
      })
    ]
  },
  {
    moduleName: 'Strudel',
    entry: './src/index.js',
    format: 'umd',
    dest: './dist/strudel.min.js',
    env: 'production',
    banner,
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        __VERSION__: version
      })
    ]
  },
  {
    entry: './src/index.js',
    format: 'es',
    dest: './dist/strudel.es.js',
    banner,
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
  const isProd = /min\.js$/.test(config.dest);

  if (config.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(config.env)
    }));
    delete config.env;
  }


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


