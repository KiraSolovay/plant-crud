import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import CreatePlant from "./pages/CreatePlant";
import Plants from "./pages/Plants";
import OnePlant from "./pages/OnePlant";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreatePlant />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/:id" element={<OnePlant />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);