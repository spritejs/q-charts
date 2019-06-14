function mergeStyle(func, args, otherStyle) {
  let resAttrs = func(...args);
  if (resAttrs !== false) {
    if (otherStyle === false && resAttrs === undefined) {
      return false
    }
    resAttrs = Object.assign({}, otherStyle, args[0], resAttrs)
  }
  return resAttrs
}

export { mergeStyle }
