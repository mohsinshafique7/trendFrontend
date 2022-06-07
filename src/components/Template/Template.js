import React from "react"
import { Layout } from "antd"

import Header from "../Header"

const { Content, Footer } = Layout
const Template = (props) => {
  return (
    <Layout>
      <Header>
        <div className="log"></div>
      </Header>
      <Content className="h-screen">
        <div className="p-[50px] pt-[100px] h-fit">{props.children}</div>
      </Content>
      <Footer className="text-center">
        Powered By <span>Brand Nudge Pvt Ltd</span>{" "}
      </Footer>
    </Layout>
  )
}

export default Template
