import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./Auth";

export default function LoginForm() {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        await login(user, navigate);
        navigate("/plants");
    };

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    className="LoginEmail"
                    name="email"
                    type="email"
                    value={user.email}
                    placeholder="email"
                    onChange={handleChange}
                />
                <Form.Control
                    className="LoginPassword"
                    name="password"
                    type="password"
                    value={user.password}
                    placeholder="password"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button
                className="LoginButton"
                variant="outline-success"
                onClick={handleLogin}
            >
                LOGIN
            </Button>
        </Form>
    );
}
