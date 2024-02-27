import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

function Nav () {
    const navigate =  useNavigate();

    return(
        <div className="NavBar">
            <Button variant="outline-dark" className ="NavButton" onClick={() => navigate("create")}>Create a Plant</Button>
            <Button variant="outline-dark" className ="NavButton" onClick={() => navigate("plants")}>Plants Page</Button>
            <Button>Sign In</Button>
        </div>
    )
}

export default Nav;