module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'strudel.js',
    path: __dirname + '/dist',
    library: 'Strudel',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-decorators-legacy'
            ],
            presets: [['es2015', { modules: false }]]
          }
        }],
      },
    ],
  },
};
