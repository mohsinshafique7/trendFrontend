import React from "react"
import { Layout, Button } from "antd"
import { useNavigate } from "react-router-dom"

import logo1 from "../assets/images/logo_bn.svg"
const Header = () => {
  let navigate = useNavigate()

  return (
    <div className="fixed w-full z-10 flex justify-between items-center h-[90px] bg-blue-800">
      <div className="ml-5">
        <img className="w-[100px]" src={logo1} alt={"asd"} />
      </div>
      <div className="pr-5">
        <Button
          type="primary"
          onClick={() => {
            localStorage.clear()
            navigate("/")
          }}
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}

export default Header
