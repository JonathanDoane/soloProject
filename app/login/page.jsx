import Link from "next/link";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"/>
            </div>
            <button>Login</button>
            </form>
        </div>
    )
}