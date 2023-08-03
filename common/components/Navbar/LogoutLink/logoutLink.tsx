import { FC, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AppLink } from "../AppLink/AppLink";
import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { ThemeButton } from "../../../enums/themeButton";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useRouter } from "next/router";
import { Path } from "../../../enums/path";
import { useAppDispatch } from "common/hooks";
import { useLazyMeQuery } from "assets/store/api/auth/authApi";
import { initializeApp } from "assets/store/initializeApp";

export const LogoutLink: FC = () => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const { clearAll, getItem } = useLocalStorage();
  const router = useRouter();
  const userEmail = getItem("userEmail");

  /*   ________Инициализация_____________ */ //?
  const dispatch = useAppDispatch();
  const [getInitialize, { data: me, isLoading, error }] = useLazyMeQuery();

  /*   ________/Инициализация_____________ */

  const logoutHandler = () => {
    clearAll();
    getInitialize(); //?
    initializeApp(me, isLoading, error, dispatch); //?
    router.push(Path.LOGIN);
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
