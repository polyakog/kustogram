import {AxiosInstance} from "axios";

export class KustoApi {
  constructor(private instance: AxiosInstance) {
  }

  public logIn (params?: ParamsLoginType) {
    return this.instance
      .post<ResponseLoginType>("auth/login", {params})
      .then((res) => res.data);
  }

}

//types

type ParamsLoginType ={
	loginOrEmail: string;
	password: string;
}
export type ResponseLoginType = {
  accessToken:string
}