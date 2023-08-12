'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";





export default function DeleteBooking({params}){
    const {data:session, status} = useSession();
    const user = session?.user || null;
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);


    function goBack(){
        router.push("/home");
    }
    const {id} = params;
    const [state, setState] = useState({});

    useEffect(() => {
        if(!id){
            return
        } axios.get(`/api/bookcleaning?id=${id}`)
        .then(response => {setState(response.data);console.log("Success", response.data)})
        .catch(error => {console.log("Error", error)})
    }, []);

    function deleteHandler(){
        axios.delete(`/api/bookcleaning?id=${id}`)
        goBack();
    }

    return (
        <div>
            <h1 className="w-full text-center mt-10">Do you really want to <span className="text-red-700 font-bold">CANCEL</span> this booking?</h1>
                <div className="flex gap-2 justify-center mt-7">
                    <button onClick={deleteHandler}>YES</button>
                    <button onClick={goBack}>NO</button>
                </div>
        </div>
    )
}