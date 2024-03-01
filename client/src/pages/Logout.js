import Nav from "../components/Nav";
import { useEffect } from "react";
import { logout } from "../components/Auth";

export default function Logout({ setLoggedIn }) {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout({ setLoggedIn });
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        handleLogout();

    }, [setLoggedIn]);

    return (
        <div className="LogoutPage">
            <Nav />
            <h1>You are Now Logged Out</h1>
        </div>
    );
}
