import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { notification } from "antd"
import http from "../helpers"
const list = {
  getAllUsers: "getAllUsers",
  getIntrestByRegion: "getIntrestByRegion",
}
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

export const useCreateUser = (data) => {
  // name, userName, companyName, password
  return useQuery(
    [list.getIntrestOverTime, data],
    () => {
      return axios.post(`http://localhost:3000/users/create`, data)
    },
    {
      onError: (e) => {
        openNotification("error", "Error", e)
      },
    }
  )
}
export const useGetAllUsers = () => {
  return useQuery(
    list.getAllUsers,
    () => {
      return http.get("/users")
    },
    {
      onError: (e) => {
        openNotification("error", "Error", e)
      },
    }
  )
}
