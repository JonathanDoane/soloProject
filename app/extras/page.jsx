'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Extras() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-blue-200 h-screen p-4 text-center">
            <h1 className="text-6xl">This page is currently under construction...big things coming soon!</h1>
            <div className="mt-10 underline text-2xl">
                {status === "authenticated" ? (
                    <Link href={'/home'}>Return Home</Link>)
                    : (
                        <Link href={'/'}>Return Home</Link>
                    )}

            </div>


        </div>
    )

}