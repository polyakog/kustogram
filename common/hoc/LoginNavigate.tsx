import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  const isAuth = true; // запрос авторизации

  if (!isAuth) router.push("/login");

  return <>{children}</>;
};
