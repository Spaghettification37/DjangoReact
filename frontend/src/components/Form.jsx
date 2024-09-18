/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function Form({ route, method }) {
    const [username, setUsername] = useState("");    //These are the fields that must be filled out by the form
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";  //Decides what the form should be named based on the method it was called from
    const altName = method === "login" ? "Register" : "Login"

    const handleSubmit = async (e) => {
        setLoading(true);       //Start loading while the form is processed
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })   //Set res variable to response from backend after sending form data
            if (method === "login") {   //If the method calling this form is login, than set tokens in local storage and navigate to homepage
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {    //Otherwise, the method must have been register, in which case redirect to the login page
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally { //Eventually, no matter what happens, loading must stop at the end
            setLoading(false)
        }
    }
    const handleAlt = () => {   //Will send user to alternate form (logout->register and vice versa)
        navigate(method === "login" ? "/register" : "/login");
    }

    //This is the basic format of a form, note that 'name' is the const declared above and dictates the form's name
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                {name}
            </button>
            <button className="form-button" type="button" onClick={handleAlt}>
                {altName}
            </button>
        </form>
    );
}

export default Form