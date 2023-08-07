'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
const {data: session} = useSession();
const router = useRouter();
console.log(session);
// if(!session) {
//     router.push("/");
// } 


return(
    <div>sup
        {/* <h1>Welcome{session.user?.firstName} </h1> */}
    </div>
)

}


