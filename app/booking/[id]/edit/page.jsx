'use client'
import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditBooking({params}){
    const {data:session, status} = useSession();
    const user = session?.user || null;
    const {id} = params;

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

    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/bookcleaning?id=${id}`)
        .then(response => {setState(response.data);console.log("Success", response.data)})
        .catch(error => {console.log("Error", error)})
    }, []);

    const inputHandler = (e) => {
        const { name, type, value, checked } = e.target;

        if (type === "select-one") {
            setState((prevState) => ({
                ...prevState,
                time: value,
            }));
        }  else if (type === "checkbox") {
            const updatedTasks = checked
                ? state.tasks + value + ","
                : state.tasks.replace(value + ",", "");
    
            setState((prevState) => ({
                ...prevState,
                tasks: updatedTasks,
            }));
        } else if (type === "radio") {
            setState((prevState) => ({
                ...prevState,
                payment: value,
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
        axios.put(`/api/bookcleaning?id=${id}`, state)
        .then((response) => {console.log("Success", response);
        router.push("/home");
        })
        .catch((error) => {console.log("Error", error);
        const errors = error.response.data.error.errors;
        const errorArray = [];
        for (const key in errors) {
            errorArray.push(errors[key].message);
        }setError(errorArray)
        });
        
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    

    return (
        <div>
            <Link href={'/home'}>Home</Link>
            <Link href={'/extras'}>Extras</Link>
            <button onClick={()=> signOut({
                callbackUrl: "/",
            })}>Logout</button>
            <div>
                <h1>Edit Appointment</h1>
                <form onSubmit={submitHandler}>
                    {error && error.map((item,idx)=>(
                        <p key={idx}>{item}</p>
                    ))}
                    <div>
                        <div>
                            <label htmlFor="date">When would you like us to arrive?</label>
                            <input type="date" name="date" onChange={inputHandler} value={formatDate(state.date)}/>
                        </div>
                        <div>
                            <label htmlFor="time">Please select a Time:</label>
                            <select onChange={inputHandler} value={state.time}>
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
                            <input type="checkbox" value="Bathroom Cleaning" onChange={inputHandler}
                            checked={state.tasks.includes("Bathroom Cleaning")}/>
                            <label name="tasks">Bathroom Cleaning</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Kitchen Cleaning" onChange={inputHandler}
                            checked={state.tasks.includes("Kitchen Cleaning")} />
                            <label name="tasks">Kitchen Cleaning</label>
                        </div>
                        <div>
                            <input type="checkbox" value="General Room Cleaning" onChange={inputHandler}
                            checked={state.tasks.includes("General Room Cleaning")} />
                            <label name="tasks">General Room Cleaning</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Window Washing" onChange={inputHandler}
                            checked={state.tasks.includes("Window Washing")} />
                            <label name="tasks">Window Washing</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Wood/Tile Mop & Shine" onChange={inputHandler}
                            checked={state.tasks.includes("Wood/Tile Mop & Shine")}/>
                            <label name="tasks">Wood/Tile Mop & Shine</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Carpet Shampooing" onChange={inputHandler}
                            checked={state.tasks.includes("Carpet Shampooing")}/>
                            <label name="tasks">Carpet Shampooing</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Laundry" onChange={inputHandler}
                            checked={state.tasks.includes("Laundry")}/>
                            <label name="tasks">Laundry</label>
                        </div>
                        <div>
                            <input type="checkbox" value="Furniture Treatment" onChange={inputHandler}
                            checked={state.tasks.includes("Furniture Treatment")} />
                            <label name="tasks">Furniture Treatment</label>
                        </div>
                    <div>
                        <label>Payment Method</label>
                        <input type="radio" value="Card" name="payment" onChange={inputHandler}
                        checked={state.payment==="Card"} />
                        <label name="payment">Card</label>
                        <input type="radio" value="Cash" name="payment" onChange={inputHandler}
                        checked={state.payment==="Cash"}/>
                        <label name="payment">Cash</label>
                        <input type="radio" value="Check" name="payment"onChange={inputHandler}
                        checked={state.payment==="Check"}/>
                        <label name="payment">Check</label>
                    </div>
                    </div>
                    <div>
                        <label htmlFor="notes">Additional Notes we should know before arriving to the property:</label>
                        <textarea rows="10" cols="30" placeholder="Additional Notes..." name="notes" onChange={inputHandler}
                        value={state.notes}></textarea>
                    </div>
                    <button type="submit">Submit</button>

                    
                        

                    
                </form>
            </div>
        </div>
    )



}