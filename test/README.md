# 测试

> 目前仅作 单元测试。

## 测试说明

命令区别：

- `npm run test`: 测试所有 `case` ，所有测试跑通后生成测试报告
- `npm run testOnly`: 仅测试，不生成报告

如需单独测试某个文件，请全局安装 `npm i -g ava` 然后执行 `ava filename.test.js`
