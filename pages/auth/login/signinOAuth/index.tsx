import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeButton } from "common/enums/themeButton";
import { Path } from "common/enums/path";
import { Button } from "common/components/Button/Button";
import { getLayout } from "common/components/Layout/BaseLayout/BaseLayout";
import { oauthRequest } from "features/auth/oauth2Request";
import { BlockButton, SigninWrapper } from "styles/styledComponents/auth/signin.styled";

const Signin = () => {
  const route = useRouter();

  const onGoogleClick = () => {
    // route.push(Path.SIGNIN)
    const url = oauthRequest("google");
    console.log(url);
  };

  return (
    <>
      <SigninWrapper>
        <BlockButton>
          <Button
            theme={ThemeButton.OUTLINED}
            type="button"
            width={"auto"}
            style={{ padding: "6px 24px" }}
            onClick={onGoogleClick}
          >
            Google fdgf
          </Button>
        </BlockButton>
      </SigninWrapper>
    </>
  );
};
Signin.getLayout = getLayout;
export default Signin;
