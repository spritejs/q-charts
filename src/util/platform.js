export const isWeixinApp = () => {
  return typeof wx !== 'undefined' &&
    typeof wx.getSystemInfoSync === 'function'
}
