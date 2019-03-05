const path = require('path');
const slsw = require('serverless-webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src/functions'),
          path.resolve(__dirname, 'src/models'),
          path.resolve(__dirname, 'src/layers'),
        ]
      },
    ],
  },
};
