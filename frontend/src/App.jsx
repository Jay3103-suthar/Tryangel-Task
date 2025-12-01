import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Clients from './pages/Clients.jsx'
import Categories from './pages/Categories.jsx'
import Policies from './pages/Policies.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {

  // If user is already logged in → prevent accessing login/signup
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Routes>

      {/* Public Routes */}
      <Route 
        path="/login" 
        element={!isLoggedIn ? <Login /> : <Navigate to="/" />} 
      />

      <Route 
        path="/signup" 
        element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/categories" 
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/policies" 
        element={
          <ProtectedRoute>
            <Policies />
          </ProtectedRoute>
        } 
      />

      {/* Unknown Routes → redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}
