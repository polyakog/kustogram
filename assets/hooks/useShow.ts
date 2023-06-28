import { useState } from 'react';

interface ReturnType {
  show: boolean;
  showConfirm: boolean;
  onButtonIconClick: () => void;
  onButtonIconConfirmClick: () => void;
}

export const useShow = (): ReturnType => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onButtonIconClick = (): void => {
    setShow(!show);
  };
  const onButtonIconConfirmClick = (): void => {
    setShowConfirm(!showConfirm);
  };

  return {
    show,
    showConfirm,
    onButtonIconClick,
    onButtonIconConfirmClick,
  };
};