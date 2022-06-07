import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { notification } from "antd"
import http from "../helpers"
import { useDispatch } from "react-redux"
import { setError } from "../store/features/authSlice"
import React, { useState } from "react"
import { Modal, Button } from "antd"

const list = {
  getIntrestOverTime: "getIntrestOverTime",
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

export const useGetIntrestOverTime = (data) => {
  const dispatch = useDispatch()
  const params = {
    searchValues: data.searchValues,
    startDate: data.dates.startDate,
    endDate: data.dates.endDate,
    region: data.region,
    category: data.category,
  }
  return useQuery(
    [list.getIntrestOverTime, data],
    () => {
      return http.post("/gtrends/overtime", params)
    },
    {
      enabled:
        data?.dates?.startDate?.length > 0 &&
        data?.dates?.endDate?.length > 0 &&
        data?.region?.length > 0 &&
        data?.searchValues?.length > 0
          ? true
          : false,
      onSuccess: (res) => {
        if (res?.response?.data) {
          dispatch(setError())
        }
      },
      onError: (e) => {
        openNotification("error", "Error", e)
      },
    }
  )
}
export const useGetIntrestByRegion = (data) => {
  const dispatch = useDispatch()
  const params = {
    searchValues: data.searchValues,
    startDate: data.dates.startDate,
    endDate: data.dates.endDate,
    region: data.region,
    category: data.category,
  }
  return useQuery(
    [list.getIntrestByRegion, data],
    () => {
      return http.post("/gtrends/byregion", params)
    },
    {
      enabled:
        data?.dates?.startDate?.length > 0 &&
        data?.dates?.endDate?.length > 0 &&
        data?.region?.length > 0 &&
        data?.searchValues?.length > 0
          ? true
          : false,
      onSuccess: (res) => {
        if (res?.response?.data) {
          dispatch(setError())
        }
      },
      onError: (e) => {
        if (e.response.status === 401) {
          dispatch(setError())
        }
      },
    }
  )
}
