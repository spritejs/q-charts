(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{82:function(s,t,a){"use strict";a.r(t);var n={components:{}},r=a(0),e=Object(r.a)(n,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",[s._v("弧饼图")]),s._v(" "),a("p",[s._v("弧饼图继承至饼图，使用了不同的图形进行渲染。")]),s._v(" "),a("block-demo",{attrs:{tip:"",source:"const data = [\n  {\n    type: '污染源',\n    count: 4454\n  },\n\n  {\n    type: '消防场所',\n    count: 1239\n  },\n\n  {\n    type: '安全生产',\n    count: 3758\n  },\n\n  {\n    type: '治安场所',\n    count: 4300\n  }\n]\n\nconst { Chart, ArcPie, Legend, Tooltip } = qcharts\n\nconst chart = new Chart({\n  container: '#app'\n})\n\nchart.source(data, {\n  row: 'type',\n  value: 'count'\n})\n\nconst arcPie = new ArcPie({\n  pos: ['-10%', '10%'],\n  radius: 0.6,\n  innerRadius: 0.1,\n  lineWidth: 15,\n  padAngle: 0.02,\n  title: d => `${d[0].dataOrigin.type}`,\n  subTitle: d => `${d[0].dataOrigin.count}`\n})\n\narcPie.style('arc', { lineCap: 'round' })\narcPie.style('title', { fontSize: 24 })\n\nconst legend = new Legend({\n  orient: 'vertical',\n  align: ['right', 'center'],\n  formatter: (_, i) => {\n    let d = data[i]\n    return (\n      `${d.type}` +\n      Array(8 - d.type.length)\n        .fill(`   `)\n        .join('') +\n      `${d.count}`\n    )\n  }\n})\nlegend.style('icon', (attrs, d, i) => ({\n  marginTop: i > 0 ? 10 : 0\n}))\nlegend.style('text', (attrs, d, i) => ({\n  marginTop: i > 0 ? 10 : 0\n}))\n\nchart.add([arcPie, legend])\nchart.render()\n"}},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" data = [\n  {\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("type")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'污染源'")]),s._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("count")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4454")]),s._v("\n  },\n\n  {\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("type")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'消防场所'")]),s._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("count")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1239")]),s._v("\n  },\n\n  {\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("type")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'安全生产'")]),s._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("count")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("3758")]),s._v("\n  },\n\n  {\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("type")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'治安场所'")]),s._v(",\n    "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("count")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4300")]),s._v("\n  }\n]\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Chart, ArcPie, Legend, Tooltip } = qcharts\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" chart = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Chart({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("container")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#app'")]),s._v("\n})\n\nchart.source(data, {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("row")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'type'")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("value")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'count'")]),s._v("\n})\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" arcPie = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" ArcPie({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": ["),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'-10%'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'10%'")]),s._v("],\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("radius")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.6")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("innerRadius")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.1")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineWidth")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("15")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("padAngle")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.02")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("title")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("d")]),s._v(" =>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`"),a("span",{pre:!0,attrs:{class:"hljs-subst"}},[s._v("${d["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("].dataOrigin.type}")]),s._v("`")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("subTitle")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("d")]),s._v(" =>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`"),a("span",{pre:!0,attrs:{class:"hljs-subst"}},[s._v("${d["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("].dataOrigin.count}")]),s._v("`")]),s._v("\n})\n\narcPie.style("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'arc'")]),s._v(", { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineCap")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'round'")]),s._v(" })\narcPie.style("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'title'")]),s._v(", { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("24")]),s._v(" })\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" legend = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Legend({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("orient")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'vertical'")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("align")]),s._v(": ["),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'right'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'center'")]),s._v("],\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("formatter")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("_, i")]),s._v(") =>")]),s._v(" {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" d = data[i]\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" (\n      "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`"),a("span",{pre:!0,attrs:{class:"hljs-subst"}},[s._v("${d.type}")]),s._v("`")]),s._v(" +\n      "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("8")]),s._v(" - d.type.length)\n        .fill("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`   `")]),s._v(")\n        .join("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("''")]),s._v(") +\n      "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`"),a("span",{pre:!0,attrs:{class:"hljs-subst"}},[s._v("${d.count}")]),s._v("`")]),s._v("\n    )\n  }\n})\nlegend.style("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon'")]),s._v(", (attrs, d, i) => ({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("marginTop")]),s._v(": i > "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ? "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(" : "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n}))\nlegend.style("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'text'")]),s._v(", (attrs, d, i) => ({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("marginTop")]),s._v(": i > "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ? "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(" : "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n}))\n\nchart.add([arcPie, legend])\nchart.render()\n")])])])],1)},[],!1,null,null,null);t.default=e.exports}}]);