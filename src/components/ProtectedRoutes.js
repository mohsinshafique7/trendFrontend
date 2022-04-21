import React from "react"
import { Navigate, Outlet } from "react-router-dom"
const useAuth = () => {
  const token = localStorage.getItem("token")
  if (token != null) {
    return true
  }
}
const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
