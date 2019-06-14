const VNode = function VNode() {}
const flattern = arr => [].concat.apply([], arr)

export default function h(tagName, attrs, ...children) {
  const node = new VNode()
  node.tagName = tagName
  node.attrs = attrs || {}
  node.children = flattern(children).filter(Boolean)

  return node
}
