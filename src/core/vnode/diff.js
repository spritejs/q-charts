import { CREATE, REPLACE, UPDATE, REMOVE } from './consts'

const isNull = obj => obj === undefined || obj === null

const diffVNodeChildren = (oldVNode, newVNode) => {
  const patches = []
  // 新旧节点的子节点长度可能不一样，但是进行比对的次数应当为最长子节点数目
  const len = Math.max(oldVNode.children.length, newVNode.children.length)

  for (let i = 0; i < len; i++) {
    // 注意：这里不使用 patches.push ，是为了保持 子节点 在整个节点树的位置是不变的
    patches[i] = diff(oldVNode.children[i], newVNode.children[i])
  }

  return patches
}

/**
 * 比对节点属性
 * 首先合并新旧节点属性
 * 新节点没有的属性，则移除属性
 * 新旧节点属性不一致，则设置属性
 * @param {*} oldVNode
 * @param {*} newVNode
 */
const diffVNodeAttrs = (oldVNode, newVNode) => {
  let patches = []
  const oldVNodeAttrs = oldVNode.attrs
  const newVNodeAttrs = newVNode.attrs
  const attrs = Object.assign({}, oldVNodeAttrs, newVNodeAttrs)

  patches = attrs

  return patches
}

/**
 * 判断两节点是否不一样
 * 1. 旧节点为文本节点，新节点不是
 * 2. 新节点为文本节点，旧节点不是
 * 3. 新旧节点标签名不一样
 * @param {*} oldVNode
 * @param {*} newVNode
 */
const isDiffrentVNode = (oldVNode, newVNode) => {
  return (
    (typeof oldVNode !== 'object' && oldVNode !== newVNode) ||
    (typeof newVNode !== 'object' && oldVNode !== newVNode) ||
    oldVNode.tagName !== newVNode.tagName
  )
}

/**
 * diff 新旧节点差异
 * case CREATE: 旧节点不存在，则应当新建新节点
 * case REMOVE: 新节点不存在，则移出旧节点
 * case REPLACE: 只比较新旧节点，不比较其子元素，新旧节点标签名或文本内容不一致，则应当替换旧节点
 * case UPDATE: 到这里，新旧节点可能只剩下 attrs 和 子节点未进行 diff，所以直接循环 diffAttrs 和 diffChildren 即可
 * @param {*} oldVNode
 * @param {*} newVNode
 */
export default function diff(oldVNode, newVNode) {
  if (isNull(oldVNode)) {
    return { type: CREATE, newVNode }
  }

  if (isNull(newVNode)) {
    return { type: REMOVE }
  }

  if (isDiffrentVNode(oldVNode, newVNode)) {
    return { type: REPLACE, newVNode }
  }

  if (newVNode.tagName) {
    return {
      type: UPDATE,
      children: diffVNodeChildren(oldVNode, newVNode),
      attrs: diffVNodeAttrs(oldVNode, newVNode)
    }
  }
}
