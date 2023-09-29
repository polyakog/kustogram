import { deviceDetect, browserName, osName } from 'react-device-detect'

export const getBrowserInfo = () => {
  const browserData = {
    ip: '',
    browserName,
    deviceName: 'descktop/windows',
  }
  const fetchFn = async () => {
    await fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(res => {
        browserData.ip = res.ip
      })
  }

  fetchFn()

  return browserData
}
