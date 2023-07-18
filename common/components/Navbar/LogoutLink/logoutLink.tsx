import { FC, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AppLink } from "../AppLink/AppLink";
import { Modal } from "../../Modal";
import { Button } from "../../Button/Button";
import { ThemeButton } from "../../../enums/themeButton";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../localStorage/types";
import { useRouter } from "next/router";
import { Path } from "../../../enums/path";

type LogoutLinkPropsType = {
  userEmail: string;
};
export const LogoutLink: FC<LogoutLinkPropsType> = ({ userEmail }) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  // const [logout] = useLogoutMutation()
  const { removeItem } = useLocalStorage();
  const router = useRouter();

  const logoutHandler = () => {
    // logout()
    //   .unwrap()
    //   .then(() => {
    removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    router.push(Path.LOGIN);
    // })
  };
  const onClose = () => {
    setIsOpenModalEdit(false);
  };
  const [hovered, setHovered] = useState(true);

  const handleMouseEnter = () => {
    setHovered(false);
  };

  const handleMouseLeave = () => {
    setHovered(true);
  };

  return (
    <>
      <AppLink onClick={() => setIsOpenModalEdit(true)} href={""}>
        <StyledDiv>
          <Image src={"/img/icons/log-out.svg"} alt={"logOut"} width={24} height={24} />
          <p>Log Out</p>
        </StyledDiv>
      </AppLink>
      {isOpenModalEdit && (
        <Modal
          width={"440px"}
          title={"Log Out"}
          bodyText={`Are you really want to log out of your account "${userEmail}"`}
          handleModalClose={onClose}
        >
          <>
            <Button
              theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
              onClick={logoutHandler}
              width={"96px"}
              onMouseEnter={handleMouseLeave}
              onMouseLeave={handleMouseEnter}
            >
              Yes
            </Button>
            <Button
              theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
              onClick={onClose}
              width={"96px"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              No
            </Button>
          </>
        </Modal>
      )}
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;