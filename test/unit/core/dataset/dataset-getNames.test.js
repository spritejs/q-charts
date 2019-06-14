import test from 'ava'
import qcharts from '@/index'

const { Dataset } = qcharts

test('Dataset selectRow', t => {
  const data = [
    {
      product: '茶叶',
      year: '2016',
      sales: 81.2
    },

    {
      product: '茶叶',
      year: '2017',
      sales: 121.2
    },

    {
      product: '茶叶',
      year: '2018',
      sales: 41.2
    },

    {
      product: '牛奶',
      year: '2016',
      sales: 85.2
    },

    {
      product: '牛奶',
      year: '2017',
      sales: 79.6
    },

    {
      product: '牛奶',
      year: '2018',
      sales: 81.2
    },

    {
      product: '咖啡',
      year: '2016',
      sales: 65.2
    },

    {
      product: '咖啡',
      year: '2017',
      sales: 59.6
    },

    {
      product: '咖啡',
      year: '2018',
      sales: 61.2
    },

    {
      product: '椰汁',
      year: '2016',
      sales: 35.2
    },

    {
      product: '椰汁',
      year: '2017',
      sales: 79.6
    },

    {
      product: '椰汁',
      year: '2018',
      sales: 21.2
    }
  ]

  const ds = new Dataset()
  ds.source(data, { row: 'product', col: 'year', value: 'sales' })

  const rows = ds.getRowNames()
  const cols = ds.getColNames()
  t.deepEqual(rows, ['茶叶', '牛奶', '咖啡', '椰汁'])
  t.deepEqual(cols, ['2016', '2017', '2018'])
})
