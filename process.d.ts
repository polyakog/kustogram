declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_AUTH_URL: string | null;
    GITHUB_ID: string | null;
    GITHUB_REDIRECT_URI: string | null;
    GITHUB_SCOPE: string | null;
    GITHUB_SECRET: string | null;
    GOOGLE_AUTH_URL: string | null;
    GOOGLE_ID: string | null;
    GOOGLE_REDIRECT_URI: string | null;
    GOOGLE_SCOPE: string | null;
    GOOGLE_SECRET: string | null;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_AUTH_ADMIN_LOGIN: string;
    NEXT_PUBLIC_AUTH_ADMIN_PASSWORD: string;
    NEXT_PUBLIC_AUTH_ADMIN_PASSWORD: string;
  }
}

declare module '@it-incubator/prettier-config'
