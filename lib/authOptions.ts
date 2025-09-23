import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await user.comparePassword(credentials.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        // Handle OAuth sign-in
        try {
          await connectDB();

          // Ensure account is not null
          if (!account) {
            console.error("No account information provided");
            return false;
          }

          // Check if user exists by email
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user for OAuth
            existingUser = await User.create({
              email: user.email,
              name: user.name || profile?.name || "User",
              role: "user",
              provider: account.provider,
              providerId: account.providerAccountId,
              image: user.image,
              // Don't set password for OAuth users - let the schema handle it
            });
          } else {
            // User exists, check if we need to link OAuth account
            if (!existingUser.provider && !existingUser.providerId) {
              // User exists with credentials only, link OAuth account
              existingUser.provider = account.provider;
              existingUser.providerId = account.providerAccountId;
              if (user.image && !existingUser.image) {
                existingUser.image = user.image;
              }
              await existingUser.save();
            } else if (
              existingUser.provider !== account.provider ||
              existingUser.providerId !== account.providerAccountId
            ) {
              // User trying to sign in with different OAuth provider
              // This is allowed - user can have multiple auth methods
              console.log(
                `User ${user.email} signing in with different provider: ${account.provider}`
              );
            }
          }

          // Update the user object with database info
          user.id = existingUser._id.toString();
          (user as any).role = existingUser.role;

          return true;
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }
      return true; // Allow credentials sign-in to proceed normally
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
