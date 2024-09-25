/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
//import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function ProfileForm({ route }) {
    const [displayName, setDisplayName] = useState("")
    const [bio, setBio] = useState("");
    const [pfp, setPfp] = useState("");
    const [backImg, setBackImg] = useState("");
    //const [backCol, setBackCol] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(route, {})   //Set res variable to response from backend after sending form data
            navigate("/profile")
        } catch (error) {
            alert(error)
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate("/profile")
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{self.username}</h1>
            <input
                className="form-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
            />
            <textarea
                className="form-input"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
            />
            <input
                className="form-input"
                type="text"
                value={pfp}
                onChange={(e) => setPfp(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="text"
                value={backImg}
                onChange={(e) => setBackImg(e.target.value)}
                placeholder="Background Image"
            />
            <button className="form-button" type="submit">
                Register
            </button>
            <button className="form-button" type="button" onClick={handleCancel}>
                cancel
            </button>
        </form>
    );
}

export default ProfileForm