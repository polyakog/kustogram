declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GITHUB_AUTH_URL: string;
    GITHUB_SCOPE: string;
    GITHUB_REDIRECT_URI: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_AUTH_URL: string;
    GOOGLE_SCOPE: string;
    GOOGLE_REDIRECT_URI: string;
  }
}
