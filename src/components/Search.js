import React, { useEffect, useState } from "react"

import styled from "styled-components"
import { Input } from "antd"
// import { setSearchValue } from '../../store/filters/action'

export const Styles = styled.div`
  .ant-input-search {
    max-width: 600px;
    width: 100%;
    display: flex;
    margin: 25px auto;
  }
`

const SearchInput = ({ setSearchValue }) => {
  const { Search } = Input

  useEffect(() => {
    setSearchValue("")
  }, [setSearchValue])

  return (
    <Styles>
      <Search
        placeholder="input search text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Styles>
  )
}

export default SearchInput
