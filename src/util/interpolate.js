import { isArray, isObject } from './is'

const constant = x => () => x
const number = (a, b) => t => a + (b - a) * t
const array = (a, b) => {
  const bl = b ? b.length : 0
  const al = a ? Math.min(bl, a.length) : 0
  const x = new Array(al)
  const c = new Array(bl)
  let i

  for (i = 0; i < al; ++i) {
    x[i] = interpolate(a[i], b[i])
  }

  for (; i < bl; ++i) {
    c[i] = b[i]
  }

  return t => {
    for (i = 0; i < al; ++i) {
      c[i] = x[i](t)
    }

    return c
  }
}
const object = (a, b) => {
  let i = {}
  let c = {}
  let k

  if (!a || !isObject(a)) {
    a = {}
  }

  if (!b || !isObject(b)) {
    b = {}
  }

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k])
    } else {
      c[k] = b[k]
    }
  }

  return t => {
    for (k in i) {
      c[k] = i[k](t)
    }

    return c
  }
}

export function interpolate(a, b) {
  let type = typeof b

  return b === null || type === 'string' || type === 'boolean'
    ? constant(b)
    : (type === 'number' ? number : isArray(b) ? array : object)(a, b)
}
