import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProtoctedRoute = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Protected Page</h1>
      <p>
        {session ? (
          <span>Welcome, {session?.user?.name}!</span>
        ) : (
          <span>Not signed in</span>
        )}
      </p>
    </div>
  );
};
export default ProtoctedRoute;
