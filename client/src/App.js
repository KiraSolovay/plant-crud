import './App.css';
import {Button} from  "react-bootstrap";
import {useNavigate} from "react-router-dom"
import Nav from "./Nav"

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Nav/>
      <h1>Welcome to Kira's Plant Tracker App!</h1>
    </div>
  );
}

export default App;
