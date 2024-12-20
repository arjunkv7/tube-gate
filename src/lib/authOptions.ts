import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
import { createUserGoogleLogin, getUser, updateUserGoogleLogin } from "./user";
import bcrypt from "bcrypt";
import UserModel, { User } from "@/model/User";

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: "/signin", // Redirect users to "/login" when signing in
  },
  // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXT_PUBLIC_SECRET,
  // Configure authentication providers
  providers: [
    GoogleProvider({
      // Configure Google authentication provider with environment variables
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload",
            access_type: "offline", // Request offline access to get refresh token
            prompt: "consent", 
        },
      },
    }),
    // GitHubProvider({
    //   // Configure GitHub authentication provider with environment variables
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          let { email, password } = parsedCredentials.data;
          let user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log("password match", passwordsMatch, credentials)
          if (passwordsMatch) return { id: user._id, ...user };
        }
        console.log("Invalid credentials");
        return null;
      },
    }), // Include a Credentials provider (username/password)
  ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      let userDetails = await getUser(session.user.email || "");
     
      if (userDetails) {
        session.user._id = userDetails._id; // Add the user's _id to the session
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (user && account) {
        try {
          let existingUser = await getUser(user.email || "");
          // console.log(user, account);
          if (existingUser) {
            await updateUserGoogleLogin(user, account);
          } else {
            await createUserGoogleLogin(user, account);
          }
        } catch (error) {
          console.error("Error saving token or creating user:", error);
          return false; // Deny sign-in if there's an error
        }
      }
      return true;
    },
  },
};
