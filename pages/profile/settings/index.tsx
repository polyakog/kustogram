import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
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
import { Modal } from "../../../common/components/Modals/ModalPublic/Modal";
import { getLayout } from "../../../common/components/Layout/PageLayout/PageLayout";
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
import FilterModal from "features/posts/FilterModal";
import { isElementAccessExpression } from "typescript";
import { StyledErrorMsg, StyledField } from "common/components/Formik/Formik.styled";
import ProfileCalendar from "features/settings/ProfileCalendar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import { useTranslation } from "next-i18next";

// //// Отображение страницы редактирования профиля  //  ////
//      с возможностью изменения аватарки                 //

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"], config))
    }
  };
}

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    photoModal: false, // открытие модального окна выбора аватарки
    saveProfileModal: false, // открытие модального окна при сохранении изменений
    filterModal: false
  });
  const [authMeLoading, setAuthMeLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [photo, setPhoto] = useState<File>();
  const { setItem, getItem } = useLocalStorage();
  const [saveProfileInfoHandler] = useSaveProfileInfoMutation();
  const [getProfileInfo, { data }] = useLazyProfileQuery();
  const [authMeHandler, { data: usernameAuth }] = useLazyAuthMeQuery();
  const router = useRouter();

  const { t } = useTranslation();

  useEffect(() => {
    authMeHandler()
      .unwrap()
      .then((res) => {
        setItem("userEmail", res.email);
        setItem("name", res.login);
        setAuthMeLoading(true);
      });

    const isProfile = !router.asPath.includes("profile=false");

    if (isProfile) {
      getProfileInfo()
        .unwrap()
        .finally(() => {
          setProfileLoading(true);
        });
    } else {
      setProfileLoading(true);
    }

    if (authMeLoading && profileLoading) {
      setIsLoading(true);
    }
  }, [authMeHandler, getProfileInfo, setIsLoading, authMeLoading, profileLoading]);

  // аватарка, отображаемая при загрузке
  const avatar = data?.photo || "/img/icons/avatar.svg";

  // начальные значения для формы
  const initialAuthValues = {
    username: data?.login || usernameAuth?.login || getItem("name") || "",
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
          setIsModalOpen({ photoModal: false, saveProfileModal: true, filterModal: false });
          router.push(Path.PROFILE_SETTINGS);
        });
    } catch (error) {}
  };
  // обработчик нажатия кнопки для открытия окна смены аватарки
  const handleAddPhoto = () => {
    setIsModalOpen({ photoModal: true, saveProfileModal: false, filterModal: false });
  };

  // обработчик нажатия кнопки для закрытия модального окна смены аватарки
  const handleModalClose = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false, filterModal: false });
  };

  const handleFilterModalOpen = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false, filterModal: true });
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
              <div style={{}}>
                <Button theme={ThemeButton.OUTLINED} width={"auto"} onClick={handleAddPhoto}>
                  {t("add_prof_photo")}
                </Button>
              </div>
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
                    title={t("username")}
                    border={errors.username?.length && touched.username ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    t={t}
                  />
                  <FormikLabel
                    name="firstname"
                    onChange={(e) => setFieldValue("firstname", e)}
                    value={values.firstname}
                    type={"text"}
                    title={t("f_name")}
                    border={errors.firstname?.length && touched.firstname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    t={t}
                  />
                  <FormikLabel
                    name="lastname"
                    onChange={(e) => setFieldValue("lastname", e)}
                    value={values.lastname}
                    type={"text"}
                    title={t("l_name")}
                    border={errors.lastname?.length && touched.lastname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    t={t}
                  />
                  <FormikLabel
                    name="city"
                    onChange={(e) => setFieldValue("city", e)}
                    value={values.city}
                    type={"text"}
                    title={t("city")}
                    border={errors.city?.length && touched.city ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    t={t}
                  />
                  <ProfileCalendar
                    setFieldValue={setFieldValue}
                    date={values.birthday || ""}
                    errors={errors["birthday"]}
                    touched={touched["birthday"]}
                    t={t}
                  />

                  <FormikLabel
                    name="aboutMe"
                    onChange={(e) => setFieldValue("aboutMe", e)}
                    value={values.aboutMe}
                    type={"textarea"}
                    title={t("about_me")}
                    border={errors.aboutMe?.length && touched.aboutMe ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    textAreaData={values.aboutMe}
                    t={t}
                  />
                  <BlockButton>
                    <StyledLine />
                    <Button theme={ThemeButton.PRIMARY} type="submit" width={"auto"}>
                      {t("save_changes")}
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
              title={t("general_info")}
              bodyText={t("profile_changes_saved")}
              handleModalClose={handleModalClose}
            >
              <Button theme={ThemeButton.PRIMARY} onClick={handleModalClose} width={"96px"}>
                OK
              </Button>
            </Modal>
          )}
          {/* {isModalOpen.filterModal && (
            <FilterModal handleModalClose = {handleModalClose} photo={photo}/>
          )} */}
        </SettingsPageWrapper>
      )}
    </>
  );
};

GeneralInformation.getLayout = getLayout;
export default GeneralInformation;
