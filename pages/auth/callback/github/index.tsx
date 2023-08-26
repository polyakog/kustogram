import { getLayout } from "common/components/Layout/BaseLayout/BaseLayout";
import { useOAuthCode } from "common/hooks/useOAuthCode";

const GithubRedirect = () => {
  useOAuthCode();
};

GithubRedirect.getLayout = getLayout;
export default GithubRedirect;
