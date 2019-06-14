const toStr = obj => Object.prototype.toString.call(obj).slice(8, -1)

export const isArray = obj => toStr(obj) === 'Array'
export const isBoolean = obj => toStr(obj) === 'Boolean'
export const isObject = obj => toStr(obj) === 'Object'
export const isFunction = obj => toStr(obj) === 'Function'
export const isNumber = obj => toStr(obj) === 'Number'
export const isString = obj => toStr(obj) === 'String'

export const isPlainObject = obj => {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
