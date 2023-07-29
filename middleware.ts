import { Path } from "common/enums/path";
// import { withAuth } from "next-auth/middleware";

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin";
//       }

//       // только для `/profile` требуется от пользователя залогиниться
//       return !!token;
//     }
//   }
// });

// export const config = { matcher: [Path.PROFILE] };

export {default} from 'next-auth/middleware'

export const config = {matcher:[Path.PROFILE, Path.PROFILE_SETTINGS]}
