import {
  useLoginWithGithubMutation,
  useLoginWithGoogleMutation
} from "assets/store/api/auth/authApi";
import axios from "axios";
import { Path } from "common/enums/path";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { redirect } from "pages/auth/login";
import { useEffect } from "react";
import { useLocalStorage } from "common/hooks/useLocalStorage";
import { use } from "i18next";

type PropsType = {
  isGoogle?: boolean;
  isGithub?: boolean;
};

export const useOAuthCode = (provider: PropsType) =>
  // provider: PropsType
  {
    const route = useRouter();
    const [loginGoogleHandler, { data: GoogleData }] = useLoginWithGoogleMutation();
    const [loginGithubHandler, { data: GithubData }] = useLoginWithGithubMutation();
    const { removeItem, setItem } = useLocalStorage();

    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const handle = async (code: { code: string }, provider: PropsType) => {
      const getProfile = provider.isGoogle ? loginGoogleHandler : loginGithubHandler;
      try {
        await getProfile(code)
          .unwrap()
          .then((res) => {
            console.log(`SUCCESSFULL LOGIN WITH ${provider.isGoogle ? "GOOGLE" : "GITHUB"}`, res);
            debugger;
            redirect(res, setItem, route);
          })
          .catch((err) => console.log("ошибка входа:", err));
      } catch (error) {
        console.log("Login Error With Google/Github:", error);
      }
    };

    useEffect(() => {
      if (code) {
        console.log(code);
        if (provider.isGoogle) {
          handle({ code }, { isGoogle: true });
          console.log("isGoogle request");
        }

        if (provider.isGithub) {
          handle({ code }, { isGithub: true });
          console.log("isGithub request");
        }
      }
    }, [code]);

    // route.push(Path.PROFILE_SETTINGS)
    // if (code) {
    // console.log(code);
    // handleWithGoogle({ code });                         // запустить после переделки

    // window.location.assign(Path.PROFILE_SETTINGS);

    // axios.post('https://calypso-one.vercel.app/auth/google', { code })
    //     .then(res => {
    //         console.log('google Responses', res)
    //         debugger
    //         window.location.assign(Path.PROFILE_SETTINGS)
    //     })
    // }

    useEffect(() => {
      if (GoogleData) console.log("GoogleData:", GoogleData);
      if (GithubData) console.log("GithubData:", GithubData);
    }, []);

    // const fetchUserByGoogle = (code: string) => {
    //     axios.post('/', {code})
    //     .then(prom => {
    //         console.log('google promice', prom)
    //         route.push(Path.PROFILE_SETTINGS)

    //     })
    // }
  };
