import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import Image from "next/image";
import { useAuthMeQuery, useLazyProfileQuery } from "assets/store/api/profile/profileApi";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { Path } from "common/enums/path";
import { useWindowSize } from "common/hooks/useWindowSize";
import { UserType } from "assets/store/api/profile/types";
import Paid from "../../public/img/icons/paid.svg";

const MyProfile = () => {
  const serverAvatar: string = "";
  const avatar = serverAvatar !== "" ? serverAvatar : "/img/icons/avatar.svg";
  const [getProfileInfo, { data: user }] = useLazyProfileQuery();

  const { isSuccess } = useAuthMeQuery();

  const { width, height } = useWindowSize(); // хук для измерения размера экрана
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    if (width) {
      if (width < 950) {
        // вывести для мобильной версии
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [width]);

  /*   __________Нахождение ссылки в тексте______ */
  const urlify = (text: string) => {
    const urlRegex =
      /(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(ftp:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(file:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urlRegex2 =
      /((https?:\/\/|ftp:\/\/|file:\/\/)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    return text.split(urlRegex).map((part, i, a) => {
      let url;
      if (part?.match(urlRegex)) {
        if (part.match(urlRegex2)) {
          url = part;
        } else url = "https://" + part;

        return (
          <Link key={i} href={url}>
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  /*   _____________________________________ */

  return (
    <>
      {isSuccess && (
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
            <StyledAvatarBlock>
              <IconBlock>
                <Image
                  src={user?.photo || avatar}
                  width={width ? (width < 790 ? 72 : 204) : 204} // вывести для мобильной версии
                  height={width ? (width < 790 ? 72 : 204) : 204}
                  alt={"avatar"}
                  style={{ maxWidth: "204px", maxHeight: "204px" }} // вывести для мобильной версииу
                />
              </IconBlock>
            </StyledAvatarBlock>

            <UserNameStyle>
              {user?.firstName || "FirstName"} {user?.lastName || "LastName"}
              <Image
                src={Paid}
                width={width ? (width < 790 ? 16 : 24) : 24} // вывести для мобильной версии
                height={width ? (width < 790 ? 16 : 24) : 24} // вывести для мобильной версии
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
                  {urlify(user?.userInfo || "about me")}

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
MyProfile.getLayout = getLayout; // отредактировать layout
export default MyProfile;

// перенести в отдельный файл

const ProfileWrapper = styled.div`
  position: relative;
  /* padding-left: 0px;
  padding-top: 36px; */
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

const StyledAvatarBlock = styled.div`
  max-width: 204px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  background: ${baseTheme.colors.dark[700]};
`;

/* _______________расположение аватарки________________ */
const IconBlock = styled.div`
  position: relative;
  width: 204px;
  height: 204px;
  overflow: hidden;
  background: ${baseTheme.colors.dark[100]};
  border-radius: 50%;

  @media (max-width: 790px) {
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
