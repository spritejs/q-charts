export { axis } from './axis'
export { hexToRgba, randomHexColor } from './color'
export { invariant } from './invariant'
export { clone } from './clone'
export { debounce } from './debounce'
export { diff } from './diff'
export { groupBy, groupToMap } from './group'
export {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isPlainObject
} from './is'
export { isEqual } from './isEqual'
export { interpolate } from './interpolate'
export { throttle } from './throttle'

export const flattern = arr => [].concat.apply([], arr)

export const defer =
  typeof Promise === 'function'
    ? Promise.resolve().then.bind(Promise.resolve())
    : setTimeout

export const delay = time =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, time)
  )

export const getGlobal = () => {
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw new Error(`unable to locate global object`)
}

export const noOp = d => d

export const convertPercent2Number = (percent, base) => {
  if (/%/.test(percent)) {
    return (+percent.replace('%', '') * base) / 100
  } else {
    return +percent
  }
}

export { scaleLinear } from './q-scale'
