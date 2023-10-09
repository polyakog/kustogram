import mac from 'public/img/icons/desktop_mac.svg'
import iphone from 'public/img/icons/phone_iphone.svg'

export const defineDeviceIcon = (deviceName: string) => {
  return deviceName.split('/')[0] === 'Desktop' ? mac : iphone
}
