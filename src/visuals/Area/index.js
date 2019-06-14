import { Line } from '../Line/index'
export class Area extends Line {
  getDefaultAttrs() {
    let resObj = super.getDefaultAttrs()
    return Object.assign(resObj, {
      type: 'area', //
      stack: true, // 是否堆叠处理
    })
  }
}
