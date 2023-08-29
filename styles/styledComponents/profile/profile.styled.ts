import styled from "styled-components";
import { baseTheme } from "../theme";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import { DatePicker } from "@mui/x-date-pickers";

const media = mediaSizes.media;
const sidebarMedia = mediaSizes.sidebarMedia;

export const ProfileWrapper = styled.div`
  position: relative;
  max-width: 1065px;
  min-width: 360px;
  padding-top: 36px;
  margin-left: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 245px);
  scrollbar-width: 5px;

  &::-webkit-scrollbar {
    /* display: none; */
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${baseTheme.colors.light[900]};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${baseTheme.colors.dark[300]};
    /* border-radius: 20%;     */
  }
  /*   
  @media (max-width: ${"4000px"}) {
    margin-left: 24px;
  }
   */
  @media (max-width: ${media}) {
    padding-left: 78px;
    width: 100vw;
    margin-left: 0px;
  }
`;

export const BlockButton = styled.div`
  position: absolute;
  right: 2cqmax;
  top: 36px;
`;

export const HeaderStyle = styled.div`
  display: inline-flex;
  gap: 40px;
  align-content: center;
  width: 90%;
  @media (max-width: ${media}) {
    margin-left: -60px;
  }
`;

export const StyledAvatarBlock = styled.div`
  max-width: 204px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  background: ${baseTheme.colors.dark[700]};
`;

/* _______________расположение аватарки________________ */
export const IconBlock = styled.div`
  position: relative;
  width: 204px;
  height: 204px;
  overflow: hidden;
  margin: 0px 0px;
  background: ${baseTheme.colors.dark[100]};
  border-radius: 50%;

  @media (max-width: ${media}) {
    margin-top: 0px;
    max-width: 72px;
    max-height: 72px;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
`;

/* _____________конец аватарки______________________ */

export const UserNameStyle = styled.div`
  position: absolute;
  margin-top: 36px;
  left: 242px;
  top: 0px;

  color: ${baseTheme.colors.light[100]};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;

  display: inline-flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${media}) {
    position: absolute;
    left: 14px;
    top: 79px;
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
`;

export const Link = styled.a`
  color: ${baseTheme.colors.accent[500]};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-decoration-line: underline;
`;
export const InfoBlock = styled.div`
  margin-top: 151px;
  width: 100%;

  @media (max-width: ${media}) {
    margin-top: 108px;
  }
`;

export const FollowBlock = styled.div`
  display: grid;
  margin-top: -90px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-width: 290px;
  line-height: 24px;
  max-width: 350px;

  @media (max-width: ${media}) {
    text-align: center;
    line-height: 16px;
    margin-left: -25px;
    min-width: 235px;
  }
`;

export const FollowSpan = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  @media (max-width: ${media}) {
    font-family: Inter;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    font-style: normal;
  }
`;

export const AboutMeBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  flex-shrink: 0;
  margin-top: 24px;
  padding-right: 72px;

  @media (max-width: ${media}) {
    margin-top: 50px;
    margin-left: -115px;
    min-width: 300px;
    height: 60px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    padding-right: 20px;
  }
`;

export const AboutMeText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${baseTheme.colors.light[100]};

  @media (max-width: ${media}) {
    font-size: 14px;
    width: 120%;
  }
`;

export const PostWrapper = styled.div`
  flex-grow: 0;
  margin: 40px 0px -20px; // ссылка сюда
  width: calc(90vw - 250px); // подправить
  max-width: 1065px;
  height: 390px;

  padding: 5px 5px 5px 5px;
  border-radius: 2px;

  @media (max-width: ${media}) {
    height: 340px;
    margin: 29px -68px -20px; // ссылка сюда
    width: calc(100% - 50px); // подправить
  }
`;

export const PhotosBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
`;

export const PhotoStyle = styled.div`
  position: relative;
  flex-basis: auto;
  width: 228px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 2px;
  background: lightgray 50% / cover no-repeat;

  @media (max-width: ${media}) {
    width: 108px;
    height: 108px;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
`;

export const LoadingStyle: React.CSSProperties = {
  display: "flex",
  width: "maxContent",
  justifyContent: "center",
  textAlign: "center",
  marginTop: "20px",
  color: baseTheme.colors.success[500]
};

export const LoadingPostStyle = styled.div`
  display: flex;
  position: absolute;
  z-index: 7;
  font-size: 25px;
  margin: 420px calc(45% - 130px);
  // opacity: "80%",
  color: ${baseTheme.colors.success[500]};
  @media (max-width: ${media}) {
    margin: 125px calc(30vw - 50px);
  }
`;

export const LoadingPostBackStyle = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  background: ${baseTheme.colors.dark[500]};
  width: calc(100vw - 255px);
  max-width: 1070px;
  height: 360px;
  margin: 292px 0px;
  opacity: 50%;
  flex-wrap: wrap;
  @media (max-width: ${media}) {
    height: 339px;
    width: calc(100vw - 70px);
    margin: 30px -67px;
  }
`;
export const PostCountStyle = styled.div`
  font-size: 14px;
  color: ${baseTheme.colors.dark[100]};
  margin-top: 20px;

  @media (max-width: ${media}) {
    max-height: 198.5px;
    font-size: 12px;
  }
`;
