import React from "react";
import "./App.css";
import { Signup } from "./components/Signup/Signup";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
