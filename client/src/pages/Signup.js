import SignupForm from "../components/SignupForm";
import Nav from "../components/Nav";

export default function Signup() {
    return(
        <div className ="Signup">
            <Nav/>
        <h1>Signup Page</h1>
        <SignupForm/>
        </div>
    )
}