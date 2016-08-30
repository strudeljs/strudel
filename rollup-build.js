import { rollup } from 'rollup';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

rollup({
  entry: 'src/main.js',
}).then(bundle => bundle.write({
  dest: 'dist/strudel.js',
  format: 'es'
})).catch(error => console.log(error));

rollup({
  entry: 'src/main.js',
  // plugins: [
  //   uglify({}, minify)
  // ]
}).then(bundle => bundle.write({
  dest: 'dist/strudel.min.js',
  format: 'es'
})).catch(error => console.log(error));
