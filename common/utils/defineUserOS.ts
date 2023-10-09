export const defineUserOS = (device: string): string => {
  const splittedStr = device.split('/')

  if (splittedStr.length > 2) {
    return splittedStr[1]
  }

  return splittedStr[0]
}
