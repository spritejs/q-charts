(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{100:function(s,a,t){"use strict";t.r(a);var n={components:{}},r=t(0),e=Object(r.a)(n,function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("section",[t("h2",[s._v("文字")]),s._v(" "),t("block-demo",{attrs:{tip:"",source:"fetch('http://s5.qhres.com/static/81bf507dbbc7c08d.json')\n  .then(res => res.json())\n  .then(mapData => {\n    const { Chart, Tooltip, Text, Map } = qcharts\n\n    const chart = new Chart({\n      container: '#app'\n    })\n\n    const map = new qcharts.Map({\n      projection: 'geoMercator'\n    })\n\n    map\n      .setGeomData(mapData, { items: mapData.features })\n      .style('normal', { fillColor: '#214882', color: '#479cd3' })\n\n    map.add(Map.Text, {\n      style: {\n        normal(attrs, data, i) {\n          return {\n            text: data.properties.name,\n            color: '#fff',\n            fontSize: '8px',\n            anchor: [0, 0.5],\n            translate: [8, 0]\n          }\n        }\n      }\n    })\n\n    const tooltip = new Tooltip()\n    tooltip.formatter(data => `${data.properties.name}`)\n\n    chart\n      .add(map)\n      .add(tooltip)\n      .add(new Text({ text: '中国各省市' }))\n\n    chart.setTheme('dark')\n    chart.render()\n  })\n"}},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v("fetch("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'http://s5.qhres.com/static/81bf507dbbc7c08d.json'")]),s._v(")\n  .then("),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" res.json())\n  .then("),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("mapData")]),s._v(" =>")]),s._v(" {\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Chart, Tooltip, Text, "),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Map")]),s._v(" } = qcharts\n\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" chart = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Chart({\n      "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("container")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#app'")]),s._v("\n    })\n\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" map = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" qcharts.Map({\n      "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("projection")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'geoMercator'")]),s._v("\n    })\n\n    map\n      .setGeomData(mapData, { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("items")]),s._v(": mapData.features })\n      .style("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'normal'")]),s._v(", { "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#214882'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#479cd3'")]),s._v(" })\n\n    map.add("),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Map")]),s._v(".Text, {\n      "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("style")]),s._v(": {\n        normal(attrs, data, i) {\n          "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n            "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": data.properties.name,\n            "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#fff'")]),s._v(",\n            "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'8px'")]),s._v(",\n            "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("anchor")]),s._v(": ["),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.5")]),s._v("],\n            "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("translate")]),s._v(": ["),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("8")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("]\n          }\n        }\n      }\n    })\n\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" tooltip = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Tooltip()\n    tooltip.formatter("),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("data")]),s._v(" =>")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("`"),t("span",{pre:!0,attrs:{class:"hljs-subst"}},[s._v("${data.properties.name}")]),s._v("`")]),s._v(")\n\n    chart\n      .add(map)\n      .add(tooltip)\n      .add("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Text({ "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'中国各省市'")]),s._v(" }))\n\n    chart.setTheme("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'dark'")]),s._v(")\n    chart.render()\n  })\n")])])])],1)},[],!1,null,null,null);a.default=e.exports}}]);