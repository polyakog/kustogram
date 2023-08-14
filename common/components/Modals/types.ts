import React from "react";

export type ModalPropsType = {
  handleModalClose?: () => void;
  handleCrossClick?: () => void;
  title?: string;
  bodyText?: string;
  width?: string;
  height?: string;
  children?: React.ReactElement;
};

export type ModalSizePropsType = {
  width?: string;
  height?: string;
};
export type ModalPostPropsType = ModalPropsType & {
  nextTitle?: string;
  handleModalNext?: () => void;
  handleModalBack?: () => void;
  handleModalClose: () => void;
};
