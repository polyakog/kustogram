import "next-auth/jwt";
import NextAuth from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
    iss: string;
    idToken?: string;
    aud: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string;
      id: unknown;
    } & DefaultSession["user"];
    accessToken: unknown;
  }
}
