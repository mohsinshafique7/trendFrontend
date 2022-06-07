import React, { useState, useEffect } from "react"
import { Table, Pagination } from "antd"
import { Link } from "react-router-dom"
import { FilterFilled } from "@ant-design/icons"
import _ from "lodash"
import moment from "moment"
import { setColor, getFilter, renderTableData } from "../../Utils/helpers"

import CoreForm from "../ModalForm/CoreForm"
// export const Styles = styled.div`
//   margin-top: 15px;
//   .ant-table-cell {
//     padding: 10px;
//     vertical-align: middle;
//   }
//   .pagination-controls {
//     display: flex;
//     justify-content: center;
//     margin-top: 25px;
//   }
// `
const BrandsTable = ({ data, onFinishEdit }) => {
  const [formInputs, setFormInputs] = useState(null)
  const dataSource = data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      userName: item.userName,
      company: item.companyName,
      status: item.status,
      isAdmin: item.isAdmin,
    }
  })
  const [page, setPage] = useState()
  const [perPage, setPerPage] = useState(10)
  const renderData = renderTableData(page, perPage, dataSource)

  const onChangePage = (page, pageSize) => {
    setPage(page - 1)
  }

  const onChangeSize = (page, pageSize) => {
    setPerPage(pageSize)
  }
  const ReturnTable = ({ record }) => {
    return (
      <CoreForm
        title={"Edit"}
        // initialValue={{
        //   name: record.name,
        //   brandId: record.parentBrandId,
        //   color: record.color,
        //   manufacturerId: record.manufacturerId,
        //   id: record.key,
        // }}

        inputData={[
          { label: "Name", name: "name", type: "text", required: true },
          {
            label: "User Name",
            name: "userName",
            type: "text",
            required: true,
          },
          {
            label: "Password",
            name: "password",
            type: "text",
            required: true,
          },
          {
            label: "Company",
            name: "company",
            type: "text",
            required: true,
          },
        ]}
        switchData={[
          {
            label: "Admin",
            name: "isAdmin",
            default: true,
            required: true,
          },
          {
            label: "Status",
            name: "status",
            default: true,
            required: true,
          },
        ]}
        onSendForm={onFinishEdit}
      />
    )
  }
  const columns = [
    {
      title: "Edit",
      dataIndex: "editUser",
      key: "editUser",
      width: "5%",
      render: (_, record) => <ReturnTable record={record} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      // render: (text, record) => (
      //   <Link to={`/brand/${record.key}/brand/page=0&perPage=10`}>
      //     {record.parentBrand ? `${record.parentBrand} / ${text}` : text}
      //   </Link>
      // ),
    },

    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: "20%",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text, record) => (text === true ? "Yes" : "No"),
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      width: "20%",
      render: (text, record) => (text === true ? "Yes" : "No"),
    },
  ]
  return (
    <div>
      <Table dataSource={renderData} columns={columns} pagination={false} />
      <Pagination
        className="text-center mt-5"
        total={dataSource.length}
        showTotal={(total) => `Total ${total} items`}
        pageSize={perPage}
        current={page + 1}
        onChange={onChangePage}
        onShowSizeChange={onChangeSize}
      />
    </div>
  )
}

export default BrandsTable
