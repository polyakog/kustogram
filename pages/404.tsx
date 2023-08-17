import Image from "next/image";
import { Modal } from "../common/components/Modals/ModalPublic/Modal";
import { Button } from "../common/components/Button/Button";
import { ThemeButton } from "../common/enums/themeButton";
import React from "react";
import { useRouter } from "next/router";
import { getLayout } from "../common/components/Layout/BaseLayout/BaseLayout";

const NotFound = () => {
  return <div>404 NOT FOUND</div>;
};
