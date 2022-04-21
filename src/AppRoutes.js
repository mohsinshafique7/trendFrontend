import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminRoute from "./components/AdminRoute"
import ProtectedRoutes from "./components/ProtectedRoutes"
import SignIn from "./components/SignIn"
import SignInRoute from "./components/SignInRoute"
import AdminPage from "./Pages/AdminPage"
import TrendsPage from "./Pages/TrendsPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignInRoute />}>
          <Route exact path="/" element={<SignIn />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route exact path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/trends" element={<TrendsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
