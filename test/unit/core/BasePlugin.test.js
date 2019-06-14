import test from 'ava'
import qcharts from '@/index'

const { BasePlugin } = qcharts

test('BasePlugin', t => {
  const node = new BasePlugin()
  t.is(node.componentType, 'plugin')
})
