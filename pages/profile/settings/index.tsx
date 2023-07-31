import React, { useEffect, useState } from "react";
import { Formik } from "formik";
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
import Image from "next/image";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { Modal } from "../../../common/components/Modal/Modal";
import { getLayout } from "../../../common/components/Layout/SettingsLayout/SettingsLayout";
import { useRouter } from "next/router";
import { Path } from "../../../common/enums/path";
import Calendar from "common/components/Calendar/Calendar";
import {
  BlockButton,
  IconBlock,
  StyledAvatarBlock,
  StyledContent,
  StyledLine,
  StyledProfileForm
} from "styles/styledComponents/profile/Settings.styled";

// //// Отображение страницы редактирования профиля  //  ////
//      с возможностью изменения аватарки                 //

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    photoModal: false, // открытие модального окна выбора аватарки
    saveProfileModal: false // открытие модального окна при сохранении изменений
  });
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
  }, [authMeHandler, getProfileInfo, setIsLoading]);

  // аватарка, отображаемая при загрузке
  const avatar = data?.photo || "/img/icons/avatar.svg";

  // начальные значения для формы
  const initialAuthValues = {
    username: usernameAuth?.login || data?.login || "",
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    birthday: data?.dateOfBirthday || "",
    city: data?.city || "",
    aboutMe: data?.userInfo || ""
  };
  // обработчик нажатия кнопки сохранения данных в форме
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
  // обработчик нажатия кнопки для открытия окна смены аватарки
  const handleAddPhoto = () => {
    setIsModalOpen({ photoModal: true, saveProfileModal: false });
  };

  // обработчик нажатия кнопки для закрытия модального окна смены аватарки
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
