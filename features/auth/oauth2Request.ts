import { ProvidersPropsType } from "pages/auth/signinOAuth";

export const oauthRequest = (provider: string, { providerParams }: ProvidersPropsType) => {
  let url = "";
  let data = {
    AUTH_URL: "",
    SCOPE: "",
    REDIRECT_URI: "",
    ID: ""
  };

  if (provider === "google") {
    data = providerParams.google;
  }
  if (provider === "github") {
    data = providerParams.github;
  }

  return (url = `${data.AUTH_URL}?scope=${data.SCOPE}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${data.REDIRECT_URI}&client_id=${data.ID}`);
};
