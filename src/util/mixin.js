import { isObject, isFunction, isArray } from './is'

export const mixin = (source, target) => {
  const check = (source, target) => {
    if (!isObject(source) || !isFunction(target)) {
      throw new Error(
        'For mixin, the source must be a Object, the target must be a Class(Function)'
      )
    }
  }

  if (isArray(source)) {
    source.forEach(s => check(s, target))
  } else {
    check(source, target)
  }

  const proto = target.prototype

  if (!isArray(source)) {
    source = [source]
  }

  const mixin = obj => {
    Reflect.ownKeys(obj).forEach(key => {
      proto[key] = obj[key]
    })
  }

  source.forEach(mixin)

  return target
}
