import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import Image from "next/image";
import { useAuthMeQuery, useProfileQuery } from "assets/store/api/profile/profileApi";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Path } from "common/enums/path";
import { useWindowSize } from "common/hooks/useWindowSize";
import { UserType } from "assets/store/api/profile/types";
import Paid from "../../public/img/icons/paid.svg";

const MyProfile = () => {
  const serverAvatar: string = "";
  const avatar = serverAvatar !== "" ? serverAvatar : "/img/icons/avatar.svg";

  const { data, isLoading } = useProfileQuery();
  let user = data;

  const { currentData, isSuccess } = useAuthMeQuery();

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

  /*   __________Нахождение ссылки в тексте______ */
  const urlify = (text: string) => {
    const urlRegex =
      /((https?:\/\/|ftp:\/\/|file:\/\/|www.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urlRegex2 = /(https?|ftp|file|www)[:\/\/|.]/gi;
    const urlRegex3 = /((www.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urlRegex4 =
      /((https?:\/\/|ftp:\/\/|file:\/\/)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    return text.split(urlRegex).map((part, i, a) => {
      let url;
      if (part.match(urlRegex)) {
        if (part.match(urlRegex3)) {
          if (part.match(urlRegex4)) {
            url = part;
          } else {
            url = "https://" + part;
          }
        }
        return (
          <Link key={i} href={url}>
            {part}
          </Link>
        );
      }
      return part.match(urlRegex2) ? " " : part;
    });
  };

  return (
    <>
      {isSuccess && isLoading ? (
        <div>Loading ...</div>
      ) : (
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
                src={user?.photo || avatar}
                width={width ? (width < 790 ? 72 : 204) : 204}
                height={width ? (width < 790 ? 72 : 204) : 204}
                alt={"avatar"}
                style={{ maxWidth: "204px", maxHeight: "204px" }}
              />
            </IconBlock>
            <UserNameStyle>
              {user?.firstName || "FirstName"} {user?.lastName || "LastName"}
              <Image
                src={Paid}
                width={width ? (width < 790 ? 16 : 24) : 24}
                height={width ? (width < 790 ? 16 : 24) : 24}
                alt={"paid"}
                // style={{ }}
              />
            </UserNameStyle>

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
                  {/* {user?.userInfo || 'About me text'} */}

                  {urlify(user?.userInfo || "")}

                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt. laboris nisi ut aliquip ex ea commodo consequat. */}
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
      )}
    </>
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

  display: inline-flex;
  align-items: center;
  gap: 12px;

  /* &a{
    color: ${baseTheme.colors.accent[500]};
    font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 24px;
text-decoration-line: underline;
  } */

  @media (max-width: 790px) {
    position: absolute;
    left: 0px;
    top: 82px;
    font-family: Inter;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Link = styled.a`
  color: ${baseTheme.colors.accent[500]};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-decoration-line: underline;
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
    min-width: 300px;
    display: flex;
    /* max-width: 330px; */
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
  width: 228px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 2px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  @media (max-width: 790px) {
    width: 108px;
    height: 108px;
  }
`;
