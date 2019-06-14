const path = require('path')

module.exports = {
  exclude: [
    path.join(__dirname, './src/core/chart/ResizeObserver.js'),
    '**/build/**/*.js',
    '**/test/**/*.js'
  ]
}
