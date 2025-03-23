import { Account, AuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import db from "@/db";
import { users } from "@/db/schema";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      try {
        if (!account || !user.email) {
          console.error("Missing account or email.");
          return false;
        }

        await db
          .insert(users)
          .values({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          })
          .onConflictDoUpdate({
            target: users.email,
            set: {
              name: user.name,
              image: user.image,
              provider: account.provider,
            },
          });

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false; // Deny sign-in on error
      }
    },
  },
};
