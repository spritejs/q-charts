import path from 'path'

export default () => {
  return {
    all: true,
    files: ['**/test/**/*.test.js'],
    require: ['@babel/register'],
    babel: {
      testOptions: {
        babelrc: true,
        plugins: [
          [
            'babel-plugin-webpack-alias-7',
            {
              config: path.resolve(__dirname, './build/webpack.conf.common.js')
            }
          ]
        ]
      }
    }
  }
}
