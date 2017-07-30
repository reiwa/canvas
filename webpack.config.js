const webpack = require('webpack')

const entry = {}

require('fs')
.readdirSync(require('path').resolve('src'))
.filter(file => {
  return file.indexOf('.') === -1
})
.forEach(file => {
  entry[file] = require('path').resolve('src', file, 'index.js')
})

module.exports = {
  entry,
  output: {
    path: require('path').resolve('docs', 'code'),
    publicPath: '/code/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: new RegExp('.js$'),
      use: 'babel-loader'
    }]
  },
  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.UglifyJsPlugin({comments: false}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
    : [
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
  devServer: {
    contentBase: require('path').resolve('docs'),
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4000,
    noInfo: true
  }
}
