import { isWeixinApp } from './platform'
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
export { isWeixinApp }
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
  if (isWeixinApp()) return getApp()
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

function now() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now()
}

let requestAnimationFrame = global.requestAnimationFrame
let cancelAnimationFrame = global.cancelAnimationFrame
if (!requestAnimationFrame) {
  const startTime = now()
  requestAnimationFrame = fn => {
    return setTimeout(() => {
      fn(now() - startTime)
    }, 16)
  }
  cancelAnimationFrame = id => {
    return clearTimeout(id)
  }
}
function removeFromArray(arr, item) {
  let ind = arr.indexOf(item)
  if (ind !== -1) {
    arr.splice(ind, 1)
  }
  return arr
}
export { now, requestAnimationFrame, cancelAnimationFrame, removeFromArray }
