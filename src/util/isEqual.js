export const isEqual = (a, b) => {
  /* eslint-disable eqeqeq */
  if (!a || !b) {
    return a == b
  }

  const typea = typeof a
  const typeb = typeof b

  if (typea !== typeb) {
    return false
  }

  if (typea === 'object' && typeb === 'object') {
    const aks = Object.keys(a)
    const bks = Object.keys(b)
    const akl = aks.length
    const bkl = bks.length

    if (akl !== bkl) {
      return false
    } else {
      let flag = true
      let key = null

      for (let i = 0; i < akl; i++) {
        key = aks[i]
        flag = isEqual(a[key], b[key])

        if (!flag) {
          break
        }
      }
      return flag
    }
  } else {
    return a == b
  }
}
