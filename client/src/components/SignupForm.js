import { Button, Form } from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function LoginForm() {
    const [user, setUser] = useState({email: "", password: ""})
    const [signUpInfo, setSignUpInfo] = useState({});
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

   const signup = async () =>  {
        await axios.post("/signup", signUpInfo, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        setSignUpInfo({email: "", password: ""});
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        await signup();
        navigate("/login");
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
            <Button className="LoginButton" variant="outline-success" onClick={handleSignup}>SIGN UP</Button>
        </Form>
    )
}