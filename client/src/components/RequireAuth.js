import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./Auth";

export default function RequireAuth({ loggedIn, setLoggedIn, children }) {
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const isAuthenticated = await checkAuth();
            setAuthChecked(true);
            setLoggedIn(isAuthenticated);
        };

        if (!authChecked) {
            fetchAuthStatus();
        }
    }, [authChecked, setLoggedIn]);

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return <div>{children}</div>;
}
