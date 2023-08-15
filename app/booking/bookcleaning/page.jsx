'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { data } from "autoprefixer";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";


//initiate state for the form


export default function BookCleaning() {
    const { data: session, status } = useSession();
    const user = session?.user || null;
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    const [state, setState] = useState({
        date: "",
        time: "",
        tasks: "",
        payment: "",
        notes: "",
        user: user?.id,
    });

    const [error, setError] = useState([]);

    const inputHandler = (e) => {
        const { name, type, value } = e.target;

        if (type === "select-one") {
            setState((prevState) => ({
                ...prevState,
                time: value,
            }));
        } else if (type === "checkbox") {
            setState((prevState) => ({
                ...prevState,
                tasks: prevState.tasks.includes(value)
                    ? prevState.tasks.replace(value + ",", "")
                    : prevState.tasks + value + ",",
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("/api/bookcleaning", state)
            .then((response) => {
                console.log("Success", response);
                router.push("/home");
            })
            .catch((error) => {
                console.log("Error", error);
                const errors = error.response.data.error.errors;
                const errorArray = [];
                for (const key in errors) {
                    errorArray.push(errors[key].message);
                } setError(errorArray)
            });

    };


    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data]);
    return (
        <div className="bg-blue-200 h-max p-3">
            <div className="flex justify-end gap-7 w-3/5 m-auto underline">
                <Link href={'/home'}>Home</Link> |
                <Link href={'/extras'}>Extras</Link> |
                <button onClick={() => signOut({
                    callbackUrl: "/",
                })}>Logout</button>
            </div>

            <div className="w-3/5 m-auto mt-10">
                <h1 className="text-4xl mb-5">Awesome {user?.name}! First, let's answer a few questions</h1>
                <form onSubmit={submitHandler} className="border-4 border-black p-5 m-auto bg-blue-300">
                    {error.length > 0 && (
                        <div className="border-2 border-black bg-white rounded-xl w-2/5 p-2 m-auto">
                            {error.map((item, idx) => (
                                <p className="text-red-500" key={idx}>{item}</p>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-14">
                        <div>
                            <div className="mb-5 border-b-2 border-black pb-1">
                                <label htmlFor="date">When would you like us to arrive?</label>
                                <input type="date" name="date" onChange={inputHandler} />
                            </div>
                            <div className="mb-5 border-b-2 border-black pb-1">
                                <label htmlFor="time">Please select a Time:</label>
                                <select onChange={inputHandler} className="rounded-md flex">
                                    <option value="9:30 AM" name="time">9:30 AM</option>
                                    <option value="10:30 AM" name="time">10:30 AM</option>
                                    <option value="11:30 AM" name="time">11:30 AM</option>
                                    <option value="12:30 PM" name="time">12:30 PM</option>
                                    <option value="1:30 PM" name="time">1:30 PM</option>
                                    <option value="2:30 PM" name="time">2:30 PM</option>
                                    <option value="3:30 PM" name="time">3:30 PM</option>
                                </select>
                            </div>

                            <label>Please select all you would like us to do:</label>
                            <div>
                                <input type="checkbox" value="Bathroom Cleaning" onChange={inputHandler} />
                                <label name="tasks">Bathroom Cleaning</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Kitchen Cleaning" onChange={inputHandler} />
                                <label name="tasks">Kitchen Cleaning</label>
                            </div>
                            <div>
                                <input type="checkbox" value="General Room Cleaning" onChange={inputHandler} />
                                <label name="tasks">General Room Cleaning</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Window Washing" onChange={inputHandler} />
                                <label name="tasks">Window Washing</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Wood/Tile Mop & Shine" onChange={inputHandler} />
                                <label name="tasks">Wood/Tile Mop & Shine</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Carpet Shampooing" onChange={inputHandler} />
                                <label name="tasks">Carpet Shampooing</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Laundry" onChange={inputHandler} />
                                <label name="tasks">Laundry</label>
                            </div>
                            <div className="border-b-2 border-black">
                                <input type="checkbox" value="Furniture Treatment" onChange={inputHandler} />
                                <label name="tasks">Furniture Treatment</label>
                            </div>
                            <div className="flex mt-3 flex-col border-b-2 border-black pb-1">
                                <label className="">Payment Method:</label>
                                <div>
                                    <input type="radio" value="Card" name="payment" onChange={inputHandler} />
                                    <label name="payment" className="mr-3">Card</label>
                                </div>
                                <div>
                                    <input type="radio" value="Cash" name="payment" onChange={inputHandler} />
                                    <label name="payment" className="mr-3">Cash</label>
                                </div>
                                <div>
                                    <input type="radio" value="Check" name="payment" onChange={inputHandler} />
                                    <label name="payment">Check</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="notes">Additional Notes we should know before arriving to the property:</label>
                            <textarea className="p-2 rounded-md" rows="10" cols="50" placeholder="Additional Notes..." name="notes" onChange={inputHandler}></textarea>
                        </div>
                    </div>

                    <button className=" mt-3 rounded-xl p-1 border-2 border-black bg-white hover:bg-green-400 duration-500" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}