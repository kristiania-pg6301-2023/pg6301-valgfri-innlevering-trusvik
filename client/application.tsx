import React, {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {FormEvent} from "react";


export function FrontPage() {
    const [counter, setCounter] = useState(0);
    return <>
        <h2 className={"webTitle"}>Welcome to our page</h2>
        <form>
            <label htmlFor={"email"}>Email:</label>
            <br />
            <input type={"text"}/>
            <br /><br />
            <label htmlFor={"password"}>Password:</label>
            <br />
            <input type={"password"}/>
            <br />
            <input type={"submit"}/>
            <Link to={"/create"}>Create User</Link>
        </form>
    </>;
}

function CreateUser(){
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new user</h2>
            <div>
                <label>Full Name:</label>
                <br />
                <input type={"text"} />
                <br />
                <br />
                <label>Email:</label>
                <br />
                <input type={"text"} />
                <br />
                <br />
                <label>New password:</label>
                <br />
                <input type={"password"} />
                <br />
                <br />
                <label>Repeat password</label>
                <br />
                <input type={"password"} />
                <br />
                <button>Submit</button>

            </div>
        </form>
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