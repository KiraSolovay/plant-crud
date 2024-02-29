import { Button, Form } from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function LoginForm() {
    const [user, setUser] = useState({email: "", password: ""})
    const [loggedIn, setLoggedIn] = useState([null])
    const [loginInfo, setLoginInfo] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

   const login = async () =>  {
        await axios.post("/login", user, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        setLoggedIn(true);
        setLoginInfo({email: "", password: ""})
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        await login();
        navigate("/plants");
    }

    const checkAuth = async () => {
        try{
            await axios.get("/check-auth", {withCredentials: true});
            setLoggedIn(true);
        }catch(err){
            setLoggedIn(false);
        }
    }
    return(
        <Form>
            <Form.Group>
                    <Form.Control
                        className="LoginEmail"
                        name="email"
                        type="email"
                        value={user.email}
                        placeholder="email"
                        onChange={handleChange} />
                    <Form.Control
                        className="LoginPassword"
                        name="password"
                        type="password"
                        value={user.password}
                        placeholder="password"
                        onChange={handleChange} />
                </Form.Group>
            <Button className="LoginButton" variant="outline-success" onClick={handleLogin}>LOGIN</Button>
        </Form>
    )
}