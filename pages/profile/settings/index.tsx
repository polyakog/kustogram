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
import { baseTheme } from "../../../styles/styledComponents/theme";
import Image from "next/image";
import { transformDate } from "common/utils/transformDate";

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // открытие модального окна загрузки новой аватарки
  const [isLoading, setIsLoading] = useState(false);

  const [saveProfileInfoHandler] = useSaveProfileInfoMutation();
  const [getProfileInfo, { data }] = useLazyProfileQuery();
  const [authMeHandler, { data: usernameAuth }] = useLazyAuthMeQuery();

  useEffect(() => {
    authMeHandler();
    getProfileInfo()
      .unwrap()
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  // начальные значения, отображаемые на странице
  const avatar = data?.photo || "/img/icons/avatar.svg";
  const initialAuthValues = {
    username: data?.login || usernameAuth?.login || "",
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    birthday: data?.dateOfBirthday ? transformDate(data.dateOfBirthday) : "",
    city: data?.city || "",
    aboutMe: data?.userInfo || ""
  };

  const handleSubmit = async (values: FormValueProfile) => {
    const date = transformDate(values.birthday);
    const data = {
      login: values.username,
      firstName: values.firstname,
      lastName: values.lastname,
      dateOfBirthday: date,
      city: values.city,
      userInfo: values.aboutMe
    };
    try {
      await saveProfileInfoHandler(data);
    } catch (error) {}
  };

  // открытие модального окна для загрузки новой аватарки
  const handleAddPhoto = () => {
    setIsModalOpen(true);
  };

  // закрытие модального окна для загрузки аватарки
  const handleModalClose = () => {
    setIsModalOpen(false);
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
                  <FormikLabel
                    name="birthday"
                    onChange={(e) => setFieldValue("birthday", e)}
                    value={values.birthday}
                    type={"date"}
                    title={"Date of birthday"}
                    border={errors.birthday?.length && touched.birthday ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"150px"}
                  />
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
          {isModalOpen && (
            <PhotoSelectModal handleModalClose={handleModalClose} avatar={data?.photo} />
          )}
        </SettingsPageWrapper>
      )}
    </>
  );
};

GeneralInformation.getLayout = getLayout;
export default GeneralInformation;

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
