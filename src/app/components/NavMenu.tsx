'use client';
import { signIn, signOut, useSession } from "next-auth/react";


const NavMenu = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <span>Welcome, {session?.user?.name}!</span>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return <button onClick={() => signIn()}>Sign in</button>;
    }}
export default NavMenu;