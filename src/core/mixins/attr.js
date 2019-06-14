import { isObject, isFunction } from '../../util'

export function initAttr(component) {
  component._attrs = Object.create(null)
}

export function attrMixin(Component) {
  Component.prototype.getDefaultAttrs = function getDefaultAttrs() {
    return {}
  }

  Component.prototype.attr = function attr(key, value) {
    const attrs = this._attrs

    if (isObject(key)) {
      Object.keys(key).forEach(k => this.attr(k, key[k]))
    } else {
      if (arguments.length <= 1) {
        return key ? attrs[key] : attrs
      } else {
        key && (attrs[key] = value)
      }
    }
  }

  Component.prototype.style = function style(type, style) {
    if (style === undefined) {
      const style = this.attr('@' + type)
      return (...args) => {
        if (isFunction(style)) {
          return style.apply(this, args)
        } else {
          return style
        }
      }
    } else {
      this.attr('@' + type, style)
      return this
    }
  }
}
