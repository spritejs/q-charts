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
  ds.source(data, { row: 'product', value: 'sales' })

  const ret1 = ds.selectRow('椰汁')
  t.is(ret1.length, 3)

  const ret2 = ds.selectRow()
  t.is(ret2, null)
})

test('Dataset selectRows', t => {
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
  ds.source(data, { row: 'product', value: 'sales' })

  const ret1 = ds.selectRows('*')
  t.is(ret1.length, 4)
  t.is(ret1[0].length, 3)

  const ret2 = ds.selectRows('椰汁')
  t.is(ret2.length, 1)
  t.is(ret1[0].length, 3)
})

test('Dataset selectCol', t => {
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
  ds.source(data, { col: 'product', value: 'sales' })

  const ret1 = ds.selectCol('椰汁')
  t.is(ret1.length, 3)

  const ret2 = ds.selectCol()
  t.is(ret2, null)
})

test('Dataset selectCols', t => {
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
  ds.source(data, { col: 'product', value: 'sales' })

  const ret1 = ds.selectCols('*')
  t.is(ret1.length, 4)
  t.is(ret1[0].length, 3)

  const ret2 = ds.selectCols('椰汁')
  t.is(ret2.length, 1)
  t.is(ret1[0].length, 3)
})
