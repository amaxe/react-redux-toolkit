import React from 'react'
import './App.css'
import { SignupPage } from './pages/SignupPage/SignupPage'
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/LoginPage/Login'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App
