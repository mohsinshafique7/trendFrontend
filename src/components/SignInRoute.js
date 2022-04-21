import React from "react"
import { Navigate, Outlet } from "react-router-dom"
const useAuth = () => {
  const token = localStorage.getItem("token")
  if (token != null) {
    return true
  } else {
    return false
  }
}
const SignInRoute = () => {
  const isAuth = useAuth()
  return isAuth ? <Navigate to="/trends" /> : <Outlet />
}

export default SignInRoute
