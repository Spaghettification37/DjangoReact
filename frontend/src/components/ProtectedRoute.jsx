import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {   //Simply attempt the functions created below
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);   //Grab the refresh token from local storage
        try {
            const res = await api.post("/api/token/refresh", {refresh: refreshToken});  //Send the refresh token to the backend and save the response to res
            if (res.status === 200){    //Response of 200 means it worked
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //So modify the expired access token with the new one
                setIsAuthorized(true)   //Set authorized status to true
            } else {
                setIsAuthorized(false)  //If the response didn't return 200 for some reason, do not give access
            }
        } catch (error) {               //If the token did not reach the backend somehow, do not give access
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)    //Access token from local storage
        if (!token) {                                       //If the token doesn't exist, don't give access and leave function
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)                    //Decode the token
        const tokenExpiration = decoded.exp                 //Grab the expiration date
        const now = Date.now() / 1000                       //Grab current date

        if (tokenExpiration < now){                         //If the token expired before the current date then refresh it, otherwise set authorized to true
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null){                             //If isAuthorized is null than it is either awaiting a refresh or checking expiration, so show "loading..."
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />   //If token checks out, navigate to the page, otherwise redirect to the login page
}

export default ProtectedRoute