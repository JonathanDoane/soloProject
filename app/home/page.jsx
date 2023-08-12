'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import axios from "axios";


export default  function Home() {
    const {data:session, status} = useSession();
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
        .then(response => {setUserBookings(response.data);console.log("Success", response.data)})
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
        <div>
            <h1 className="text-red-400">Welcome {user?.name}</h1>
            <Link href={'/extras'}>Extras</Link> |
            <button onClick={()=> signOut({
                callbackUrl: "/",
            })}>Logout</button>
        </div>
        <h2>What would you like to do today?</h2>
        <div>
            <Link href={'/booking/bookcleaning'}>Book a Cleaning</Link>
            <Link href={'/rates'}>View Standard Rates</Link>
            <p>Promotional Text</p>
        </div>
        <div>
            <p>Upcoming appointments</p>
            {
                userBookings?.map((booking,idx)=> (
                    <div key={idx}>
                        <p>Date: {formatDate(booking.date)}</p>
                        <p>Arrival Time: {booking.time}</p>
                        <p> <Link href = {`/booking/${booking._id}`}>View Booking Details</Link> </p>
                    </div>
                    //start the details page? then be sure to include edit/update form, also make standard rate page
                ))
            }
            
        </div>
    </div>
)

}


