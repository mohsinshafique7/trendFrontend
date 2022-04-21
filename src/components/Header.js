import React from "react"
import { Layout, Button } from "antd"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export const Styles = styled.div`
  .ant-layout-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: inherit;
  }
`

const Header = () => {
  let navigate = useNavigate()
  const { Header } = Layout

  return (
    <Styles>
      <Header className="site-layout-background">
        <Button
          type="primary"
          onClick={() => {
            localStorage.clear()
            navigate("/")
          }}
        >
          Log Out
        </Button>
      </Header>
    </Styles>
  )
}

export default Header
