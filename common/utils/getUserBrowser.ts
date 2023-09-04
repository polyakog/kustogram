import adapter from 'webrtc-adapter'

export const getUserBrowser = () => {
  return adapter.browserDetails.browser
}
