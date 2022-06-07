import axios from "axios"

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.getItem("token")
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL =
      "http://ec2-13-50-15-180.eu-north-1.compute.amazonaws.com:3000"

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
}
