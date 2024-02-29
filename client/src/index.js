import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import CreatePlant from "./pages/CreatePlant";
import Plants from "./pages/Plants";
import OnePlant from "./pages/OnePlant";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from './components/RequireAuth';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<RequireAuth><CreatePlant /></RequireAuth>} />
        <Route path="/plants" element={<RequireAuth><Plants/></RequireAuth>} />
        <Route path="/plants/:id" element={<RequireAuth><OnePlant/></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);