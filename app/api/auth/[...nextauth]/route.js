import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";


const handler =  NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongoClient.connect();

        const db = mongoClient.db(clientPromise); 
        const collection = db.collection("users");

        const user = await collection.findOne({ email: credentials.email });

        if (user && (await compare(credentials.password, user.password))) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  session: {
    jwt: true, 
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user = token;
      return session;
    },
  },
});

export {handler as GET, handler as POST}