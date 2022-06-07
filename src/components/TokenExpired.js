import React from "react"
import { Modal } from "antd"
import { Bars } from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"
import { resetError } from "../store/features/authSlice"
import { useNavigate } from "react-router-dom"
import { useRefreshToken } from "../Requests/authRequests"
const TokenExpired = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => {
    return {
      error: state.authSlice.error,
      errorType: state.authSlice.errorType,
    }
  })
  const { mutate } = useRefreshToken()
  const handleOk = () => {
    mutate({ refreshToken: localStorage.getItem("refreshToken") })
  }

  const handleCancel = () => {
    localStorage.clear()
    dispatch(resetError())
    navigate("/")
  }

  return (
    <>
      <Modal
        title="Token Expired"
        visible={error}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Your user session is about to expire. Continue session?</p>
        {/* {isLoading && (
          <Bars
            heigth="100"
            width="100"
            color="grey"
            ariaLabel="loading-indicator"
          />
        )} */}
      </Modal>
    </>
  )
}

export default TokenExpired
