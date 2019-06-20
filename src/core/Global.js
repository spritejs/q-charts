import { isString, isObject } from '../util'

export const Global = Object.create(null) // qcharts 全局存储

Global.PLOT_INSTANCES = new WeakMap() // 实例化的 Plot 对象
Global.THEMES = new Map() // 主题
Global.CURRENT_THEME = Object.create(null) // 当前使用的主题
Global.registerTheme = (name, theme) => {
  Global.THEMES.set(name, theme)
}
Global.useTheme = theme => {
  if (!theme) {
    return
  }

  if (isString(theme)) {
    theme = Global.THEMES.get(theme)
  }

  if (isObject(theme)) {
    Global.CURRENT_THEME = Object.assign({}, Global.CURRENT_THEME, theme)
  }
}
