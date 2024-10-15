// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from './DB'; // Adjust the path if necessary
import { verifyPassword } from "../../../utils/auth"; // Ensure this path is correct

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase(); // Ensure DB connection is established
        const client = await clientPromise; // Connect to your DB
        const db = client.db();
      
        const user = await db.collection("users").findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("No user found");
        }
      
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
      
        return { email: user.email }; // Return user object
      }      
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.user.email = token.email;
      return session;
    },
  },
});