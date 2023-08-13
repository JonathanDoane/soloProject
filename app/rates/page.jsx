'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Rates() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-blue-200 h-max p-4">
            <div className="flex justify-end items-center w-3/4 m-auto gap-3 underline">
                {status === 'authenticated' ? (
                    <>
                        <Link href={'/home'}>Home</Link> |
                        <Link href={"/extras"}>Extras</Link>
                    </>
                ) : (
                    <>
                        <Link href={'/signup'}>Sign Up</Link> |
                        <Link href={"/login"}>Login</Link> |
                        <Link href={"/extras"}>Extras</Link>
                    </>
                )}
            </div>
            <div className="w-3/4 m-auto text-center">
                <h1 className="text-4xl">Standard Cleaning Rates</h1>
                <div className="flex flex-wrap justify-center gap-6 mt-14 mb-10">
                    <div className="border-2 border-black w-2/5 p-2 font-bold" style={{ backgroundImage: 'url(/images/silver.jpeg)', }}>
                        <p>Standard Cleaning Package - Silver</p>
                        <p>Price $80</p>
                        <p>Description: Our Silver cleaning package offers a thorough and
                            comprehensive cleaning of your space. Ideal for regular maintenance,
                            this package covers dusting, vacuuming, mopping, surface cleaning, and more.
                            Perfect for keeping your environment clean and comfortable.
                        </p>
                        <p>Key Features: Light Organizing, thorough dusting, bathroom sanitization, and more!</p>
                    </div>
                    <div className="border-2 border-black w-2/5 p-2 font-bold" style={{ backgroundImage: 'url(/images/gold.jpeg)', }}>
                        <p>Premium Cleaning Package - Gold</p>
                        <p>Price: $120</p>
                        <p>Description: Elevate your cleaning experience with our Gold package.
                            This premium option includes all the benefits of our Silver package,
                            along with extra attention to detail. We focus on deep cleaning, tackling hard-to-reach areas,
                            and ensuring your space gleams from top to bottom.
                        </p>
                        <p>Key Features: Appliance exterior, baseboard detailing, interior window cleaning.</p>
                    </div>
                    <div className="border-2 border-black w-2/5 p-2 font-bold" style={{ backgroundImage: 'url(/images/platinum.jpg)', }}>
                        <p>Deluxe Cleaning Package - Platinum</p>
                        <p>Price: $200</p>
                        <p>Description: Our Platinum package offers the ultimate cleaning experience.
                            Tailored for those who demand nothing but the best, this package includes everything
                            from the Gold package and more. We go above and beyond to deliver a spotless and pristine environment,
                            leaving no corner untouched.
                        </p>
                        <p>Key Features: "Celing-to-Floor" Cleaning, wall washing, grout & tile scrubbing. </p>
                    </div>
                </div>

                <Link href={'/booking/bookcleaning'} className=" mt-10 border-2 border-black bg-green-700 p-1 rounded-md hover:bg-green-300 duration-500">Ready to book a cleaning?</Link>
            </div>

        </div>
    )


}