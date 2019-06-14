import test from 'ava'
import qcharts from '@/index'

const { BaseVisual } = qcharts

test('BaseVisual', t => {
  const node = new BaseVisual()
  t.is(node.componentType, 'visual')
})
