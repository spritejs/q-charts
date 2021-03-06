export function debounce(func, wait, immediate) {
  let timeout

  const debounced = function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}
