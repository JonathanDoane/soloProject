'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ViewBookDetails({ params }) {
    const { data: session, status } = useSession();
    const user = session?.user || null;
    const { id } = params;
    const router = useRouter();

    const [booking, setBooking] = useState({});

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    useEffect(() => {
        axios.get(`/api/bookcleaning?id=${id}`)
            .then(response => { setBooking(response.data); })
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
        <div className="bg-blue-200 h-screen p-4">
            <div className="flex justify-between w-2/5 m-auto items-center">
                <h1 className="text-4xl">Booking Details</h1>
                <div className="gap-2 flex underline">
                    <Link href={'/home'}>Home</Link> |
                    <Link href={'/extras'}>Extras</Link> |
                    <button onClick={() => signOut({
                        callbackUrl: "/",
                    })}>Logout</button>
                </div>
            </div>
            <div className="w-2/5 m-auto text-left mt-10 border-2 border-black p-5 bg-blue-300">
                <div className="font-bold">
                    <p className="border-b-2 border-black mb-2">Date: {formatDate(booking.date)}</p>
                    <p className="border-b-2 border-black mb-2">Arrival Time: {booking.time}</p>
                    <p className="border-b-2 border-black mb-2">Services: {booking.tasks}</p>
                    <p className="border-b-2 border-black mb-2">Payment Method: {booking.payment}</p>
                    <p className="border-b-2 border-black mb-2">Additional Notes: {booking.notes ? booking.notes : "None"}</p>
                </div>
                <div className="flex gap-1 underline">
                    <Link href={`/booking/${booking._id}/edit`}>Edit Booking</Link> |
                    <Link href={`/booking/${booking._id}/delete`}>Cancel Booking</Link>
                </div>
            </div>
        </div >
    )

}