import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Home from './screens/home'
import RegisterPage from './auth/components/RegisterForm'
import LoginPage from './auth/components/LoginForm'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Agrega más rutas protegidas aquí */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
