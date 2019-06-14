class Warapper {
  constructor(rootElement) {
    this.rootElement = rootElement
    this._currentElement = rootElement
    this.elements = []
    return this
  }

  setRoot(rootElement) {
    this.rootElement = rootElement
    this._currentElement = this._currentElement || rootElement
    return this
  }

  find(tagName = '*', depth = 1) {
    tagName = tagName.toLowerCase()
    let currentDepth = 1
    const parent = this._currentElement
    const children = parent.childNodes || []
    let ret = []
    const match = node => node.tagName.toLowerCase() === tagName

    if (depth === 1) {
      ret = tagName === '*' ? children : children.filter(match)
    } else {
      const traverse = nodes => {
        currentDepth++
        nodes.forEach((child, i) => {
          if (match(child)) {
            ret.push(child)
          }
          if (child.childNodes && currentDepth <= depth + i) {
            traverse(child.childNodes)
          }
        })
      }
      traverse(children)
    }

    // if (ret.length) {
    //   this._currentElement = ret[0]
    // }
    // this.elements = ret
    return ret
  }

  // at(index) {
  //   this._currentElement = this.elements[index]
  //   return this
  // }

  simulate(element = null, eventType) {
    let target = element || this._currentElement
    target.dispatchEvent(eventType, {}, true)
    return target
  }

  // reset(rootElement) {
  //   if (rootElement) {
  //     this.rootElement = rootElement
  //   }
  //   this._currentElement = this.rootElement
  //   return this
  // }
}

module.exports = Warapper
