import Nav from "../components/Nav"
import LoginForm from "../components/LoginForm"

export default function Login() {
    return(
        <div className="Login">
            <Nav/>
            <h1>Login Page</h1>
            <LoginForm/>
        </div>
    )
}