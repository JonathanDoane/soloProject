import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";


const handler =  NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        // await mongoClient.connect();
        console.log("its running")
        const {email, password} = credentials;
        console.log(email, password)
        try {
          await mongooseConnect();
          const user = await User.findOne({ email }).select('+password')
          if(!user){
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if(!passwordsMatch){
            return null;
          }
          return {
            id: user._id,
            name: user.firstName,
            email: user.email,
          }
        } catch (error) {
          console.log(error);
        }
        // const db = mongoClient.db(clientPromise); 
        // const collection = db.collection("users");
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  
  callbacks: {
    async jwt({token, user}) {
      console.log("token:", token)
      console.log("user:", user)
      if (user) {
        token.id = user._id;
      }
      // console.log(token.id)
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
});

export {handler as GET, handler as POST}