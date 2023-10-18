import React, {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {FormEvent} from "react";
import { useNavigate } from "react-router-dom";



export function FrontPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
            } else {
                // If the API returns an error, display it
                const data = await response.json();
                setErrorMessage(data.error || "Wrong username or password");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <h2 className={"webTitle"}>Welcome to our page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor={"email"}>Email:</label>
                <br />
                <input
                    type={"text"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <label htmlFor={"password"}>Password:</label>
                <br />
                <input
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                <input type={"submit"} value="Login" />
                <br />
                <Link to={"/create"}>Create User</Link>
            </form>
        </>
    );
}



    function CreateUser(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");  // for displaying messages to the user

    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (password !== repeatPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        const newUser = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.text();

            if (response.status === 201) {
                setMessage("User created successfully!");
            } else {
                setMessage(data);
            }
        } catch (error) {
            setMessage("Error creating user. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create a new user</h2>
                    <label>Full Name:</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <br />
                    <label>Email:</label>
                    <br />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <br />
                    <label>New password:</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                    <label>Repeat password</label>
                    <br />
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                    <br />
                    <button>Submit</button>
                    <br />
                    <br />
                    <p>{message}</p>
            </form>
            <button onClick={() => navigate("/")}>Back to Login</button>
        </div>
    )
}

export function ApplicationRoutes(){
    return(
    <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/create"} element={<CreateUser />} />
        <Route path={"/*"} element={<h1>Page Not Found</h1>} />
    </Routes>
    );
}