import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
// import Layout from "../components/layout"
import React from "react";
import styled from "styled-components";
import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { JWT, getToken } from "next-auth/jwt";
import { Session } from "next-auth";
import { baseTheme } from "styles/styledComponents/theme";
import { getLayout } from "common/components/Layout/BaseLayout/BaseLayout";

type PropsType = {
  session: Session | null;
  token: JWT | null;
};

function ServerSidePage(props: PropsType) {
  const { data: session } = useSession();
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  return (
    <>
      <StyledBlockMain>
        <h1>Server Side Rendering</h1>
        <p>
          This page uses the <strong>getServerSession()</strong> method in{" "}
          <strong>getServerSideProps()</strong>.
        </p>
        <p>
          Using <strong>getServerSession()</strong> in <strong>getServerSideProps()</strong> is the
          recommended approach if you need to support Server Side Rendering with authentication.
        </p>
        <p>
          The advantage of Server Side Rendering is this page does not require client side
          JavaScript.
        </p>
        <p>The disadvantage of Server Side Rendering is that this page is slower to render.</p>

        <h2>Session</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>

        <h2>JWT</h2>
        <pre>{JSON.stringify(props.token, null, 2)}</pre>
      </StyledBlockMain>
    </>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
      token: await getToken({ req: context.req, raw: false })
    }
  };
}

ServerSidePage.getLayout = getLayout;
export default ServerSidePage;

const StyledBlockMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;

  & a {
    color: ${baseTheme.colors.warning[500]};
    text-decoration: none;
  }
`;
