import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout";
import {StyledAuthForm} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import styled from "styled-components";
import {baseTheme} from "../../../styles/styledComponents/theme";
import {FormikLabel} from "../../../common/components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../../common/components/Button/Button";
import {Formik} from "formik";
import {useSetProfileMutation} from "../../../assets/store/api/auth/authApi";
import {FormValueProfile, ResetForm} from "../../../common/components/Formik/types";
import {validateProfile} from "../../../common/utils/validateProfile";
import {StyledContainerAuth} from "../../../styles/styledComponents/auth/Auth.styled";
import {useRouter} from "next/router";


const ProfileSettings = () => {

  // const serverAvatar:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk4kkpSJ586hYNP7WOnZ9eQ3_KrPh2GLMBOg&usqp=CAU'
  const serverAvatar: string = ''
  const avatar = serverAvatar !== '' ? serverAvatar : '/icons/avatar.svg'

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


  const initialAuthValues = {
    username: login as string,
    firstname: "",
    lastname: "",
    birthday: "",
    city: "",
    aboutMe: ""
  }

  const [setProfileHandler] = useSetProfileMutation()


  const handleSubmit = async (values: FormValueProfile, {resetForm}: ResetForm) => {
    const data = {
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday,
      city: values.city,
      aboutMe: values.aboutMe
    }
    try {
      console.log(values.aboutMe)

      await setProfileHandler(data)
      resetForm()
    } catch (error) {
    }
  }


  return (
    <StyledContainerAuth>
      <StyledSidebar/>
      <StyledContainerSettings>
        <StyledNavigation/>
        <StyledContent>
          <StyledAvatarBlock>
            <img src={avatar} alt="Avatar"/>
            {/*<Image src={avatar} width={100} height={100} alt="Avatar"/>*/}
            <Button theme={ThemeButton.OUTLINED}>
              Add a Profile Photo
            </Button>
          </StyledAvatarBlock>
          <Formik
            initialValues={initialAuthValues}
            validationSchema={validateProfile}
            onSubmit={handleSubmit}
          >
            {({errors, touched, values, setFieldValue}) => (
              <StyledProfileForm width={'40vw'}>
                <FormikLabel
                  name="username"
                  onChange={(e) => setFieldValue("username", e)}
                  value={values.username}
                  type={"text"}
                  title={"Username"}
                  border={errors.username?.length && touched.username ? "red" : "white"}
                  errors={errors}
                  touched={touched}
                  width={'40vw'}
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
                  width={'40vw'}
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
                  width={'40vw'}
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
                  width={'150px'}
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
                  width={'40vw'}
                />

                <Button theme={ThemeButton.PRIMARY} type="submit" width={'159px'}>
                  Save Change
                </Button>
              </StyledProfileForm>
            )}
          </Formik>
        </StyledContent>
      </StyledContainerSettings>
    </StyledContainerAuth>
  );
};

GeneralInformation.getLayout = getLayout;
export default GeneralInformation;

const StyledProfileForm = styled(StyledAuthForm)
  `
    align-items: flex-end;
  `