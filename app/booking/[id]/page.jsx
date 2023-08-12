'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ViewBookDetails({params}){
    const {data:session,status} = useSession();
    const user = session?.user || null;
    console.log("user", user);
    const {id} = params;
    const router = useRouter();

    const [booking, setBooking] = useState({});

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    useEffect(() => {
        axios.get(`/api/bookcleaning?id=${id}`)
        .then(response => {setBooking(response.data);console.log("Success", response.data)})
        .catch((err) => console.log("error:", err));
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    return(
        <div>
            <h1>Booking Details</h1>
            <Link href={'/home'}>Home</Link>
            <Link href={'/extras'}>Extras</Link>
            <button onClick={()=> signOut({
                callbackUrl: "/",
            })}>Logout</button>
            <div>
                <div>
                    <p>Date: {formatDate(booking.date)}</p>
                <p>Arrival Time: {booking.time}</p>
                <p>Services: {booking.tasks}</p>
                <p>Payment Method: {booking.payment}</p>
                <p>Additional Notes: {booking.notes ? booking.notes : "None"}</p>
                </div>
                <Link href = {`/booking/${booking._id}/edit`}>Edit Booking</Link>
                <Link href = {`/booking/${booking._id}/delete`}>Cancel Booking</Link>
            </div>
        </div>
    )

}