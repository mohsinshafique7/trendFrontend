import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Layout, Menu } from "antd"

import {
  DesktopOutlined,
  PieChartOutlined,
  UserSwitchOutlined,
  GroupOutlined,
  FileProtectOutlined,
  ControlOutlined,
  LinkOutlined,
  SettingOutlined,
  NotificationOutlined,
  WarningOutlined,
  CodeSandboxOutlined,
  HeatMapOutlined,
  SafetyCertificateOutlined,
  SubnodeOutlined,
  ContainerOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import { Styles } from "./style"
import Header from "../Header"
import logo1 from "../../assets/logo_bn.svg"

const { Content, Sider } = Layout
const isAdmin = () => {
  const token = localStorage.getItem("admin")
  return token
}
const Template = (props) => {
  const admin = isAdmin()
  console.log("now", admin)
  // const [collapsed, setCollaps] = useState(JSON.parse(localStorage.getItem("Collapsed")));
  // const [activeLink, setActiveLink] = useState(null);

  // const onCollapse = (collapsed) => {
  //   setCollaps(collapsed);
  //   localStorage.setItem("Collapsed", collapsed);
  // };

  // useEffect(() => {
  //   const activeLink = props.location.pathname.split("/")[1];

  //   setActiveLink(activeLink);
  // }, [props.location.pathname]);

  return (
    <Styles>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}> */}
        <Sider collapsible>
          <Link to="/trends" className="logo">
            <img src={logo1} alt="logo" />
          </Link>

          <Menu theme="dark" mode="inline">
            {admin === "true" && (
              <Menu.Item key="users">
                <Link to={"/admin"}>
                  <UserSwitchOutlined />
                  <span className="color-selected">Users</span>
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key="trends">
              <Link to={"/trends"}>
                <BarChartOutlined />
                <span className="color-selected">Trends</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="manufacturers">
              <Link to={"/manufacturers/page=0&perPage=10"}>
                <PieChartOutlined />
                <span className="color-selected">Manufacturers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="brands">
              <Link to={"/brands/page=0&perPage=10"}>
                <DesktopOutlined />
                <span className="color-selected">Brands</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="retailers">
              <Link to={"/retailers/page=0&perPage=10"}>
                <ControlOutlined />
                <span className="color-selected">Retailers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to={"/categories/page=0&perPage=10"}>
                <GroupOutlined />
                <span className="color-selected">Categories</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="product-groups">
              <Link to={"/product-groups/page=0&perPage=10"}>
                <FileProtectOutlined />
                <span className="color-selected">Product Groups</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="scrapper-links">
              <Link
                to={
                  "/scrapper-links/retailer&category&categoryType&page=0&perPage=10"
                }
              >
                <LinkOutlined />
                <span className="color-selected">Parser Links</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="scraper-settings">
              <Link to={"/scraper-settings/page=0&perPage=10"}>
                <SettingOutlined />
                <span className="color-selected">Parser Settings</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="companies">
              <Link to={"/companies/page=0&perPage=10"}>
                <ContainerOutlined />
                <span className="color-selected">Companies</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="source-categories">
              <Link to={"/source-categories/page=0&perPage=10"}>
                <SafetyCertificateOutlined />
                <span className="color-selected">Source Categories</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="mapping-suggestions">
              <Link to={"/mapping-suggestions/mapping/page=1&perPage=10"}>
                <HeatMapOutlined />
                <span className="color-selected">Product Mapping</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="core-products">
              <Link
                to={
                  "/core-products/direction=ASC&noBrand=false&notReviewed=false&noCategory=false&issues=false&order=title&page=1&perPage=10&productId=null"
                }
              >
                <CodeSandboxOutlined />
                <span className="color-selected">Core Products</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="notifications">
              <Link to={"/notifications/notification/page=0&perPage=10"}>
                <NotificationOutlined />
                <span className="color-selected">Notifications</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="subscriptions">
              <Link to={"/subscriptions"}>
                <SubnodeOutlined />
                <span className="color-selected">Subscriptions</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="errors">
              <Link to={"/errors/page=0&perPage=10"}>
                <WarningOutlined />
                <span className="color-selected">Errors</span>
              </Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content>
            <div className="site-layout-background">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </Styles>
  )
}

export default Template
