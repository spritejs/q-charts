import { clone, groupToMap, isObject, isArray, invariant } from '../../util'
import { initAttr, attrMixin } from '../mixins/attr'

class Dataset {
  constructor() {
    initAttr(this)
    this.data = null
    this.dataOrigin = null
    this._deps = []
    this._events = {}
  }

  /**
   * 添加依赖
   * @param {*} dep
   */
  addDep(dep) {
    const len = this._deps.length
    this._deps[len] = dep
  }

  /**
   * 通知更新
   */
  notify() {
    this._deps.forEach(dep => {
      if (!dep.update) {
        return
      }

      if (dep.shouldUpdate) {
        if (dep.shouldUpdate()) {
          dep.update()
        }
      } else {
        // 未实现 dep.shouldUpdate 接口，默认更新，可能会导致抖动问题
        dep.update()
      }
    })
  }

  _prepareSource(data, options) {
    // dataset 内部使用克隆数据
    if (data instanceof Dataset) {
      // 从另一个 dataset 读取数据
      this.dataOrigin = data.dataOrigin
      this.data = clone(data.dataOrigin)
    } else if (isArray(data)) {
      this.dataOrigin = data
      this.data = clone(data)
    } else {
      invariant(
        false,
        `Invalid source data, must be an array or a instance of Dataset!`
      )
    }
  }

  /**
   * 设置源数据
   * @param {*} data
   * @param {*} options
   */
  source(data, options) {
    this._prepareSource(data)
    this.attr(options)
    this._executeTransform()
  }

  /**
   * 设置响应式数据
   * @param {*} obj
   */
  _defineReactive(obj) {
    const self = this
    const defineReactive = (obj, key) => {
      let val = obj[key]
      Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
          return val
        },
        set: function reactiveSetter(newVal) {
          val = newVal
          const { row, col, value } = self.attr()
          if (obj.dataOrigin) {
            if (isObject(obj.dataOrigin)) {
              obj.dataOrigin[key] = newVal
            } else {
              obj.dataOrigin = newVal
            }
          }
          if ([row, col, value].indexOf(key) > -1) {
            self.notify()
          }
        }
      })
    }

    const { row, col, text, value } = this.attr()
    const keys = [row, col, text, value, 'dataOrigin'].filter(Boolean)

    for (let key of keys) {
      defineReactive(obj, key)
    }

    // Object.keys(obj).forEach(key => defineReactive(obj, key))
  }

  _executeTransform() {
    let { row, col, value, text, sort, filter, layoutScale } = this.attr()
    let data = this.data

    if (row === '*') {
      row = '__dataset_row__'
      data.forEach(d => (d.__dataset_row__ = 1))
    }

    if (col === '*') {
      col = '__dataset_col__'
      data.forEach(d => (d.__dataset_col__ = 1))
    }

    invariant(data, `There are no data to transform for now!`)

    // step 0: 过滤、排序
    filter && (data = data.filter(filter))
    sort && data.sort(sort)

    // step 1: 二维数组扁平化，拦截属性
    const handleData = (d, i) => {
      let dataOrigin = isObject(d) ? clone(d) : { value: d } // 保存原始数据
      if (!isObject(d)) {
        value = 'value'
        text = 'value'
        row = null
        col = null

        d = {
          value: d,
          __index__: d
        }
      } else {
        d.__index__ = i
      }

      // this._defineReactive(d)
      d.dataOrigin = dataOrigin // 保持原始数据
      d.__textGetter__ = () => d[text] || d[col] || d[row] // 获取数据文字标记
      d.__valueGetter__ = () =>
        typeof layoutScale === 'function' ? layoutScale(d[value]) : d[value] // 获取数据数值
      d.__valueSetter__ = v => v && (d[value] = v) // 修改数据数值
      d.__originValueGetter__ = () => d[value]
      return d
    }

    for (let i = 0, len = data.length; i < len; i++) {
      const d = data[i]

      if (isArray(d)) {
        let isUsed = false

        for (let j = 0, len2 = d.length; j < len2; j++) {
          let t = d[j]
          let ret = handleData(t, i)

          if (isUsed) {
            data.push(ret)
          } else {
            data[i] = ret
            isUsed = true
          }
        }
      } else {
        data[i] = handleData(d, i)
      }
    }

    this.attr({ row, col, value }) // 更新关键属性

    // step 2: 分别从行、列角度聚合数据（分组）
    let rowGroupCondition = row ? d => d[row] : d => d.__index__
    let colGroupCondition = col ? d => d[col] : d => d.__index__

    const generateIndex = condition => {
      return data.map(condition).reduce((a, c, i) => {
        a[c] = i
        return a
      }, Object.create(null))
    }

    // 行列索引
    const rowData = data
    const colData = clone(data)
    const defineReactive = data => {
      for (let d of data) {
        this._defineReactive(d)
      }
    }
    defineReactive(rowData)
    defineReactive(colData)

    this.rowIndexes = generateIndex(rowGroupCondition)
    this.colIndexes = generateIndex(colGroupCondition)
    this.row = groupToMap(rowData, rowGroupCondition)
    this.col = groupToMap(colData, colGroupCondition)
  }

  _selectDataByName(name, type) {
    const data = this[type]
    invariant(data, 'No data now, check if you has source the data!')
    const ret = data[name]
    if (isArray(ret)) {
      ret.sort((a, b) => a.__index__ - b.__index__)
    }
    return ret
  }

  _selectDataByNames(names, type) {
    let data = null
    let indexMap = null

    if (type === 'row') {
      data = this.row
      indexMap = this.rowIndexes
    } else {
      data = this.col
      indexMap = this.colIndexes
    }

    if (names === '*') {
      names = Object.keys(data)
    } else if (!isArray(names)) {
      names = [names]
    }

    return names
      .sort((a, b) => indexMap[a] - indexMap[b])
      .reduce((a, c) => {
        a.push(this._selectDataByName(c, type))
        return a
      }, [])
  }

  getRowNames() {
    let data = this.row
    let indexMap = this.rowIndexes
    return Object.keys(data).sort((a, b) => indexMap[a] - indexMap[b])
  }

  getColNames() {
    let data = this.col
    let indexMap = this.colIndexes
    return Object.keys(data).sort((a, b) => indexMap[a] - indexMap[b])
  }

  selectRow(rowName) {
    if (!rowName) {
      return null
    }
    let ret = this._selectDataByName(rowName, 'row')
    return ret
  }

  selectRows(rowNames) {
    let ret = this._selectDataByNames(rowNames, 'row')
    return ret
  }

  selectCol(colName) {
    if (!colName) {
      return null
    }
    let ret = this._selectDataByName(colName, 'col')
    return ret
  }

  selectCols(colNames) {
    let ret = this._selectDataByNames(colNames, 'col')
    return ret
  }

  hoverData(data) {
    this._hoverData = data
    this.dispatch('hover:data', data)
  }

  on(type, handler) {
    this._events[type] = this._events[type] || []
    this._events[type].push(handler)
  }

  dispatch(type, data) {
    const handlers = this._events[type] || []
    handlers.forEach(handler => handler(data))
  }
}

attrMixin(Dataset)

export default Dataset
