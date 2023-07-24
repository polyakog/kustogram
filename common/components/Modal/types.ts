import React from "react";

export type ModalPropsType = {
  handleModalClose: () => void;
  handleCrossClick?: () => void;
  title: string;
  bodyText: string;
  width?: string;
  height?: string;
  children?: React.ReactElement;
};
