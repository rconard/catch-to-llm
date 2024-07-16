const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      server: './src/server.tsx', // Entry point for server
      bundle: './src/webapp/index.tsx' // Entry point for client
    },
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js', // Output both server.js and bundle.js
      publicPath: '/',
      clean: true,
    },
    target: 'node', 
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/webapp/index.html',
        inject: 'body', 
        filename: 'index.html' 
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), 
      },
      compress: true,
      port: process.env.WEBPACK_DEV_SERVER_PORT || 9000,
      historyApiFallback: true,
      hot: true,
    },
  };
};
