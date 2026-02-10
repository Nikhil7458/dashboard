// // src/lib/auth.ts
// import NextAuth, { SessionStrategy } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { prisma } from "./prisma";
// import { getServerSession } from "next-auth";

// // Define options once
// const authConfig = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         );

//         if (!isValid) return null;

//         return { id: user.id, email: user.email, name: user.name || "" };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt" as SessionStrategy,
//   },
//   callbacks: {
//     jwt: ({ token, user }: { token: any; user?: any }) => {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     session: ({ session, token }: { session: any; token: any }) => {
//       if (token?.id) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Required in production
// };

// // Create the handler once
// const handler = NextAuth(authConfig);

// // Export handler methods for the route file
// export { handler as GET, handler as POST };

// // Add getSession helper for server components
// export const getSession = () => getServerSession(authConfig);

// // Export the helpers separately
// export const signIn = handler.signIn;
// export const signOut = handler.signOut;

// // src/pages/index.tsx
// export default async function Home() {
//   // ...
// }


// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// This is the only thing you need to export for getServerSession
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name || "" };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as import("next-auth").SessionStrategy,
  },
  callbacks: {
    jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export handler for API route /api/auth/[...nextauth]
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };