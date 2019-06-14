import test from 'ava'
import qcharts from '@/index'

const { Chart } = qcharts

test('chart theme', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })

  chart.render()

  let isThemeChange = false

  chart.on('theme:change', () => {
    isThemeChange = true
    t.truthy(isThemeChange)
  })

  chart.setTheme('dark')
})
