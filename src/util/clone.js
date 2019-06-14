import { isArray } from './is'

export function clone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let rst
  if (isArray(obj)) {
    rst = []
    for (let i = 0, l = obj.length; i < l; i++) {
      if (typeof obj[i] === 'object' && obj[i] != null) {
        rst[i] = clone(obj[i])
      } else {
        rst[i] = obj[i]
      }
    }
  } else {
    rst = {}
    for (const k in obj) {
      if (typeof obj[k] === 'object' && obj[k] != null) {
        rst[k] = clone(obj[k])
      } else {
        rst[k] = obj[k]
      }
    }
  }

  return rst
}

// function find(arr, item) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].source === item) {
//       return arr[i]
//     }
//   }

//   return null
// }
