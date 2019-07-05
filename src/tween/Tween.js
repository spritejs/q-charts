import { interpolate, delay, now, requestAnimationFrame, cancelAnimationFrame } from '../util'

function Tween(val) {
  this._start = val
  this._end = null
  this._delay = 0

  this._canceled = false
  this._duration = 1
  this._easing = k => k

  this._onUpdate = () => {}
  this._onStart = () => {}

  return this
}

Tween.prototype = {
  from(val) {
    this._start = val
    return this
  },

  to(val) {
    this._end = val

    return this
  },

  duration(time) {
    if (typeof time !== 'number') {
      throw new Error('Duration time must be a number')
    }

    this._duration = time
    return this
  },

  delay(time) {
    this._delay = time
    return this
  },

  easing(fn) {
    if (typeof fn !== 'function') {
      throw new Error('easing function must be a function')
    }

    this._easing = fn

    return this
  },

  onStart(fn) {
    if (typeof fn !== 'function') {
      throw new Error('start callback must be a function')
    }

    this._onStart = fn

    return this
  },

  onUpdate(fn) {
    if (typeof fn !== 'function') {
      throw new Error('update callback must be a function')
    }

    this._onUpdate = fn

    return this
  },

  onComplete(fn) {
    if (typeof fn !== 'function') {
      throw new Error('complete callback must be a function')
    }

    this._onComplete = fn

    return this
  },
  start() {
    // const dt = 16.7 // 每一帧 16.7 ms
    const e = this._easing
    const i = interpolate(this._start, this._end)
    const callback = this._onUpdate
    let elapseTime = 0 // 已消耗时长
    let animateTime = this._duration
    let timer = null
    let delayTime = this._delay
    let startTime = 0

    return new Promise(resolve => {
      const step = () => {
        // 每次加一帧，保证帧数是对的，不在乎到底消耗多长时间
        elapseTime = now() - startTime
        const t = e(Math.min(1.0, elapseTime / animateTime))

        if (elapseTime >= animateTime) {
          callback(i(1))
          resolve(this)
          cancelAnimationFrame(timer)
        } else {
          callback(i(t))
          timer = requestAnimationFrame(step)
        }
      }

      const start = () => {
        startTime = now()
        this._onStart(this._start, this._end)
        timer = requestAnimationFrame(step)
      }

      this.cancel = () => {
        cancelAnimationFrame(timer)
      }

      if (delayTime && delayTime > 0) {
        delay(delayTime).then(start)
      } else {
        start()
      }
    })
  }
}

export default Tween
