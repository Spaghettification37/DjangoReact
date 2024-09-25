import api from "../api"
import "../styles/Home.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm.jsx"
import "../styles/Form.css"

function Profile() {


    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile();
    }, [])
    const getProfile = () => {
        api
            .get(`/api/profile/${profile.pk}`)  //This doesn't work lol
            .then((res) => res.data)
            .then((data) => setProfile(data))
            .catch((err) => alert(err));
    }

    const handleEdit = () => {
        return <ProfileForm route="/profile/edit/" />
    }

    return (
        <div>
            <h1>Profile</h1>
            {/* <img className="pfp" src={pfp} /> */}
            {/* <img className="backImg" src={backImg} /> */}
            <p>{profile.displayName}</p>
            <p>{profile.bio}</p>
            <button className="edit-button" type="button" onClick={handleEdit}>Edit</button>
        </div>
    );
}


export default Profile