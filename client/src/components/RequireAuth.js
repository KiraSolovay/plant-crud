import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function RequireAuth(props) {
    const [loggedIn, setLoggedIn] = useState(null);


    const checkAuth = async () => {
        try{
            await axios.get("/check-auth", {withCredentials: true});
            setLoggedIn(true);
        }catch(err){
            setLoggedIn(false);
        }
    }
    useEffect(() => {
        const fetchAuthStatus = async () => {
            const isAuthenticated = await checkAuth(); 
            setLoggedIn(isAuthenticated);
        };
        
        if (loggedIn === null) {
            fetchAuthStatus();
        }
    }, [loggedIn]);

    if (loggedIn === null) {
        return <div>Loading...</div>;
    }

    if (loggedIn === false) {
        return <Navigate to="/login" />;
    }

    return <div>{props.children}</div>;
}