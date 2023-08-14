'use client'
import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"


export default function Signup() {
    const { data: session } = useSession();
    const router = useRouter();

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState([]);

    const inputHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const inputNumberHandler = (e) => {
        let phoneNumber = e.target.value;
        phoneNumber = phoneNumber.replace(/\D/g, "");
        phoneNumber = phoneNumber.substring(0, 10);
        setState({ ...state, phoneNumber });
    };

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/signup", state)

            .then((response) => {
                signIn("Credentials", { callbackUrl: "/home" })

            })
            .catch((error) => {
                console.log("Error", error);
                const errors = error.response.data.error.errors;
                const errorArray = [];
                if (errors) {
                    for (const key in errors) {
                        errorArray.push(errors[key].message);
                    }
                } else {
                    if (error.response.data.error === "User already exists") {
                        errorArray.push("User already exists, please login");
                    }
                }
                setError(errorArray);
            });
    }


    return (
        <div className="bg-blue-200 h-max">
            <div className="text-center">
                <div className="flex items-center justify-end w-4/6 m-auto gap-72" >
                    <h1 className="text-5xl">Let's Create an Account</h1>
                    <div>
                        <Link href={'/extras'} className='hover:underline'>Extras </Link> |
                        <Link href={'/'} className='hover:underline'> Go Back </Link>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="border-2 border-black w-2/6 m-auto mt-10 bg-blue-300">
                        {error && error.map((item, idx) => (
                            <p key={idx} className="text-red-500 font-bold">{item}</p>
                        ))}
                        <div className='mt-4'>
                            <label htmlFor="firstName">First Name: </label>
                            <input type="text" name="firstName" placeholder="First Name" value={state.firstName} onChange={inputHandler} className='border border-black' />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="lastName">Last Name: </label>
                            <input type="text" name="lastName" placeholder="Last Name" value={state.lastName} onChange={inputHandler} className='border border-black' />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="phoneNumber">Phone Number: </label>
                            <input type="text" name="phoneNumber" placeholder="Phone Number" value={state.phoneNumber} onChange={inputNumberHandler} className='border border-black' />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" placeholder="Email" value={state.email} onChange={inputHandler} className='border border-black' />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" placeholder="Password" value={state.password} onChange={inputHandler} className='border border-black' />
                        </div>
                        <button type="submit" className="bg-white text-black mt-5 mb-2 p-1 border border-black rounded-xl hover:bg-black hover:text-white duration-300">Sign Up</button>
                    </form>

                </div>
            </div>
        </div>


    )
}