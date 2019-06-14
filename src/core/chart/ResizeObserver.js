const CSS =
  'position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;'

const R = function(handler) {
  return {
    observe(element) {
      let frame = document.createElement('iframe')
      frame.style.cssText = CSS
      frame.onload = () => {
        frame.contentWindow.onresize = () => {
          handler(element)
        }
      }
      element.appendChild(frame)
    }
  }
}

export default R
