import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.rollup.js',
    name: 'qchart',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true
    }),
    commonjs(),
    uglify()
  ],
  external: ['spritejs']
}
