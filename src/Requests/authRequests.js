import { useMutation } from "react-query"
import { notification } from "antd"
import { useDispatch } from "react-redux"
import http from "../helpers"
import { resetError } from "../store/features/authSlice"
export const openNotification = (
  type,
  message = "Error",
  description = "An Error Occured"
) => {
  notification[type]({
    message,
    description,
  })
}

export const useLogin = () => {
  return useMutation(
    (data) => {
      return http.post("/auth/login", data)
    },
    {
      onSuccess: (res) => {},
      onError: (error) => {
        openNotification("error", "Error", "Error Creating Brand")
      },
    }
  )
}
export const useRefreshToken = () => {
  const dispatch = useDispatch()
  return useMutation(
    (data) => {
      return http.post("/auth/refresh-token", data)
    },
    {
      onSuccess: (res) => {
        const {
          data: { token, refreshToken },
        } = res
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        dispatch(resetError())
      },
      onError: (error) => {
        openNotification("error", "Error", "Error Creating Brand")
      },
    }
  )
}
