import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormValueProfile } from "../../../common/components/Formik/types";
import { Button } from "../../../common/components/Button/Button";
import { FormikLabel } from "../../../common/components/Formik/FormikLabel";
import { validateProfile } from "../../../common/utils/validateProfile";
import { SettingsPageWrapper } from "../../../features/settings/SettingsPageWrapper";
import {
  useLazyAuthMeQuery,
  useLazyProfileQuery,
  useSaveProfileInfoMutation
} from "../../../assets/store/api/profile/profileApi";
import { ThemeButton } from "../../../common/enums/themeButton";
import PhotoSelectModal from "features/profile/PhotoSelectModal";
import { getLayout } from "../../../common/components/Layout/SettingsLayout/SettingsLayout";
import styled from "styled-components";
import Image from "next/image";
import { baseTheme } from "styles/styledComponents/theme";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ThemeProvider } from "@mui/material/styles";
import { MuiCalendarProfile } from "styles/MUI/MuiCalendarProfile";
import { StyledTitle } from "common/components/Formik/Formik.styled";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { Modal } from "../../../common/components/Modal/Modal";
//

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState({ photoModal: false, saveProfileModal: false }); // открытие модального окна загрузки новой аватарки
  const [isLoading, setIsLoading] = useState(false);
  const { setItem } = useLocalStorage();
  const [saveProfileInfoHandler] = useSaveProfileInfoMutation();
  const [getProfileInfo, { data }] = useLazyProfileQuery();
  const [authMeHandler, { data: usernameAuth }] = useLazyAuthMeQuery();

  useEffect(() => {
    authMeHandler()
      .unwrap()
      .then((res) => {
        setItem("userEmail", res.email);
      });
    getProfileInfo()
      .unwrap()
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  // начальные значения, отображаемые на странице
  const avatar = data?.photo || "/img/icons/avatar.svg";

  dayjs.extend(customParseFormat);
  const birthDate = dayjs(data?.dateOfBirthday, "DD-MM-YYYY");

  const initialAuthValues = {
    username: data?.login || usernameAuth?.login || "",
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    birthday: data?.dateOfBirthday || "",
    city: data?.city || "",
    aboutMe: data?.userInfo || ""
  };

  // обработчик сохранения формы
  const handleSubmit = async (values: FormValueProfile) => {
    const data = {
      login: values.username,
      firstName: values.firstname,
      lastName: values.lastname,
      dateOfBirthday: values.birthday,
      city: values.city,
      userInfo: values.aboutMe
    };
    try {
      await saveProfileInfoHandler(data)
        .unwrap()
        .then(() => {
          setIsModalOpen({ photoModal: false, saveProfileModal: true });
        });
    } catch (error) {}
  };

  // открытие модального окна для загрузки новой аватарки
  const handleAddPhoto = () => {
    setIsModalOpen({ photoModal: true, saveProfileModal: false });
  };

  // закрытие модального окна для загрузки аватарки
  const handleModalClose = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false });
  };

  return (
    <>
      {isLoading && (
        <SettingsPageWrapper>
          <StyledContent>
            <StyledAvatarBlock>
              <IconBlock>
                <Image src={avatar} alt={"Avatar"} width={192} height={192} />
              </IconBlock>

              <Button theme={ThemeButton.OUTLINED} width={"100%"} onClick={handleAddPhoto}>
                Add a Profile Photo
              </Button>
            </StyledAvatarBlock>
            <Formik
              initialValues={initialAuthValues}
              validationSchema={validateProfile}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <StyledProfileForm>
                  <FormikLabel
                    name="username"
                    onChange={(e) => setFieldValue("username", e)}
                    value={values.username}
                    type={"text"}
                    title={"Username"}
                    border={errors.username?.length && touched.username ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="firstname"
                    onChange={(e) => setFieldValue("firstname", e)}
                    value={values.firstname}
                    type={"text"}
                    title={"First Name"}
                    border={errors.firstname?.length && touched.firstname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="lastname"
                    onChange={(e) => setFieldValue("lastname", e)}
                    value={values.lastname}
                    type={"text"}
                    title={"Last Name"}
                    border={errors.lastname?.length && touched.lastname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="city"
                    onChange={(e) => setFieldValue("city", e)}
                    value={values.city}
                    type={"text"}
                    title={"City"}
                    border={errors.city?.length && touched.city ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <StyledTitle>
                    <span>Date of birthday</span>
                  </StyledTitle>
                  <ThemeProvider theme={MuiCalendarProfile}>
                    <DatePicker
                      value={birthDate}
                      format={"DD/MM/YYYY"}
                      disableFuture={true}
                      onChange={(newValue) => {
                        const date = newValue?.format("DD/MM/YYYY");
                        setFieldValue("birthday", date);
                      }}
                    />
                  </ThemeProvider>
                  <FormikLabel
                    name="aboutMe"
                    onChange={(e) => setFieldValue("aboutMe", e)}
                    value={values.aboutMe}
                    type={"textarea"}
                    title={"About Me"}
                    border={errors.aboutMe?.length && touched.aboutMe ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    textAreaData={values.aboutMe}
                  />
                  <BlockButton>
                    <StyledLine />
                    <Button theme={ThemeButton.PRIMARY} type="submit" width={"159px"}>
                      Save Change
                    </Button>
                  </BlockButton>
                </StyledProfileForm>
              )}
            </Formik>
          </StyledContent>
          {isModalOpen.photoModal && (
            <PhotoSelectModal handleModalClose={handleModalClose} avatar={data?.photo} />
          )}
          {isModalOpen.saveProfileModal && (
            <Modal
              title="Profile settings saved"
              bodyText={`Profile settings saved`}
              handleModalClose={handleModalClose}
            >
              <Button theme={ThemeButton.PRIMARY} onClick={handleModalClose} width={"96px"}>
                OK
              </Button>
            </Modal>
          )}
        </SettingsPageWrapper>
      )}
    </>
  );
};

GeneralInformation.getLayout = getLayout;
export default GeneralInformation;

// стили

const StyledContent = styled.div`
  position: relative;
  display: flex;
  gap: 40px;

  @media (max-width: 790px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledAvatarBlock = styled.div`
  max-width: 192px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 20px;

  background: ${baseTheme.colors.dark[700]};
  color: ${baseTheme.colors.dark[100]};
`;

const IconBlock = styled.div`
  position: relative;

  width: 192px;
  height: 192px;
  overflow: hidden;
  background: ${baseTheme.colors.dark[100]};
  border-radius: 50%;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 192px;
    height: 192px;
    object-fit: cover;
  }
`;

const StyledProfileForm = styled(Form)`
  align-items: flex-end;
  width: 100%;
`;

const StyledLine = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 100%;
  max-width: 726px;
  height: 1px;
  background: ${baseTheme.colors.dark[300]};
`;

const BlockButton = styled.div`
  text-align: right;
  padding-top: 24px;
`;
