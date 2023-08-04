import Image from "next/image";
import { NextPageWithLayout } from "./_app";
import { getLayout } from "../common/components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";
import { Path } from "../common/enums/path";
import kusto from "../public/img/kusto.png";
import styled from "styled-components";
import { baseTheme } from "../styles/styledComponents/theme";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/styledComponents/auth/Home.module.css";
import {
  errorSelector,
  isLoadingSelector,
  meSelector,
  isAppInitializedSelector
} from "assets/store/app.selector";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { initializeApp } from "assets/store/initializeApp";
import { useLazyMeQuery } from "assets/store/api/auth/authApi";

const Home: NextPageWithLayout = () => {
  /*   ________Инициализация_____________ */ //?
  const dispatch = useAppDispatch();
  const [getInitialize, { data: me, isLoading, error }] = useLazyMeQuery();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    getInitialize();
  }, []);

  useEffect(() => {
    initializeApp(dispatch, me, isLoading, error, session);
  }, [me, isLoading, error, dispatch, session]);

  /*   ________/Инициализация_____________ */

  // const isLoading = useAppSelector(isLoadingSelector);
  // const error = useAppSelector(errorSelector);
  // const isAppInitialized = useAppSelector(isAppInitializedSelector);
  // const me = useAppSelector(meSelector);

  return (
    <>
      <Image src={kusto} alt="Logo" width={180} height={180} priority />
      <StyledBlockMain>
        <p>
          <Link href={Path.LOGIN}>Login</Link>
        </p>
        <p>
          <Link href={Path.REGISTRATION}>registration</Link>
        </p>
        <p>
          <Link href={Path.FORGOT_PASSWORD}>recovery</Link>
        </p>
        <p>
          <Link href={Path.PROFILE}>profile</Link>
        </p>
        <p>
          <Link href={Path.PROFILE_SETTINGS}>profile/settings</Link>
        </p>
        <p>
          <Link href={Path.NEW_PASSWORD}>auth/new_password</Link>
        </p>
        <p>
          <Link href={Path.REGISTRATION_SUCCESS}>registration/success</Link>
        </p>
        <p>
          <Link href={Path.REGISTRATION_ERROR}>Registration_error</Link>
        </p>
        <p>
          <Link href={Path.NEW_PASSWORD_ERROR}>Password_error</Link>
        </p>
        <p>
          <Link href={Path.ERROR_404}>Page_ERROR_404_</Link>
        </p>
      </StyledBlockMain>

      {/* ______OAuth block____________ */}
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
          {!session && (
            <>
              <span className={styles.notSignedInText}>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      {/* ______________________________________ */}
    </>
  );
};

Home.getLayout = getLayout;
export default Home;

const StyledBlockMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & a {
    color: ${baseTheme.colors.light[100]};
    text-decoration: none;
  }
`;
