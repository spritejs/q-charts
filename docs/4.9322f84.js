(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{59:function(s,a,t){"use strict";t.r(a);var r={components:{}},l=t(0),n=Object(l.a)(r,function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("section",[t("h2",[s._v("其它面积图")]),s._v(" "),t("h4",[s._v("Data update 数据更新面积图")]),s._v(" "),t("block-demo",{attrs:{tip:"",source:"const data = [\n{ product: '茶叶', year: '2016', sales: 81.2 },\n  { product: '茶叶', year: '2017', sales: 121.2 },\n  { product: '茶叶', year: '2018', sales: 41.2 },\n  { product: '牛奶', year: '2016', sales: 89.2 },\n  { product: '牛奶', year: '2017', sales: 50.6 },\n  { product: '牛奶', year: '2018', sales: 80.2 },\n  { product: '咖啡', year: '2016', sales: 35.2 },\n  { product: '咖啡', year: '2017', sales: 79.6 },\n  { product: '咖啡', year: '2018', sales: 61.2 },\n  { product: '椰汁', year: '2016', sales: 55.2 },\n  { product: '椰汁', year: '2017', sales: 69.6 },\n  { product: '椰汁', year: '2018', sales: 21.2 }\n]\n\nconst newData = [\n  { product: '茶叶', year: '2016', sales: 181.2 },\n  { product: '茶叶', year: '2017', sales: 51.2 },\n  { product: '茶叶', year: '2018', sales: 31.2 },\n  { product: '牛奶', year: '2016', sales: 59.2 },\n  { product: '牛奶', year: '2017', sales: 179.6 },\n  { product: '牛奶', year: '2018', sales: 130.2 },\n  { product: '咖啡', year: '2016', sales: 135.2 },\n  { product: '咖啡', year: '2017', sales: 69.6 },\n  { product: '咖啡', year: '2018', sales: 91.2 },\n  { product: '椰汁', year: '2016', sales: 85.2 },\n  { product: '椰汁', year: '2017', sales: 59.6 },\n  { product: '椰汁', year: '2018', sales: 31.2 }\n]\n\n\nconst { Chart, Area, Legend, Axis } = qcharts\n\nconst chart = new Chart({\n  container: '#app'\n})\n\nchart.source(data, {\n  row: 'year',\n  value: 'sales',\n  text: 'product'\n})\n\nconst area = new Area()\n.style('point',{fillColor:'transparent',strokeColor:'transparent'})\n.style('point:hover',{strokeColor:'#fff'})\n\nconst axisBottom = new Axis()\nconst axisLeft = new Axis({ orient: 'left' })\n.style('axis',false).style('scale',false)\n\narea.style('symbol:hover', { fillColor: '#f00' })\n\nconst legend = new Legend({ align: ['center', 'bottom'] })\n\nchart.add([area, axisBottom, axisLeft, legend])\nchart.render()\n\nsetTimeout(()=>{\n  chart.source(newData,{\n    row: 'year',\n    value: 'sales',\n    text: 'product'\n  })\n},2000)\n"}},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" data = [\n{ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("81.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("121.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("41.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("89.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("50.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("80.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("35.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("79.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("61.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("55.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("69.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("21.2")]),s._v(" }\n]\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" newData = [\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("181.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("51.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'茶叶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("31.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("59.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("179.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'牛奶'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("130.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("135.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("69.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'咖啡'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("91.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2016'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("85.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2017'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("59.6")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("product")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椰汁'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("year")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'2018'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("31.2")]),s._v(" }\n]\n\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Chart, Area, Legend, Axis } = qcharts\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" chart = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Chart({\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("container")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#app'")]),s._v("\n})\n\nchart.source(data, {\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("row")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'year'")]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("value")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'sales'")]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'product'")]),s._v("\n})\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" area = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Area()\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'point'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'transparent'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("strokeColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'transparent'")]),s._v("})\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'point:hover'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("strokeColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#fff'")]),s._v("})\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axisBottom = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axis()\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axisLeft = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axis({ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("orient")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'left'")]),s._v(" })\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'axis'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(").style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'scale'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(")\n\narea.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'symbol:hover'")]),s._v(", { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(" })\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" legend = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Legend({ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("align")]),s._v(": ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'center'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'bottom'")]),s._v("] })\n\nchart.add([area, axisBottom, axisLeft, legend])\nchart.render()\n\nsetTimeout("),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("()")]),s._v("=>")]),s._v("{\n  chart.source(newData,{\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("row")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'year'")]),s._v(",\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("value")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'sales'")]),s._v(",\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'product'")]),s._v("\n  })\n},"),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2000")]),s._v(")\n")])])]),t("h2",[s._v("Range Area Chart 区间面积图")]),s._v(" "),t("block-demo",{attrs:{tip:"",source:"const data = [\n  { date: '05-01',category:'图例一', sales: 15.2 },\n  { date: '05-02',category:'图例一', sales: 39.2 },\n  { date: '05-03',category:'图例一', sales: 31.2 },\n  { date: '05-04',category:'图例一', sales: 65.2 },\n  { date: '05-05',category:'图例一', sales: 55.2 },\n  { date: '05-06',category:'图例一', sales: 75.2 },\n  { date: '05-07',category:'图例一', sales: 95.2 },\n  { date: '05-08',category:'图例一', sales: 65.2 },\n  { date: '05-01',category:'图例二', sales: 10.2 },\n  { date: '05-02',category:'图例二', sales: 30.2 },\n  { date: '05-03',category:'图例二', sales: 25.2 },\n  { date: '05-04',category:'图例二', sales: 70.2 },\n  { date: '05-05',category:'图例二', sales: 45.2 },\n  { date: '05-06',category:'图例二', sales: 56.2 },\n  { date: '05-07',category:'图例二', sales: 70.2 },\n  { date: '05-08',category:'图例二', sales: 45.2 },\n]\n\nconst { Chart, Area, Legend, Tooltip, Axis } = qcharts\n\nconst chart = new Chart({\n  container: '#app'\n})\n\nchart.source(data, {\n  row: 'category',\n  value: 'sales',\n  text: 'date'\n})\n\nconst area = new Area({stack:false,smooth:true,compositeOperation:'xor'})\n.style('guideline',false)\n.style('point',{fillColor:'transparent',strokeColor:'transparent'})\n.style('point:hover',{strokeColor:'#fff'})\n\nconst axisBottom = new Axis()\n\nconst axisLeft = new Axis({ orient: 'left' })\n.style('axis',false).style('scale',false)\n\nconst legend = new Legend({ align: ['center', 'bottom'] })\n.style('icon',{borderRadius:10}).style('text',{fontSize:12})\n\nchart.add([area, axisBottom, axisLeft, legend])\nchart.render()\n"}},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" data = [\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-01'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("15.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-02'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("39.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-03'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("31.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-04'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("65.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-05'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("55.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-06'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("75.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-07'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("95.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-08'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例一'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("65.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-01'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-02'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("30.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-03'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("25.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-04'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("70.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-05'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("45.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-06'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("56.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-07'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("70.2")]),s._v(" },\n  { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("date")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'05-08'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("category")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'图例二'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sales")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("45.2")]),s._v(" },\n]\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Chart, Area, Legend, Tooltip, Axis } = qcharts\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" chart = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Chart({\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("container")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#app'")]),s._v("\n})\n\nchart.source(data, {\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("row")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'category'")]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("value")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'sales'")]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'date'")]),s._v("\n})\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" area = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Area({"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("stack")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("smooth")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("true")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("compositeOperation")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'xor'")]),s._v("})\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'guideline'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(")\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'point'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'transparent'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("strokeColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'transparent'")]),s._v("})\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'point:hover'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("strokeColor")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#fff'")]),s._v("})\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axisBottom = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axis()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axisLeft = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axis({ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("orient")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'left'")]),s._v(" })\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'axis'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(").style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'scale'")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" legend = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Legend({ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("align")]),s._v(": ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'center'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'bottom'")]),s._v("] })\n.style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'icon'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("borderRadius")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v("}).style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'text'")]),s._v(",{"),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(":"),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("12")]),s._v("})\n\nchart.add([area, axisBottom, axisLeft, legend])\nchart.render()\n")])])])],1)},[],!1,null,null,null);a.default=n.exports}}]);