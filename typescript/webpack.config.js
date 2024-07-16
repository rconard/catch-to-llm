const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/webapp/index.tsx',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, isProduction ? 'dist/public' : 'public'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      publicPath: '/', // Important: Set publicPath to root
      clean: true, // Automatically clear the output directory
    },
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
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: process.env.WEBPACK_DEV_SERVER_PORT || 9000,
      historyApiFallback: true, // Enables client-side routing in dev mode
      hot: true, // Enables hot module replacement (HMR) for faster development
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000', // Target your Express server
          changeOrigin: true, // Necessary for requests to a different origin
        },
      ],
    },
  }
};
