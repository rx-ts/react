import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import { Configuration } from 'webpack'

const DEV = 'development'

const NODE_ENV = (process.env.NODE_ENV as Configuration['mode']) || DEV

const isDev = NODE_ENV === DEV

const sourceMap = isDev

const config: Configuration = {
  mode: NODE_ENV,
  entry: {
    app: resolve('demo/index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsWebpackPlugin()],
  },
  devtool: isDev && 'cheap-module-eval-source-map',
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
}

export default config