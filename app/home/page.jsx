'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
const {data: session} = useSession();
const router = useRouter();

if(!session) {
    return router.push("/");
} 

const {user} = session;

return(
    <div>
        <h1>Welcome {user.firstName}</h1>
    </div>
)

}


