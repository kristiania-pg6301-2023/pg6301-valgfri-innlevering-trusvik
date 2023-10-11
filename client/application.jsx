import React, {useState} from "react";


export function Application() {
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
            <p id={"createUser"}>Create User</p>
        </form>
    </>;
}