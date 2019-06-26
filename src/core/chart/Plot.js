import { Group, Scene } from 'spritejs'
import { isObject, debounce, convertPercent2Number, isWeixinApp } from '../../util'
import ResizeObserver from './ResizeObserver'

const isDev = process.env.NODE_ENV !== 'production'

export class Plot {
  constructor(container, opts) {
    if (isObject(container)) {
      opts = container
      container = opts.container
    }
    this.domElement = container
    this.initScene(this.domElement, opts)
    this.plots = []
    this.charts = []
  }

  initScene(container, opts) {
    if (!isWeixinApp() && opts.forceFit) {
      opts.viewport = 'auto'
    } else if(!isWeixinApp()) {
      opts.viewport = opts.size ? opts.size : [opts.width, opts.height]
    }

    /**
      {
        vwr: 1,
        layer: 'fglayer',
      }
     */
    if (isWeixinApp()) {
      this.scene = new Scene(opts)
    } else {
      this.scene = new Scene(container, {
        displayRatio: 'auto',
        ...opts
      })
    }
    const layerID = opts.layer || 'default'
    this.layer = this.scene.layer(layerID)

    if (isDev) {
      this.layer.on('update', debounce(() => {
        console.info(
          `%c如果持续打印该信息，说明 layer 在不断重绘，需要找出问题！`,
          'color: red'
        )
      }, 1000))
    }

    this.canvas = this.layer.canvas

    if (opts.forceFit) {
      this.forceFit()
    }
  }

  forceFit() {
    if (isWeixinApp()) return; // ignored
    const onResize = (w, h) => {
      this.scene.setViewport(w, h)
      this.scene.setResolution(w, h)
      this.plots.forEach(({ $group, pos, size }) => {
        $group.attr(this.recalculateLayout(pos, size))
      })
      this.charts.forEach(chart => {
        chart.emit('resize')
        chart.update && chart.update()
      })
    }

    const dom = this.domElement
    const observer = ResizeObserver(
      debounce(element => {
        const { width, height } = element.getBoundingClientRect()
        onResize(width, height)
      }, 300)
    )
    observer.observe(dom)
  }

  recalculateLayout([x, y], [width, height]) {
    const viewport = this.scene.resolution
    const pos = [x, y].map((n, i) => convertPercent2Number(n, viewport[i]))
    const size = [width, height].map((n, i) =>
      convertPercent2Number(n, viewport[i])
    )
    return { pos, size }
  }

  subPlot(pos, size) {
    const $group = new Group({
      boxSizing: 'border-box',
      ...this.recalculateLayout(pos, size)
    })
    this.layer.appendChild($group)
    this.plots.push({ $group, pos, size })
    return $group
  }

  addChart(chart) {
    chart.id = this.plots.length + 1 // 设置 chart 的 ID
    Object.defineProperty(chart, 'id', {
      writable: false,
      configurable: true
    })
    chart.layer = this.layer
    this.charts.push(chart)
  }
}
