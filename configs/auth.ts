import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Path } from 'common/enums/path';



export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    // Credentials({
    //   credentials: {
    //     email: { label: 'email', type: 'email', required: true },
    //     password: {
    //       label: 'password', type: 'password', required: true,
    //     }

    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) return null

    //     return null
    //   }
    // })
    
  ],

  pages: {
    signIn: Path.LOGIN}
};
