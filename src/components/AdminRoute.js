import React from "react"
import { Navigate, Outlet } from "react-router-dom"
const useAuth = () => {
  const token = localStorage.getItem("admin")
  if (token && token != null) {
    return true
  } else {
    return false
  }
}
const AdminRoute = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/trends" />
}

export default AdminRoute
