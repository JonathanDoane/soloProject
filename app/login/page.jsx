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
        setState({...state, [e.target.name]: e.target.value})
    }

    const callbackUrl = "/home";

    async function handleLogin(e){
        e.preventDefault();
        console.log("running");
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: state.email,
                password: state.password,
                callbackUrl,
            });
            console.log(res);
            if(!res.error){
                router.push(callbackUrl);
            }else {
                setError("Invalid Credentials!")
            }  setState({ email: "", password: "" });
        } catch (error) {
            setError(error);
        }
        // const res = await signIn("Credentials", {
        //     redirect: false,
        //     email: state.email,
        //     password: state.password,
        // });
        // if(!res.error){
        //     router.push("/home");
        // }else {
        //     setError("Invalid Credentials!")
        // }
    }

    return (
        <div>
            <h1>Login</h1>
            <Link href= "/">Go Back</Link>
            <form onSubmit={handleLogin}>
            {error && (
                <p>
                    {error}
                </p>
            )}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" onChange={inputHandler} value={state.email}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" onChange={inputHandler} value={state.password}/>
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}