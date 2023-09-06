import React from 'react'

export type ModalPropsType = {
  bg?: string
  bodyText?: string
  children?: React.ReactElement
  email?: string
  handleCrossClick?: () => void
  handleModalClose?: () => void
  height?: string
  title?: string
  width?: string
}

export type ModalSizePropsType = {
  height?: string
  width?: string
}
export type ModalPostPropsType = ModalPropsType & {
  handleModalBack?: () => void
  handleModalClose: () => void
  handleModalNext?: () => void
  nextTitle?: string
}
