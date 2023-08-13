'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();
    const [userBookings, setUserBookings] = useState([]);



    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);



    useEffect(() => {
        axios.get("/api/bookcleaning")
            .then(response => { setUserBookings(response.data); console.log("Success", response.data) })
            .catch((err) => console.log("error:", err));
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="bg-blue-200 h-max p-2">
            <div className="flex justify-between items-center w-3/4 m-auto ">
                <h1 className="text-5xl">Welcome {user?.name},</h1>
                <div>
                    <Link href={'/extras'} className="mr-2 underline">Extras</Link> |
                    <button className="ml-3 underline"  onClick={() => signOut({
                        callbackUrl: "/",
                    })}> Logout</button>
                </div>
            </div>
            <h2 className="text-3xl w-3/4 m-auto mt-5">What would you like to do today?</h2>
            <div className="w-3/5 m-auto flex gap-9 mt-14">
                <span className="rounded-lg border-2 border-black bg-cover bg-center h-48 flex items-center p-8 relative" style={{
                    backgroundImage: 'url(/images/cleaningService4.jpeg)',
                }}>
                    <span className="absolute inset-0 bg-black opacity-20"></span>
                    <Link href={'/booking/bookcleaning'} className="relative z-10 text-white font-semibold hover:bg-white rounded-xl p-1
                    duration-500 hover:text-black">Book a Cleaning</Link>
                </span>
                <span className="border-2 rounded-lg border-black bg-cover bg-center h-48 flex items-center p-4 relative" style={{
                    backgroundImage: 'url(/images/dollarSign.jpg)',
                }}>
                    <span className="absolute inset-0 bg-black opacity-20"></span>
                    <Link href={'/rates'} className="relative z-10 text-white font-semibold hover:bg-white rounded-xl p-1
                    duration-500 hover:text-black">View Standard Rates</Link>
                </span>
                <span className="border-2 border-black rounded-lg w-3/4 items-center flex h-48" style={{
                    backgroundImage: 'url(/images/promo.jpg)',
                }}>
                    <p className="bg-gray-500 bg-opacity-75 w-3/5 p-2 text-white rounded-lg">🌟 Special Offer: Get 10% Off Your First Booking! 🌟
                    Claim your 10% discount on your first booking now and step into a world of cleanliness and tranquility.
                    </p>
                </span>
            </div>
            <div className="w-3/5 m-auto mt-5 bg-blue-400 p-3 h-screen rounded-xl">
                <p className="text-2xl mb-5">{user?.name}'s upcoming appointments:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {
                    userBookings?.map((booking, idx) => (
                        <div key={idx} className="bg-blue-300 border-4 border-black p-4 w-2/6 text-center rounded-3xl hover:bg-white duration-500 cursor-pointer">
                            <p>Date: {formatDate(booking.date)}</p>
                            <p>Arrival Time: {booking.time}</p>
                            <p className="underline"> <Link href={`/booking/${booking._id}`}>View Booking Details</Link> </p>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )

}


