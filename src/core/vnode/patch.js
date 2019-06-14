import { CREATE, REPLACE, UPDATE, REMOVE } from './consts'
import { createElement } from './render'
import { delegateEvent, resolveStyle, animate, applyRef } from './nodeHelper'

const patchAttrs = (el, patches) => {
  if (!el) {
    return
  }

  if (!Object.keys(patches).length) {
    return
  }

  applyRef(el, patches)
  resolveStyle(el, patches)
  delegateEvent(el, patches)
  el.attr(patches)
  animate(el, patches)
}

let count = 0

/**
 * @param {*} parent
 * @param {*} patches
 * @param {*} index
 */
export default function patch(parent, patches, index = 0, isRoot = false) {
  if (!patches || !parent || !parent.childNodes) {
    return
  }

  let el = isRoot
    ? parent
    : parent.childNodes[index - count] || parent.childNodes[0]

  /* eslint-disable indent */
  switch (patches.type) {
    case CREATE: {
      const { newVNode } = patches

      // if (newVNode) {
      const newEl = createElement(newVNode)
      newEl && parent.appendChild(newEl)
      // } else {
      count++
      // }
      break
    }

    case REPLACE: {
      const { newVNode } = patches
      const newEl = createElement(newVNode)
      parent.replaceChild(newEl, el)
      count--
      break
    }

    case REMOVE: {
      el.parent.removeChild(el)
      count++

      break
    }

    case UPDATE: {
      const { attrs, children } = patches
      patchAttrs(el, attrs)

      for (let i = 0, len = children.length; i < len; i++) {
        patch(el, children[i], i)
      }

      count = 0

      break
    }
  }
}
