import styled from "styled-components";
import { baseTheme } from "../theme";
import { mediaSizes } from "common/constants/Profile/mediaSizes";

const media = mediaSizes.media;

export const SigninWrapper = styled.div`
  /* position: relative; */
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
`;

export const BlockButton = styled.div`
  display: block;
  text-align: center;
`;

export const buttonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem 1rem",
  minHeight: "0.62px",
  position: "relative",
  margin: "20px 0",
  transform: "all .1s ease-in-out"
};
export const spanStyle: React.CSSProperties = {
  flexGrow: "1",
  display: "flex",
  fontSize: "1.1rem",
  fontWeight: "500",
  margin: "0 0 0 1.75rem"
};

// export const UserNameStyle = styled.div`
//   position: absolute;
//   left: 242px;
//   top: 0px;

//   color: ${baseTheme.colors.light[100]};
//   font-family: Inter;
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 36px;

//   display: inline-flex;
//   align-items: center;
//   gap: 12px;

//   @media (max-width: ${media}) {
//     position: absolute;
//     left: 0px;
//     top: 82px;
//     font-family: Inter;
//     font-size: 16px;
//     line-height: 24px;
//   }
// `;

// export const Link = styled.a`
//   color: ${baseTheme.colors.accent[500]};
//   font-family: Inter;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   text-decoration-line: underline;
// `;
// export const InfoBlock = styled.div`
//   margin-top: 151px;

//   @media (max-width: ${media}) {
//     margin-top: 108px;
//   }
// `;

// export const FolowBlock = styled.div`
//   display: grid;
//   margin-top: -90px;
//   grid-template-columns: 1fr 1fr 1fr;

//   font-family: Inter;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 24px;

//   @media (max-width: ${media}) {
//     text-align: center;
//     font-family: Inter;
//     font-size: 12px;
//     font-weight: 600;
//     line-height: 16px;
//   }
// `;

// export const AboutMeBlock = styled.div`
//   display: flex;
//   width: 100%;
//   flex-direction: column;
//   flex-shrink: 0;
//   margin-top: 24px;
//   padding-right: 72px;

//   @media (max-width: ${media}) {
//     margin-top: 80px;
//     margin-left: -110px;
//     min-width: 300px;
//     display: flex;
//     flex-direction: column;
//     flex-shrink: 0;
//     adding-right: 20px;
//   }
// `;

// export const AboutMeText = styled.p`
//   font-family: Inter;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   color: ${baseTheme.colors.light[100]};

//   @media (max-width: ${media}) {
//     font-size: 14px;
//     width: 120%;
//   }
// `;
