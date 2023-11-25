import { Sceleton } from '../../../styles/styledComponents/admin/sceleton.styled'

import {
  StyledFlexContainer,
  StyledIdDate,
  StyledIdDateContainer,
  StyledNameContainer,
} from './UserInfo'

// Компонента для отображения схемы, где на странице должны будут располагаться данные,
// которая появляется во время загрузки

const UserInfoSceleton = () => {
  return (
    <>
      <Sceleton height="14px" margin="5px 0" radius="5px" width="150px" />
      <StyledFlexContainer>
        <Sceleton height="60px" radius="50%" width="60px" />
        <StyledNameContainer>
          <Sceleton height="20px" margin="10px 0" maxwidth="425px" minwidth="100px" radius="5px" />
          <Sceleton height="14px" maxwidth="425px" minwidth="100px" radius="5px" />
        </StyledNameContainer>
      </StyledFlexContainer>
      <StyledIdDateContainer>
        <StyledIdDate>
          <Sceleton height="14px" margin="5px 0" radius="5px" width="100%" />
          <Sceleton height="16px" margin="4px 0" radius="5px" width="320px" />
        </StyledIdDate>
        <StyledIdDate>
          <Sceleton height="14px" margin="5px 0" radius="5px" width="100%" />
          <Sceleton height="16px" margin="4px 0" radius="5px" width="100%" />
        </StyledIdDate>
      </StyledIdDateContainer>
    </>
  )
}

export default UserInfoSceleton
