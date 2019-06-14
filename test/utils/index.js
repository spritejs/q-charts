const Wrapper = require('./Wrapper')

exports.mount = function mount(rootElement) {
  return new Wrapper(rootElement)
}
