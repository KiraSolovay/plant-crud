import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import CreatePlant from "./pages/CreatePlant";
import Plants from "./pages/Plants";
import OnePlant from "./pages/OnePlant";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import RequireAuth from './components/RequireAuth';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true;

function AuthProvider() {
    const [loggedIn, setLoggedIn] = useState(null);

    return (
      <div className="appDiv">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={<RequireAuth setLoggedIn = {setLoggedIn} loggedIn={loggedIn}><CreatePlant /></RequireAuth>} />
                <Route path="/plants" element={<RequireAuth loggedIn={loggedIn} setLoggedIn = {setLoggedIn}><Plants/></RequireAuth>} />
                <Route path="/plants/:id" element={<RequireAuth loggedIn={loggedIn} setLoggedIn = {setLoggedIn}><OnePlant/></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
      </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider />
  </React.StrictMode>,
  document.getElementById('root')
);