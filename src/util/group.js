const { isArray, isFunction } = require('./is')

export const groupBy = function(data, condition) {
  if (!condition || !Array.isArray(data)) {
    return data
  }

  const result = Object.create(null)
  let key = null

  data.forEach((item, i, arr) => {
    key = condition(item, i, arr)

    if (key == null) {
      return
    }

    if (result[key]) {
      result[key].push(item)
    } else {
      result[key] = [item]
    }
  })

  return result
}

export const groupToMap = (data, condition) => {
  if (!condition) {
    return { 0: data }
  }

  if (!isFunction(condition)) {
    const params = isArray(condition)
      ? condition
      : condition.replace(/\s+/g, '').split('*')

    condition = function(row) {
      return params.reduce(
        (a, c) => (a += row[c] && row[c].toString() + '_'),
        '_'
      )
    }
  }

  return groupBy(data, condition)
}
