import { invariant } from '../../util'
import { delegateEvent, resolveStyle, animate, applyRef } from './nodeHelper'

export function createElement(vnode) {
  if (!vnode) {
    return
  }

  let { tagName: TagName, attrs, children } = vnode
  const el = new TagName()

  applyRef(el, attrs)
  resolveStyle(el, attrs)
  delegateEvent(el, attrs)
  el.attr(attrs)
  animate(el, attrs)

  if (el.appendChild) {
    children
      .map(createElement)
      .filter(Boolean)
      .forEach(el.appendChild.bind(el))
  }

  return el
}

export function render(children, parent) {
  if (!children) {
    return
  }

  invariant(parent, `In vnode, need a parent to render elements!`)

  children
    .filter(Boolean)
    .map(createElement)
    .forEach(el => parent.appendChild(el))
}
