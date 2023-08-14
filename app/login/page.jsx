'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {

    const router = useRouter();
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState([]);

    const inputHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const callbackUrl = "/home";

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: state.email,
                password: state.password,
                callbackUrl,
            });
            if (!res.error) {
                router.push(callbackUrl);
            } else {
                setError("Invalid Credentials!")
            } setState({ email: "", password: "" });
        } catch (error) {
            setError(error);
        }
    }

    return (
       
            <div className="bg-blue-200 h-screen">
            <div className="text-center">
                <div className="flex items-center justify-end w-3/6 m-auto gap-72 mb-10">
                    <h1 className="text-5xl">Login</h1>
                    <Link href="/" className='hover:underline'>Go Back</Link>
                </div>

                <form onSubmit={handleLogin} className="border-2 border-black w-2/6 m-auto mt-10 bg-blue-300">
                    {error && (
                        <p className="text-red-500 font-bold">
                            {error}
                        </p>
                    )}
                    <div className='mt-4'>
                        <label htmlFor="email">Email: </label>
                        <input className='border border-black p-1 rounded-md' type="email" name="email" placeholder="Email" onChange={inputHandler} value={state.email} />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="password">Password: </label>
                        <input className='border border-black p-1 rounded-md' type="password" name="password" placeholder="Password" onChange={inputHandler} value={state.password} />
                    </div>
                    <button type="submit" className="bg-white text-black mt-5 mb-2 p-1 border border-black rounded-xl hover:bg-black hover:text-white duration-300">Login</button>
                </form>
            </div>
        </div>
        
        

    )
}