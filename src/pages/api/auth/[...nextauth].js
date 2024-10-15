// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from './DB'; 
import { verifyPassword } from "../../../utils/auth"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase(); 
        const client = await clientPromise; 
        const db = client.db();
      
        const user = await db.collection("users").findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("No user found");
        }
      
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
      
        return { email: user.email }; 
      }      
    }),
  ],
  pages: {
    signIn: '/auth/signin', 
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
