'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";





export default function DeleteBooking({ params }) {
    const { data: session, status } = useSession();
    const user = session?.user || null;
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);


    function goBack() {
        router.push("/home");
    }
    const { id } = params;
    const [state, setState] = useState({});

    useEffect(() => {
        if (!id) {
            return
        } axios.get(`/api/bookcleaning?id=${id}`)
            .then(response => { setState(response.data);})
            .catch(error => { console.log("Error", error) })
    }, []);

    function deleteHandler() {
        axios.delete(`/api/bookcleaning?id=${id}`)
        goBack();
    }

    return (
        <div className="bg-blue-200 h-screen flex items-center">
            <div className="border-2 border-black rounded-xl bg-white w-1/4 m-auto">
                <h1 className="w-full text-center pt-10 text-lg">Do you really want to <span className="text-red-700 font-bold text-xl">CANCEL</span> this booking?</h1>
                <div className="flex gap-2 justify-center mt-7 p-3">
                    <button className="border-2 border-black bg-red-500 w-1/5 rounded-xl hover:border-4 duration-200" onClick={deleteHandler}>YES</button>
                    <button className="border-2 border-black bg-emerald-500 w-1/5 rounded-xl hover:border-4 duration-200" onClick={goBack}>NO</button>
                </div>
            </div>

        </div>
    )
}