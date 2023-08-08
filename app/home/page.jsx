'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";

export default  function Home() {
    const {data:session} = useSession();
    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        if(!data){
            router.push("/");
        }
    }, [data]);


return(
    <div>
        <div>
            <h1>Welcome {user?.name}</h1>
            <Link href={'/extras'}>Extras</Link> |
            <button onClick={()=> signOut({
                callbackUrl: "/",
            })}>Logout</button>
        </div>
        <h2>What would you like to do today?</h2>
        <div>
            <Link href={'/bookcleaning'}>Book a Cleaning</Link>
            <Link href={'/rates'}>View Standard Rates</Link>
            <p>Promotional Text</p>
        </div>
        <div>
            <p>Upcoming appointments</p>
            <p>loop through to display appointments</p>
        </div>
    </div>
)

}


