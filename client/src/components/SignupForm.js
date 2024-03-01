import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function SignupForm({ signup }) {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        await signup(user);
        navigate("/login");
    };

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    className="SignupEmail"
                    name="email"
                    type="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <Form.Control
                    className="SignupPassword"
                    name="password"
                    type="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button className="SignupButton" variant="outline-success" onClick={handleSignup}>SIGN UP</Button>
        </Form>
    );
}
