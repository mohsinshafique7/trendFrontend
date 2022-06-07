import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminRoute from "./components/AdminRoute"
import ProtectedRoutes from "./components/ProtectedRoutes"
import SignIn from "./components/SignIn"
import SignInRoute from "./components/SignInRoute"
import AdminPage from "./Pages/AdminPage"
import TrendsPage from "./Pages/TrendsPage"
import { useDispatch, useSelector } from "react-redux"
import { setError, resetError } from "./store/features/authSlice"
import ErrorPopup from "./components/ErrorPopup"
import TokenExpired from "./components/TokenExpired"
const AppRoutes = () => {
  const { error } = useSelector((state) => state.authSlice)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignInRoute />}>
          <Route exact path="/" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/trends" element={<TrendsPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
      {!!error ? <TokenExpired /> : null}
    </BrowserRouter>
  )
}

export default AppRoutes
