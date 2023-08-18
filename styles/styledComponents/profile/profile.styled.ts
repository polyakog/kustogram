import styled from "styled-components";
import { baseTheme } from "../theme";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import { DatePicker } from "@mui/x-date-pickers";

const media = mediaSizes.media;

export const ProfileWrapper = styled.div`
  position: relative;
  max-width: 1310px;
`;

export const BlockButton = styled.div`
  position: absolute;
  right: 64px;
  top: 0px;
`;

export const HeaderStyle = styled.div`
  display: inline-flex;
  gap: 40px;
  align-content: center;
  width: auto;
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
    left: 0px;
    top: 82px;
    font-family: Inter;
    font-size: 16px;
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

  @media (max-width: ${media}) {
    margin-top: 108px;
  }
`;

export const FolowBlock = styled.div`
  display: grid;
  margin-top: -90px;
  grid-template-columns: 1fr 1fr 1fr;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: ${media}) {
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
`;

export const AboutMeBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 24px;
  padding-right: 72px;

  @media (max-width: ${media}) {
    margin-top: 80px;
    margin-left: -110px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    adding-right: 20px;
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

export const PhotosBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* padding-top: 24px; */
  justify-content: space-between;
  gap: 10px;
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

export const ScrollStyle = styled.div`
  position: relative;
  margin-top: 40px;
  height: 350px;
  overflow-y: scroll;
  padding: 5px 5px 5px 5px;
  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark[100]};
  @media (max-width: ${media}) {
    height: 200px;
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
export const LoadingPostStyle: React.CSSProperties = {
  display: "flex",
  position: "absolute",
  zIndex: "7",
  fontSize: "25px",
  margin: "85px 40%",
  // opacity: "80%",
  color: baseTheme.colors.success[500],
  flexWrap: "wrap"
};

export const LoadingPostBackStyle = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  background: ${baseTheme.colors.dark[500]};
  width: calc(100% - 26px);
  height: 348.5px;
  margin: 1px 5px;
  opacity: 50%;
  flex-wrap: wrap;
  @media (max-width: ${media}) {
    max-height: 198.5px;
  }
`;
export const PostCountStyle = styled.div`
  font-size: 14px;
  color: ${baseTheme.colors.dark[100]};

  @media (max-width: ${media}) {
    max-height: 198.5px;
    font-size: 12px;
  }
`;
