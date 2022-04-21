import axios from "axios"
const token = localStorage.getItem("token")
const axiosIntance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})

export default axiosIntance
