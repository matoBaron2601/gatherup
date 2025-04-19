import { authOptions } from "@/app/api/auth/authOptions";
import db from "@/db";
import { users } from "@/db/schema";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const getAuthenticatedUser = async (redirectUrl : string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${redirectUrl}`);
  }
  return session.user;
};

export const getUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
}

