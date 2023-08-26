import { useLoginWithGoogleMutation } from "assets/store/api/auth/authApi";
import axios from "axios";
import { Path } from "common/enums/path";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { redirect } from "pages/auth/login";
import { useEffect } from "react";
import { useLocalStorage } from "common/hooks/useLocalStorage";

type PropsType = {
  isGoogle: boolean;
  isGithub: boolean;
};

export const useOAuthCode = () =>
  // provider: PropsType
  {
    const route = useRouter();
    const [loginHandler, { data: loginRes }] = useLoginWithGoogleMutation();
    const { removeItem, setItem } = useLocalStorage();

    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const handleWithGoogle = async (code: { code: string }) => {
      try {
        await loginHandler(code)
          .unwrap()
          .then((res) => {
            console.log("SUCCESSFULL LOGIN WITH GOOGLE", res);
            window.location.assign(Path.PROFILE_SETTINGS);
            redirect(loginRes, setItem, route);
            // getInitialize();
          })
          .catch((err) => console.log("ошибка входа:", err));
      } catch (error) {
        console.log("Login Error With Google:", error);
      }
    };

    // route.push(Path.PROFILE_SETTINGS)
    if (code) {
      console.log(code);
      //   handleWithGoogle({ code });                         // запустить после переделки
      window.location.assign(Path.PROFILE_SETTINGS);

      // axios.post('https://calypso-one.vercel.app/auth/google', { code })
      //     .then(res => {
      //         console.log('google Responses', res)
      //         debugger
      //         window.location.assign(Path.PROFILE_SETTINGS)
      //     })
    }

    useEffect(() => {
      if (loginRes) console.log("loginRes:", loginRes);
    });

    // const fetchUserByGoogle = (code: string) => {
    //     axios.post('/', {code})
    //     .then(prom => {
    //         console.log('google promice', prom)
    //         route.push(Path.PROFILE_SETTINGS)

    //     })
    // }
  };
