module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    //设置"script"（默认）或"module"如果你的代码是在ECMAScript中的模块。
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    getApp: true,
    wx: true,
  },
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react'],
  // add your custom rules here
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-key': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-unused-vars': [
      2,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none'
      }
    ],
    // 关闭语句强制分号结尾
    semi: 0,
    'comma-style': 2,
    'block-spacing': 2,
    'array-bracket-spacing': [2, 'never'],
    //空行最多不能超过100行
    'no-multiple-empty-lines': [0, { max: 100 }],
    //关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    'space-before-function-paren': 0,
    'comma-dangle': 0
  }
}
