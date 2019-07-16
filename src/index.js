import * as spritejs from 'spritejs'
import shapes from '@spritejs/shapes'
import { getGlobal } from './util'
import * as core from './core'
import * as visuals from './visuals'
import * as plugins from './plugins'
import * as Theme from './themes'

spritejs.use(shapes)

core.Global.registerTheme('default', Theme.light)
core.Global.registerTheme('dark', Theme.dark)

const version = require('../package.json').version

export const qcharts = {
  version,
  ...core,
  ...visuals,
  ...plugins
}

const global = getGlobal()
global.qcharts = qcharts

export default qcharts
