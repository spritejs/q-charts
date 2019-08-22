import { Group, Label, Sprite, Path } from 'spritejs'
import { BasePlugin } from '../core/BasePlugin'
import { convertPercent2Number, isArray, isString, isNumber } from '../util'

export class Legend extends BasePlugin {
  constructor(attrs = {}) {
    super(attrs)
    this.state = {
      page: 1,
      totalPage: 1,
      perPageWidthOrHeight: 0, // 每页长度（或宽度）
      paginationSize: [0, 0], // 分页控件大小
      groupSize: [0, 0] // legends 容器大小 $group.contentSize
    }
    this.disableds = {}
  }

  getDefaultAttrs() {
    return {
      size: ['100%', '100%'],
      orient: 'horizontal', // 布局方式， vertical | horizontal
      align: ['left', 'top'], // 水平方向布局，left | center | right, 垂直方向布局，top | center | bottom
      formatter: d => d.value || d
    }
  }

  get isVertical() {
    /* eslint-disable eqeqeq */
    return this.attr('orient') == 'vertical'
  }

  get size() {
    const parentSize = this.chart.getSize()
    let size = this.attr('__size__')

    if (!size) {
      size = this.attr('size')
      this.attr('__size__', size)
    }

    size = size.map((v, i) => convertPercent2Number(v, parentSize[i]))
    this.attr('size', size)
    return size
  }

  get pos() {
    const { align } = this.attr()
    const parentSize = this.chart.getSize()
    const [width, height] = this.$group.contentSize
    // this.state.groupSize = [width, height] // 保存当前 group 的内容大小

    const isValidLayout = (value, type) => {
      if (type === 'horizontal') {
        // 水平布局
        return ['default', 'left', 'center', 'right'].indexOf(value) > -1
      } else {
        // 垂直布局
        return ['default', 'top', 'center', 'bottom'].indexOf(value) > -1
      }
    }

    const hLocation = {
      // 水平定位
      default: 0,
      left: 0,
      center: (parentSize[0] - width) / 2,
      right: parentSize[0] - width,
      numberOrPercent(num) {
        // 输入 数字或百分比
        if (typeof num === 'number') {
          return num
        } else {
          let val = 0

          try {
            val = parseFloat(num) / 100
          } catch (e) {}

          return (parentSize[0] - width) * val
        }
      }
    }

    const vLocation = {
      // 垂直定位
      default: 0,
      top: 0,
      center: parentSize[1] / 2 - height / 2,
      bottom: parentSize[1] - height,
      numberOrPercent(num) {
        // 输入 数字或百分比
        if (typeof num === 'number') {
          return num
        } else {
          let val = 0

          try {
            val = parseFloat(num) / 100
          } catch (e) {}

          return (parentSize[1] - height) * val
        }
      }
    }

    return {
      x: isValidLayout(align[0], 'horizontal')
        ? hLocation[align[0]]
        : hLocation.numberOrPercent(align[0]),
      y: isValidLayout(align[1], 'vertical')
        ? vLocation[align[1]]
        : vLocation.numberOrPercent(align[1])
    }
  }

  /**
   * Legend 配色。支持：
   * 1. 用户主动配色，如：legend.color(['red', 'blue', 'yellow'])
   * 2. 使用指定 target 的配色，如：legend.attr('target', pie ), 这时候 legend 就会读取 pie 的配色方案
   * 3. 使用当前 chart 的第一个 visual 的配色方案
   * 4. 使用当前 Theme 配置的 chart 的配色方案
   * @param {*} i
   */
  color(i) {
    const target = this.attr('target')

    if (target) {
      this._colors = target.color && target.color()
    }

    if (isArray(i) || isString(i)) {
      return super.color(i)
    } else {
      // if (!this._colors.length) {
      // 当前 legend 没有配色
      let colors

      if (this.chart) {
        colors =
          this.chart.visuals[0] &&
          this.chart.visuals[0].color &&
          this.chart.visuals[0].color()
      }

      if (colors && colors.length) {
        this._colors = colors
      }
      // }

      return super.color(i)
    }
  }

  shouldUpdate() {
    return true
  }

  getPaginationSize() {
    const getContentSize = $group => {
      return ($group && $group.clientSize) || [0, 0]
    }
    let size0 = getContentSize(this.$refs['paginationPrev'])
    let size1 = getContentSize(this.$refs['paginationText'])
    let size2 = getContentSize(this.$refs['paginationNext'])
    return [size0[0] + size1[0] + size2[0], size0[1] + size1[1] + size2[1]]
  }

  ensurePaginationSize() {
    const { totalPage, paginationSize } = this.state

    /* eslint-diable eqeqeq */
    if (
      totalPage > 1 &&
      (!paginationSize || paginationSize.some(v => v <= 0))
    ) {
      Promise.resolve().then(() => {
        this.paginatify()
      })
    }
  }

  paginatify() {
    this.chart.layer.prepareRender().then(() => {
      const vertical = this.isVertical
      const rootSize = this.size
      const legendSize = (this.$refs['legends'] &&
        this.$refs['legends'].contentSize) || [0, 0]

      let paginationSize = this.getPaginationSize()

      const handle = () => {
        let perPageWidthOrHeight
        let totalPage
        let i = vertical ? 1 : 0
        perPageWidthOrHeight = rootSize[i] - paginationSize[i]
        totalPage = Math.ceil(legendSize[i] / perPageWidthOrHeight)

        this.setState(
          {
            page: this.state.page > totalPage ? totalPage : 1,
            totalPage: totalPage > 1 ? totalPage : 1,
            perPageWidthOrHeight,
            paginationSize
          },
          true
        )
      }

      /* eslint-diable eqeqeq */
      if (paginationSize.some(v => v <= 0)) {
        // 无法正确获取分页高度
        // this.ensurePaginationSize()
        Promise.resolve().then(() => {
          paginationSize = this.getPaginationSize()
          handle()
        })
      }

      handle() // 无论如何都要调一次，已方便后面可以获取到分页控件的大小
    })
  }

  changePage = type => {
    switch (type) {
      case 'prev':
        return () => {
          let page = this.state.page
          if (page <= 1) return
          page -= 1
          this.setState({ page })
        }

      default:
        return () => {
          let { page, totalPage } = this.state
          if (page >= totalPage) return
          page += 1
          this.setState({ page })
        }
    }
  }

  handleData() {
    let ret = null

    if (this.data) {
      ret = this.data
    } else {
      let layoutBy = this.attr('layoutBy')
      if (layoutBy === 'col') {
        ret = this.dataset.getColNames()
      } else {
        ret = this.dataset.getRowNames()
      }

      ret.forEach(name => {
        const d = this.dataset._selectDataByName(name, layoutBy)
        if (d.some(t => t.disabled)) {
          this.disableds[name] = true
        } else {
          this.disableds[name] = false
        }
      })
    }

    return ret
  }

  changeDataSetData = (name, key = 'disabled', value) => {
    let layoutBy = this.attr('layoutBy')
    const data = this.dataset._selectDataByName(name, layoutBy)

    if (key === 'disabled') {
      this.disableds[name] = !this.disableds[name]
      data && data.forEach(node => (node.disabled = !node.disabled))
    } else {
      data[key] = value
      data && data.forEach(node => (node[key] = value))
    }

    this.dataset.notify()
  }

  beforeRender() {
    return this.handleData()
  }

  beforeUpdate() {
    return this.handleData()
  }

  render(names) {
    const { icon, text, ...rootStyle } = this.chart.resolveTheme('Legend')
    const { formatter } = this.attr()
    const isVertical = this.isVertical
    const { page, totalPage, perPageWidthOrHeight } = this.state
    const { x, y } = this.pos
    const size = this.size

    this.ensurePaginationSize()

    return (
      <Group
        boxSizing={'border-box'}
        {...(totalPage > 1
          ? {
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            ...(isVertical ? { height: size[1] } : {})
          }
          : {})}
        border={[1, 'transparent']}
        zIndex={1000}
        bgcolor={'transparent'}
        {...(isVertical
          ? {
            x,
            alignItems: 'center',
            clipOverflow: false
          }
          : { x })}
        {...(isNumber(y) ? { y } : { justifyContent: y })}
        {...rootStyle}
        clipOverflow={false}
        enableCache={false}
      >
        <Group
          boxSizing={'border-box'}
          clipOverflow={totalPage > 1}
          {...(totalPage > 1
            ? {
              flex: 1,
              [isVertical ? 'height' : 'width']: perPageWidthOrHeight
            }
            : {
              bgcolor: 'transparent'
              // display: 'inline-flex' // spritejs@2.27.3 存在问题，这样会不断重绘
            })}
          enableCache={false}
        >
          <Group
            boxSizing={'border-box'}
            ref={this.resolveRef('legends')}
            display="flex"
            justifyContent={'space-around'}
            flexDirection={isVertical ? 'column' : 'row'}
            flexWrap="no-wrap"
            enableCache={false}
          >
            {names.map((name, i) => (
              <Group
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexWrap={'no-wrap'}
                padding={[0, 5]}
                clipOverflow={false}
                enableCache={false}
                onMouseenter={() => {
                  this.chart.setCanvasCursor('pointer')
                }}
                onClick={() => this.changeDataSetData(name)}
                onMouseleave={() => {
                  this.chart.setCanvasCursor('default')
                }}
              >
                <Sprite
                  {...icon}
                  bgcolor={this.color(i)}
                  {...this.style('icon')({}, name, i)}
                  {...(this.disableds[name] ? { bgcolor: '#ccc' } : {})}
                  hoverState={this.style('icon:hover')({}, name, i)}
                  onMousemove={(_, el) => el.attr('state', 'hover')}
                  onMouseleave={(_, el) => el.attr('state', 'normal')}
                />
                <Label
                  clipOverflow={false}
                  bgcolor={'transparent'}
                  text={formatter(name, i)}
                  {...text}
                  {...this.style('text')({}, name, i)}
                  hoverState={this.style('text:hover')({}, name, i)}
                  onMouseenter={(_, el) => el.attr('state', 'hover')}
                  onMouseleave={(_, el) => el.attr('state', 'normal')}
                />
              </Group>
            ))}
          </Group>
        </Group>
        {totalPage <= 1
          ? null
          : [
            <Path
              {...(isVertical ? { marginLeft: 5 } : {})}
              ref={this.resolveRef('paginationPrev')}
              padding={[isVertical ? 2 : 1, 0, 0, 0]}
              d={
                isVertical
                  ? 'M 0 15 L 15 15 L7.5 0 Z'
                  : 'M 0 7.5 L 13 0 L13 15 Z'
              }
              fillColor={page <= 1 ? '#ccc' : '#324556'}
              onClick={this.changePage('prev')}
              onMouseenter={() => this.chart.setCanvasCursor('pointer')}
              onMouseleave={() => this.chart.setCanvasCursor('default')}
            />,
            <Label
              ref={this.resolveRef('paginationText')}
              font="14px '宋体'"
              text={page + '/' + totalPage + ''}
              lineBreak="normal"
              padding={isVertical ? [0, 2] : [0, 2]}
            />,
            <Path
              {...(isVertical ? { marginLeft: 5 } : {})}
              ref={this.resolveRef('paginationNext')}
              padding={[isVertical ? 2 : 1, 0, 0, 0]}
              d={
                isVertical
                  ? 'M 0 0 L 15 0 L7.5 13 Z'
                  : 'M 13 7.5 L 0 0 L0 15 Z'
              }
              fillColor={page >= totalPage ? '#ccc' : '#324556'}
              onClick={this.changePage('next')}
              onMouseenter={() => this.chart.setCanvasCursor('pointer')}
              onMouseleave={() => this.chart.setCanvasCursor('default')}
            />
          ]}
      </Group>
    )
  }

  rendered() {
    this.on('resize', () => {
      this.paginatify()
    })
    this.paginatify()
  }

  checkAlign() {
    let { groupSize } = this.state
    const align = this.attr('align')
    // 因为数据的更新可能导致 group.contentSize 有改动，所以需要重新 align
    const [width, height] = this.$group.contentSize

    if (align[0] !== 'left' || align[1] !== 'right') {
      if (width !== groupSize[0] || height !== groupSize[1]) {
        this.setState({ groupSize: [width, height] }, true)
      }
    }
  }

  updated() {
    let { page, perPageWidthOrHeight } = this.state
    page = page > 1 ? page : 1
    const nextScroll = (page - 1) * perPageWidthOrHeight
    const isVertical = this.isVertical
    this.$refs['legends']
      .transition(0.3)
      .attr(isVertical ? 'scrollTop' : 'scrollLeft', nextScroll)

    setTimeout(() => this.checkAlign())
  }
}
