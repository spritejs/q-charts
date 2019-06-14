import { isFunction } from '../../util'

export function initEvents(instance) {
  instance._events = Object.create(null)
}

export function eventsMixin(Component) {
  Component.prototype.on = function on(type, callback) {
    this._events[type] = this._events[type] || []
    this._events[type].push(callback)

    return this
  }

  Component.prototype.once = function once(type, fn) {
    const self = this

    const listener = function(...args) {
      fn.apply(this, args)
      self.off(type, listener)
    }

    return this.on(type, listener)
  }

  Component.prototype.off = function off(type, fn) {
    if (isFunction(fn)) {
      const listeners = this.getListeners(type)
      const idx = listeners.indexOf(fn)
      listeners.splice(idx, 1)
    } else {
      if (this._events[type]) {
        this._events[type] = []
      } else {
        this._events = Object.create(null)
      }
    }

    return this
  }

  Component.prototype.getListeners = function getListeners(type) {
    if (!type) {
      return []
    } else {
      return this._events[type] || []
    }
  }

  Component.prototype.emit = function emit(...args) {
    const type = args[0]
    const payloads = args.slice(1)

    const components = (() => {
      if (this.chart) {
        return [this.chart].concat(this.chart.getChildren())
      } else {
        return [this].concat((this.getChildren && this.getChildren()) || [])
      }
    })()

    if (!components || !components.length) {
      return this
    }

    const dispatchEvent = shape => {
      if (!shape || !shape.getListeners) {
        return
      }

      const handlers = shape.getListeners(type)
      handlers.map(handler => handler.apply(shape, payloads))
    }

    components.forEach(dispatchEvent)

    return this
  }
}
