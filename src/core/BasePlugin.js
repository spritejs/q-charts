import BaseNode from './BaseNode'

export class BasePlugin extends BaseNode {
  get componentType() {
    return 'plugin'
  }
}
