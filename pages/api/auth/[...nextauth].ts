import NextAuth from "next-auth/next";
import { authConfig } from '../../../configs/auth';



// const handler = NextAuth(authConfig);
export default NextAuth(authConfig);

// export { handler as GET, handler as POST }; // возможно убрать