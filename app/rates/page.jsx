'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Rates() {
    const {data:session, status} = useSession();

    return(
        <div>
            <div>
                <Link href={'/signup'}>Sign Up</Link> |
                <Link href = {"/login"}> Login </Link>|
                <Link href={"/extras"}>Extras</Link> |
            </div>
            <div>
                <h1>Standard Cleaning Rates</h1>
                <div>
                    <p>Rate 1</p>
                    <p>Rate 2</p>
                    <p>Rate 3</p>
                </div>
                <Link href={'/booking/bookcleaning'}>Ready to book a cleaning?</Link>
            </div>
            
        </div>
    )


}