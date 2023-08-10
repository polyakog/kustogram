import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "assets/database/connectDB";
import { Adapter } from "next-auth/adapters";
import { baseTheme } from "styles/styledComponents/theme";
import { NextAuthOptions } from "next-auth";

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
    //     CredentialsProvider({
    //       name:'Credentials',
    //       authorize(credentials, req) {
    //         connectMongo().catch(error=>{error:"Connection Failed...!"})
    // // проверка сущевтования пользователя
    //         const result = Users.findOne({email: credentials?.email})
    //         if (!result) {
    //           throw new Error('No user Found with Email Please Sign Up..!')
    //         }

    //         // сравнение

    //       },
    //     })
  ],

  // pages: {
  //   signIn: //ссылка на кастомную страницу
  // },
  // adapter: MongoDBAdapter(clientPromise) as Adapter, // если входить в github, то выходит ошибка

  callbacks: {
    async jwt({ token, isNewUser, account, profile, user, session, trigger }) {
      token.userRole = "admin";
      if (isNewUser) {
        token.isNewUser = true;
      } else token.isNewUser = false;
      if (account) {
        (token.accessToken = account.access_token),
          (token.id = user?.id),
          (token.iss = account.provider);
        token.aud = account.scope as string;
      }

      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    }
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: baseTheme.colors.accent[700], // Hex color code
    logo: "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkusto.a089639f.png&w=256&q=75", // Absolute URL to image
    buttonText: baseTheme.colors.light[950] // Hex color code
  }
};

export default NextAuth(authOptions);
