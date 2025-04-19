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
      authorization: {
        params: {
          disallow_webview: "true",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      try {
        console.log("SignIn callback triggered with:", { user, account });

        // Abort if no email or account
        if (!account || !user.email) {
          console.error("Missing account or user email:", { account, user });
          return false;
        }

        console.log("Saving user to database:", {
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account.provider,
        });

        // Add user to database
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

        console.log("User successfully saved to the database.");
        return true; // Login allowed
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny login on error
      }
    },
  },
};
