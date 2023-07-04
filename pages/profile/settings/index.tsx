import {getLayout} from "../../../components/Layout/BaseLayout/BaseLayout";
import {StyledAuthForm, StyledContainerAuth} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import styled from "styled-components";
import {baseTheme} from "../../../styles/styledComponents/theme";
import {FormikLabel} from "../../../components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../../components/Button/Button";
import {Formik} from "formik";
import {useSetProfileMutation} from "../../../store/api/auth/authApi";
import {FormValueProfile, ResetForm} from "../../../components/Formik/types";
import {validateProfile} from "../../../utils/validateProfile";


const ProfileSettings = () => {

  // const serverAvatar:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk4kkpSJ586hYNP7WOnZ9eQ3_KrPh2GLMBOg&usqp=CAU'
  const serverAvatar:string = ''
  const avatar = serverAvatar !== '' ? serverAvatar : '/icons/avatar.svg'

  const initialAuthValues = {
    username: "",
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


ProfileSettings.getLayout = getLayout
export default ProfileSettings;

const StyledContainerSettings = styled(StyledContainerAuth)
  `
    width: 70vw;
    //border: 1px solid red;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

  `

const StyledSidebar = styled(StyledContainerAuth)
  `
    width: 20vw;
    display: flex;
    //border: 1px solid green;

  `

const StyledContent = styled.div
  `
    width: 100%;
    margin-top: 40px;

    display: flex;
    gap: 36px;
  
    @media(max-width:790px ){
      flex-direction: column;
      align-items: center;
    }
  `


const StyledNavigation = styled.header
  `
    width: 80%;
    height: 60px;
    padding: 0 4.6%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    background: ${baseTheme.colors.dark[700]};
    border-bottom: 2px solid ${baseTheme.colors.dark[100]};
    color: ${baseTheme.colors.dark[100]};
    @media(max-width:790px ){
      width:100%;      
    }
    
  `
const StyledAvatarBlock = styled.div
  `
    width: 20%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    //align-items: flex-start;
    align-content: flex-start;
    gap: 20px;

    background: ${baseTheme.colors.dark[700]};
    //border: 2px solid darkred;
    color: ${baseTheme.colors.dark[100]};

    & img {
      width: 13.5vw;
      height: 13.5vw;
      border-radius: 50%;
      
    //& Image {
    //  width: 13.5vw;
    //  height: 13.5vw;
    //  border-radius: 50%;

      @media(max-width:790px ){
        width: 40vw;
        height: 40vw;
      }
    }

    @media(max-width:790px ){
      width: 60%;
    }
  `

const StyledProfileForm = styled(StyledAuthForm)
`
align-items: flex-end;
`