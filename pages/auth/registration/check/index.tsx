import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyCheckLinkHandlerQuery } from "../../../../assets/store/api/auth/authApi";
import { codeCheckLink } from "../../../../common/utils/codeCheckLink";
import { Path } from "../../../../common/enums/path";

export const CheckLink = () => {
  const { code } = codeCheckLink();
  const [checkLinkHandler] = useLazyCheckLinkHandlerQuery();
  const router = useRouter();

  useEffect(() => {
    checkLinkHandler(code)
      .unwrap()
      .then(() => {
        router.push(Path.REGISTRATION_SUCCESS);
      })
      .catch(() => {
        router.push(Path.REGISTRATION_ERROR);
      });
  }, []);

  return <div></div>;
};

export default CheckLink;
