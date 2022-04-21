import React, { useEffect, useState } from "react"
import { Styles } from "./style"
import { searchSort } from "../../Utils/helpers"
import { Pagination, Empty } from "antd"
import SortedBox from "../SortedBox"

const TableBox = (props) => {
  const {
    data,
    page,
    perPage,
    // setPage,
    // setPerPage,
    tableHeader,
    tableData,
    searchValue,
    sortParams,
    titleParam,
    // reverse,
  } = props

  const [sortedValue, setSortedValue] = useState(sortParams[0].value)
  const [reverseValue, setReverseValue] = useState(false)

  let sortableData
  try {
    sortableData = searchSort(
      data,
      searchValue,
      sortedValue,
      titleParam,
      reverseValue
    )
  } catch (e) {
    sortableData = data.filter((item) => Boolean(item))
  }

  const limit =
    page * perPage + perPage < sortableData.length
      ? page * perPage + perPage
      : sortableData.length

  const renderData = sortableData.slice(page * perPage, limit)

  // useEffect(() => {
  //   if (searchValue.length !== 0) {
  //     setPage(0)
  //   }
  // }, [searchValue])

  // const onChangePage = (page, pageSize) => {
  //   setPage(page - 1)
  // }

  // const onChangeSize = (page, pageSize) => {
  //   setPerPage(pageSize)
  // }

  return (
    <Styles>
      <SortedBox
        sortParams={sortParams}
        sortedValue={sortedValue}
        setSortedValue={setSortedValue}
        setReverseValue={setReverseValue}
        reverseValue={reverseValue}
      />

      <div>
        {tableHeader()}
        {renderData.length ? (
          renderData.map((item) => (
            <div className="item-box" key={item.id}>
              {tableData(item)}
            </div>
          ))
        ) : (
          <div className="empty-item">
            <Empty />
          </div>
        )}
      </div>
      <Pagination
        className="pagination-controls"
        // total={sortableData.length}
        showTotal={(total) => `Total ${total} items`}
        // pageSize={perPage}
        // current={page + 1}
        // onChange={onChangePage}
        // onShowSizeChange={onChangeSize}
      />
    </Styles>
  )
}

export default TableBox
