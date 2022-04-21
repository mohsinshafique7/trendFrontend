import React, { useEffect, useState } from "react"
// import qs from "query-string"
import moment from "moment"
import axiosInstance from "../helpers"
import { Link } from "react-router-dom"
// import { getCategories, createCategory, editCategory } from "../../store/categories/action";
// import Loader from "../Loader/Loader";
import Search from "./Search"
import TableBox from "../components/TableBox/TableBox"
import CoreForm from "./ModalForm/CoreForm"
// import { STATE_STATUSES } from "../../utils/app";
import { Checkbox, notification } from "antd"

const Admin = () => {
  // const {
  //   getCategories,
  //   editCategory,
  //   match: { params },
  //   history,
  // } = props
  const [usersData, setUsersData] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const inputData = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "User Name", name: "userName", type: "text", required: true },

    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      required: true,
    },
    { label: "Job Title", name: "jobTitle", type: "text", required: true },
  ]
  const switchData = [
    {
      label: "Is Admin",
      name: "isAdmin",
      default: true,
      required: true,
    },
  ]
  const passwordData = [
    { label: "Password", name: "password", type: "text", required: true },
  ]
  // const selectData = [
  //   {
  //     name: "categoryId",
  //     value: "id",
  //     option: "name",
  //     // action: getCategories,
  //     store: "categories",
  //     lable: "Parent category",
  //     required: false,
  //     mode: false,
  //     categorySelect: true,
  //   },
  // ]

  // const initialValue = {
  //   isAdmin: true,
  // }

  const sortParams = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Jon Title", value: "jobTitle" },
    { label: "User Name", value: "username" },
  ]

  // const [queryParams, setQueryParams] = useState(qs.parse(params.param))
  async function getAllUsersData() {
    try {
      const data = await axiosInstance.get("/login")
      setUsersData(data.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllUsersData()
  }, [])

  // useEffect(() => {
  //   getCategories()
  // }, [getCategories])

  const setColor = (color) => {
    return {
      backgroundColor: color,
      padding: "10px",
      border: "1px solid green",
    }
  }

  const onSendForm = async (values) => {
    try {
      const data = await axiosInstance.post("/login/create", values)
    } catch (err) {
      console.log(err)
    }
  }

  const openNotification = (type) => {
    notification[type]({
      message: "Error",
      description: "This category already exists.",
    })
  }

  // const setPage = (page) => {
  //   setQueryParams((queryParams) => {
  //     return {
  //       ...queryParams,
  //       page,
  //     }
  //   })
  // }

  // const setPerPage = (perPage) => {
  //   setQueryParams((queryParams) => {
  //     return {
  //       ...queryParams,
  //       perPage,
  //     }
  //   })
  // }

  // const changeSubscription = (item) => {
  //   console.log(item)
  //   const {
  //     id,
  //     categoryId,
  //     color,
  //     name,
  //     status: { subscription },
  //   } = item
  //   const data = {
  //     categoryId,
  //     color,
  //     name,
  //     status: {
  //       subscription: !subscription,
  //     },
  //   }
  //   // editCategory(data, id).then(() => getCategories())
  // }

  const tableHeader = () => (
    <div className="item-box header">
      <div>Name</div>
      <div>Company Name</div>
      <div>Job Title</div>
      <div>userName</div>
    </div>
  )

  const tableData = (item) => (
    <>
      <div>{[item.name]}</div>
      <div>{[item.company]}</div>
      <div>{[item.jobTitle]}</div>
      <div>{item.username}</div>
    </>
  )

  return (
    <>
      <div className="item-title">Categories</div>
      <Search setSearchValue={setSearchValue} />
      <CoreForm
        //initialValue={initialValue}
        title={"Create Category"}
        inputData={inputData}
        // selectData={selectData}
        onSendForm={onSendForm}
        switchData={switchData}
        passwordData={passwordData}
      />
      <TableBox
        data={usersData}
        tableHeader={tableHeader}
        tableData={tableData}
        titleParam={"name"}
        sortParams={sortParams}
        searchValue={searchValue}
        // page={Number(1)}
        // perPage={Number(10)}
        // setPage={setPage}
        // setPerPage={setPerPage}
      />
      {/* <CoreForm
        initialValue={initialValue}
        title={"Create Category"}
        inputData={inputData}
        selectData={selectData}
        onSendForm={onSendForm}
        switchData={switchData}
      />
      {props.status !== STATE_STATUSES.PENDING ? (
        
      ) : (
        <Loader />
      )} */}
    </>
  )
}

export default Admin
