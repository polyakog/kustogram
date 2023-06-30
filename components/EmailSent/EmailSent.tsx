import styled from "styled-components"

const StyledEmailSentWrapper = styled.div``

const StyledEmailSentHeader=styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledTitle=styled.h3`
    
`
const StyledCloseModal=styled.span`
    
`

const StyledMessage = styled.p``
const StyledConfirm = styled.button`
display: flex;
width: 96px;
padding: 6px 24px;
justify-content: center;
align-items: center;
`

const EmailSent = () => {
  return <StyledEmailSentWrapper>
    <StyledEmailSentHeader>
        <StyledTitle>Email sent</StyledTitle>
        <StyledCloseModal>X</StyledCloseModal>
    </StyledEmailSentHeader>
  </StyledEmailSentWrapper>
}

export default EmailSent
