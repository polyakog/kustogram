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
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { ThemeButton } from "../../../common/enums/themeButton";
import PhotoSelectModal from "features/profile/PhotoSelectModal";
import styled from "styled-components";
import Image from "next/image";
import { baseTheme } from "styles/styledComponents/theme";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { Modal } from "../../../common/components/Modal/Modal";
import { getLayout } from "../../../common/components/Layout/SettingsLayout/SettingsLayout";
import { useRouter } from "next/router";
import { Path } from "../../../common/enums/path";
import Calendar from "common/components/Calendar/Calendar";

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState({ photoModal: false, saveProfileModal: false });
  const [isLoading, setIsLoading] = useState(false);
  const { setItem } = useLocalStorage();
  const [saveProfileInfoHandler] = useSaveProfileInfoMutation();
  const [getProfileInfo, { data }] = useLazyProfileQuery();
  const [authMeHandler, { data: usernameAuth }] = useLazyAuthMeQuery();
  const router = useRouter();

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

  const avatar = data?.photo || "/img/icons/avatar.svg";

  dayjs.extend(customParseFormat);
  const birthDate = dayjs(data?.dateOfBirthday, "DD-MM-YYYY");

  const initialAuthValues = {
    username: usernameAuth?.login || data?.login || "",
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    birthday: data?.dateOfBirthday || "",
    city: data?.city || "",
    aboutMe: data?.userInfo || ""
  };

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
          router.push(Path.PROFILE_SETTINGS);
        });
    } catch (error) {}
  };

  const handleAddPhoto = () => {
    setIsModalOpen({ photoModal: true, saveProfileModal: false });
  };
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
                  <Calendar setFieldValue={setFieldValue} date={data?.dateOfBirthday || ""} />
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
              title="General information "
              bodyText={`Profile changes saved`}
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

export const StyledContent = styled.div`
  position: relative;
  display: flex;
  gap: 40px;

  @media (max-width: 790px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledAvatarBlock = styled.div`
  max-width: 192px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 20px;

  background: ${baseTheme.colors.dark[700]};
  color: ${baseTheme.colors.dark[100]};
`;

export const IconBlock = styled.div`
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
