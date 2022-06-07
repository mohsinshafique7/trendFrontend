import React, { useState } from "react"
import { Form, Input, Button, Alert } from "antd"

import icon from "../assets/images/logo.svg"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../Requests/authRequests"

const SignIn = () => {
  let navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const { data, mutateAsync } = useLogin()

  const onFinish = async (values) => {
    localStorage.clear()
    const { userName, password } = values
    await mutateAsync({
      userName,
      password,
    })
    if (data?.response?.data) {
      setIsError(true)
    } else if (!data?.response?.data) {
      const {
        data: { token, refreshToken },
      } = data
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      navigate("/trends")
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="min-h-[550px] min-w-[900px] flex item-center  shadow-lg">
        <img
          className="min-h-[550px] w-full max-w-[500px]"
          src={icon}
          alt="img"
        />
        <div className="w-full">
          <Form
            className="p-[2rem]"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {isError && (
              <>
                <Alert
                  message="Error"
                  description="Wrong password or user name"
                  type="error"
                  showIcon
                />
                <br />
              </>
            )}
            <div className="text-center mt-[40px] text-[36px] font-[700]">
              Sign In
            </div>
            <div className="p-2">
              <Form.Item
                className="flex flex-col items-start"
                label="User Name"
                name="userName"
                rules={[
                  { required: true, message: "Please enter your User Name!" },
                ]}
              >
                <Input className="h-[48px] w-[350px]" />
              </Form.Item>

              <Form.Item
                className="flex flex-col items-start"
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password className="h-[48px] w-[350px]" />
              </Form.Item>
              <Form.Item className="">
                <Button
                  className="h-[50px] w-[350px] mt-3
                  "
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
