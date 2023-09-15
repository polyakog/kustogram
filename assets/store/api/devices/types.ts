export type GetDevicesResponse = {
  dateCreate: string
  deviceId: string
  deviceName: string
  ip: string
  userId: string
}

export type GetAllDevicesResponse = GetDevicesResponse[]

export type DeleteDeviceRequest = {
  deviceId: string
}
