import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import Image from "next/image";
import { useProfileQuery } from "assets/store/api/profile/profileApi";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Path } from "common/enums/path";
import { useWindowSize } from "common/hooks/useWindowSize";

const MyProfile = () => {
  const serverAvatar: string = "";
  const avatar = serverAvatar !== "" ? serverAvatar : "/img/icons/avatar.svg";
  const { data } = useProfileQuery();

  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS);
  };

  useEffect(() => {
    if (width) {
      if (width < 880) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [width]);

  return (
    <ProfileWrapper>
      <HeaderStyle>
        {isVisible && (
          <BlockButton>
            <Button
              theme={ThemeButton.SECONDARY}
              type="button"
              width={"auto"}
              style={{ padding: "6px 24px", gap: "10px" }}
              onClick={handleClick}
            >
              Profile Settings
            </Button>
          </BlockButton>
        )}

        <IconBlock>
          <Image
            src={avatar}
            width={width ? (width < 790 ? 72 : 204) : 204}
            height={width ? (width < 790 ? 72 : 204) : 204}
            alt={"avatar"}
            style={{ maxWidth: "204px", maxHeight: "204px" }}
          />
        </IconBlock>
        <UserNameStyle> URLProfile</UserNameStyle>

        <InfoBlock>
          <FolowBlock>
            <div>
              <div>2 218</div>
              <div>Following</div>
            </div>
            <div>
              <div>2 358</div>
              <div>Followers</div>
            </div>
            <div>
              <div>2 358</div>
              <div>Publications</div>
            </div>
          </FolowBlock>

          <AboutMeBlock>
            <AboutMeText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt. laboris nisi ut aliquip ex ea commodo consequat.
            </AboutMeText>
          </AboutMeBlock>
        </InfoBlock>
      </HeaderStyle>
      <PhotosBlock>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
        <PhotoStyle>Photo</PhotoStyle>
      </PhotosBlock>
    </ProfileWrapper>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;

const ProfileWrapper = styled.div`
  position: relative;
`;

const BlockButton = styled.div`
  position: absolute;
  right: 64px;
  top: 0px;
`;

const HeaderStyle = styled.div`
  display: inline-flex;
  gap: 40px;
  align-content: center;
  width: auto;
`;

const IconBlock = styled.div`
  border-radius: 50%;
  background: ${baseTheme.colors.dark[100]};
  max-width: 204px;
  max-height: 204px;

  @media (max-width: 790px) {
    margin-top: 0px;
    max-width: 72px;
    max-height: 72px;
  }
`;

const UserNameStyle = styled.div`
  position: absolute;
  left: 242px;
  top: 0px;

  color: ${baseTheme.colors.light[100]};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;

  @media (max-width: 790px) {
    position: absolute;
    left: 0px;
    top: 82px;
    font-family: Inter;
    font-size: 16px;
    line-height: 24px;
  }
`;
const InfoBlock = styled.div`
  margin-top: 151px;

  @media (max-width: 790px) {
    margin-top: 108px;
  }
`;

const FolowBlock = styled.div`
  display: grid;
  margin-top: -90px;
  grid-template-columns: 1fr 1fr 1fr;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 790px) {
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
`;

const AboutMeBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 24px;

  @media (max-width: 790px) {
    margin-top: 80px;
    margin-left: -110px;
    width: auto;
    display: flex;
    max-width: 330px;
    flex-direction: column;
    flex-shrink: 0;
  }
`;

const AboutMeText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${baseTheme.colors.light[100]};

  @media (max-width: 790px) {
    font-size: 14px;
  }
`;

const PhotosBlock = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  padding-top: 24px;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const PhotoStyle = styled.div`
  width: 234px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 2px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;
