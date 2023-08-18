declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string | null;
    GITHUB_SECRET: string | null;
    GITHUB_AUTH_URL: string | null;
    GITHUB_SCOPE: string | null;
    GITHUB_REDIRECT_URI: string | null;
    GOOGLE_ID: string | null;
    GOOGLE_SECRET: string | null;
    GOOGLE_AUTH_URL: string | null;
    GOOGLE_SCOPE: string | null;
    GOOGLE_REDIRECT_URI: string | null;
  }
}
