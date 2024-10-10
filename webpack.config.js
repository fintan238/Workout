// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // Set mode to 'development' for hot-reloading
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/' // Ensure publicPath is set for dev server
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'public'), 
    },
    compress: true,
    port: 9000,
    hot: true, // Enable hot module replacement
    historyApiFallback: true // Ensure single-page app routing works
  }
};