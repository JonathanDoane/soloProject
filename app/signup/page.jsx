'use client'
import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup(){

    const router = useRouter();

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({});

    const inputHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const inputNumberHandler = (e) => {
        let phoneNumber = e.target.value;
        phoneNumber = phoneNumber.replace(/\D/g, ""); 
        phoneNumber = phoneNumber.substring(0, 10);
        setState({ ...state, phoneNumber });
      };

    function handleSubmit(e){
        e.preventDefault();

        if (!state.firstName || !state.lastName || !state.phoneNumber || !state.email || !state.password) {
            setError({
              firstName: !state.firstName ? "First Name is required" : null,
              lastName: !state.lastName ? "Last Name is required" : null,
              phoneNumber: !state.phoneNumber ? "Phone Number is required" : null,
              phoneNumber: state.phoneNumber.length < 10 ? "Phone Number must be 10 digits" : null,
              email: !state.email ? "Email is required" : null,
              password: !state.password ? "Password is required" : null,
            });
            return; 
          }

        axios.post("/api/signup", state)
        .then((response) => {console.log("Success", response)
        router.push("/home")})
        .catch((error) => {console.log("Error", error);
        });
    }


    return(
        <div>
            <div>
            <h1>Let's Create an Account</h1>
            <Link href={'/extras'}>Extras </Link>
            <Link href={'/'}>Go Back </Link>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                {error.firstName && <p>{error.firstName}</p>}
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="First Name" value={state.firstName} onChange={inputHandler}/>
                </div>
                <div>
                {error.lastName && <p>{error.lastName}</p>}
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" placeholder="Last Name" value={state.lastName} onChange={inputHandler}/>
                </div>
                <div>
                {error.phoneNumber && <p>{error.phoneNumber}</p>}
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={state.phoneNumber} onChange={inputNumberHandler}/>
                </div>
                <div>
                {error.email && <p>{error.email}</p>}
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" value={state.email} onChange={inputHandler}/>
                </div>
                <div>
                {error.password && <p>{error.password}</p>}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" value={state.password} onChange={inputHandler}/>
                </div>
                <button type="submit">Sign Up</button>
            </form>

        </div>
        </div>
        
    )
}