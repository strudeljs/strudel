module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'strudel.js',
    path: './dist',
    library: 'Strudel',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-decorators-legacy',
              'external-helpers'
            ],
            presets: [['es2015', { modules: false }]]
          }
        }],
      },
    ],
  },
};
