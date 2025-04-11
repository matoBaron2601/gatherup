import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { redirect } from "next/navigation";

export const getAuthenticatedUser = async (redirectUrl : string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${redirectUrl}`);
  }
  return session.user;
};
