import { Path } from "common/enums/path";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "common/hooks/useAuth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const canActivate = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!canActivate) {
      router.push(Path.LOGIN);
    }
  }, [canActivate]);

  return <div>{children}</div>;
};

export default PrivateRoute;
