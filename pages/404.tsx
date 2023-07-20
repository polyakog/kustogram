import Image from "next/image";
import { Modal } from "../common/components/Modal/Modal";
import { Button } from "../common/components/Button/Button";
import { ThemeButton } from "../common/enums/themeButton";
import React from "react";
import { useRouter } from "next/router";
import { getLayout } from "../common/components/Layout/BaseLayout/BaseLayout";

const NotFound = () => {
  const router = useRouter();
  const handleModalClose = () => {
    router.back();
  };

  return (
    <div>
      <Image src="/img/404.svg" alt="Next.js Logo" width={1280} height={720} priority />
      <Modal
        title="ERROR_404_"
        bodyText={`Page not found. Click the button or close the modal to go back.`}
        handleModalClose={handleModalClose}
      >
        <Button theme={ThemeButton.PRIMARY} onClick={handleModalClose} width={"196px"}>
          Go to Back
        </Button>
      </Modal>
    </div>
  );
};
NotFound.getLayout = getLayout;
export default NotFound;
