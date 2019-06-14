import { Tween } from '../../tween'

/**
 * 为 spritejs 元素添加动画
 * @param {*} el
 * @param {*} attrs
 */
export function animate(el, attrs) {
  if (!el || !attrs.animation) {
    return
  }

  const animation = {
    delay: 0,
    duration: 300,
    useTween: false,
    ...attrs.animation
  }
  const {
    from,
    to,
    delay,
    duration,
    useTween,
    attrFormatter = d => d
  } = animation

  if (!from || !to) {
    return
  }

  delete animation.from
  delete animation.to
  delete animation.attrFormatter

  const setAnimation = () => {
    if (!useTween) {
      el.animate([from, to], {
        easing: 'ease-in-out',
        ...animation
      }).finished.then(() => {
        delete to.offset
        el.attr(to)
      })
    } else {
      new Tween()
        .from(from)
        .to(to)
        .delay(delay)
        .duration(duration)
        .onUpdate(attr => {
          el.attr(attrFormatter(attr))
        })
        .start()
    }
  }

  if (!el.parent) {
    el.on('append', () => {
      setAnimation()
    })
  } else {
    setAnimation()
  }
}

/**
 * 为 spritejs 元素设置 诸如`normal` 、`hover`  style
 * 通过将 `style` 转换为 `states`
 * 使得开发可以直接通过 `el.attr('state', 'hover')` 来切换样式
 * @param {*} el
 * @param {*} attrs
 */
export function resolveStyle(el, attrs) {
  const normal = Object.create(null)
  let cloneNode = null

  let initialStates = { normal, ...(attrs.states || {}) }

  delete attrs.states

  let states = Object.keys(attrs).reduce((a, key) => {
    if (!/\S+state$/i.test(key)) {
      return a
    }

    let inputState = attrs[key]

    if (!inputState || typeof inputState !== 'object') {
      return a
    }

    const stateName = key.slice(0, -5)

    if (!cloneNode) {
      cloneNode = el.cloneNode()
    }

    cloneNode.attr(inputState)

    const currentAttrs = cloneNode.attr()
    Object.keys(inputState).forEach(k => {
      inputState[k] = currentAttrs[k]
    })

    const originAttrs = Object.assign({}, el.attr(), attrs)

    Object.keys(inputState).forEach(key => {
      normal[key] = originAttrs[key]
    })

    a[stateName] = inputState
    delete attrs[key]
    return a
  }, initialStates)

  el.attr({ state: 'normal', states })
}

/**
 * ref 回调函数
 * @param {*} el
 * @param {*} attrs
 */
export function applyRef(el, attrs) {
  const ref = attrs.ref
  delete attrs.ref

  if (ref) {
  }

  if (ref && el) {
    try {
      ref(el, attrs)
    } catch (e) {
      console.error(e)
    }
  }
}

/**
 * 为 spritejs 元素添加事件
 * @param {*} el
 * @param {*} attrs
 */
export function delegateEvent(el, attrs = {}) {
  Object.keys(attrs).forEach(key => {
    if (!/^on/.test(key)) {
      return
    }

    const type = key.split('on')[1].toLowerCase()
    const cb = attrs[key] || (() => {})
    el.off(type)
    el.on(type, evt => cb(evt, el))
    delete attrs[key]
  })
}
