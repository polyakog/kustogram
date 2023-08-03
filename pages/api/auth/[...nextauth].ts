import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { Path } from "common/enums/path";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
    // Credentials({

    //   credentials: {
    //     email: { label: 'loginOrEmail', type: 'text', required: true },
    //     password: { label: 'password', type: 'password', required: true },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) return null;

    //     const currentUser = users.find(user => user.email === credentials.email)  //сделать логику

    //     if (currentUser && currentUser.password === credentials.password) {
    //       const { password, ...userWithoutPass } = currentUser;

    //       return userWithoutPass as User;
    //     }

    //     return null
    //   }
    // })
  ],

  // pages: {
  //   signIn: Path.LOGIN
  // },

  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    }
  }
};

export default NextAuth(authOptions);
