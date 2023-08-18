import React, { useState, useEffect } from "react";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { Path } from "common/enums/path";
import { getLayout } from "common/components/Layout/BaseLayout/BaseLayout";
import { oauthRequest } from "features/auth/oauth2Request";
import {
  BlockButton,
  SigninWrapper,
  buttonStyle,
  spanStyle
} from "styles/styledComponents/auth/signin.styled";
import Image from "next/image";
import google from "public/img/icons/google-svgrepo-com.svg";
import github from "public/img/icons/github-svgrepo-com.svg";
import axios from "axios";
import { AppDispatch } from "assets/store/store";
import { useAppDispatch } from "common/hooks";

export const getStaticProps = async () => {
  return {
    props: {
      providerParams: {
        google: {
          AUTH_URL: process.env.GOOGLE_AUTH_URL,
          SCOPE: process.env.GOOGLE_SCOPE,
          REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
          ID: process.env.GOOGLE_ID
        },
        github: {
          AUTH_URL: process.env.GITHUB_AUTH_URL,
          SCOPE: process.env.GITHUB_SCOPE,
          REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
          ID: process.env.GITHUB_ID
        }
      }
    }
  };
};

// let instance = axios.create({
//   headers: {

//   }
// })
const getCode = async (url: string) => {
  try {
    // const response = await axios.interceptors.request .get(url)
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error((err as Error).message);
  }
};

const Signin = (props: ProvidersPropsType) => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const onGoogleClick = () => {
    const url = oauthRequest("google", props);
    console.log(url);
    // route.push(url)
    getCode(url);
    // console.log(res);
  };

  const onGitHubClick = () => {
    // route.push(Path.SIGNIN)
    const url = oauthRequest("github", props);
    console.log(url);
    // route.push(url)
  };

  return (
    <>
      <SigninWrapper>
        <BlockButton>
          <Button
            theme={ThemeButton.SECONDARY}
            type="button"
            width={"300"}
            style={buttonStyle}
            onClick={onGoogleClick}
          >
            <Image width={24} height={24} src={google} alt={"google"} />
            <span style={spanStyle}>Sign in with Google</span>
          </Button>

          <Button
            theme={ThemeButton.SECONDARY}
            type="button"
            width={"300"}
            style={buttonStyle}
            onClick={onGitHubClick}
          >
            <Image width={24} height={24} src={github} alt={"github"} />
            <span style={spanStyle}>Sign in with GitHub</span>
          </Button>
        </BlockButton>
      </SigninWrapper>
    </>
  );
};
Signin.getLayout = getLayout;
export default Signin;

export type ProviderData = {
  AUTH_URL: string;
  SCOPE: string;
  REDIRECT_URI: string;
  ID: string;
};

export type ProvidersPropsType = {
  providerParams: {
    google: ProviderData;
    github: ProviderData;
  };
};