const path = require('path')
const printf = require('printf')
const slugify = require('slugify')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dist = path.resolve(__dirname, 'dist')
const indexHtml = path.resolve(__dirname, './assets/html/index.html')

function sanitizeFilename (file) {
  const ext = path.extname(file)
  const name = path.basename(file, ext)
  const slug = slugify(name, { lower: true })
  return slug
}

function rename (format) {
  return (file) => printf(format, sanitizeFilename(file))
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  
  return {
    entry: './src/entry/index.ts',
    output: {
      filename: '[name].[contenthash].js',
      publicPath: '/',
      path: dist,
      clean: true
    },
    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
      static: {
        directory: dist,
      },
      hot: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|xml)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        {
          test: /\.(mp3|ogg|wav)$/,
          type: 'asset/resource',
          generator: {
            filename: 'audio/[name].[hash][ext]'
          }
        },

        {
          test: /\.(ttf|woff|woff2|eot|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'Asteroid Game - Phaser',
        template: indexHtml
      })
    ]
  }
}