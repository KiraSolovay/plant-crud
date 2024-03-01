import axios from "axios";

export async function login(user, navigate) {
    try {
        await axios.post("/login", user, { withCredentials: true });
        navigate("/plants");
    } catch (err) {
        console.log(err);
    }
}

export async function checkAuth() {
    try {
        await axios.get("/check-auth", { withCredentials: true });
        return true; 
    } catch (err) {
        return false; 
    }
}

export async function signup(user) {
    try {
        await axios.post("/signup", user, { withCredentials: true });
        console.log("User signed up successfully!");
        
    } catch (err) {
        console.error("Error signing up:", err);
        throw err; 
    }
}

export async function logout({ setLoggedIn }) {
    await axios.get('/logout', { withCredentials: true });
    setLoggedIn(false);
}