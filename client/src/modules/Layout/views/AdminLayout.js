import React, { useEffect, useState } from "react";
import {
  RiseOutlined,
  LineChartOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  EditOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children }) {
  const [selected, setSelected] = useState("1");
  const navigate = useNavigate();
  const location = useLocation();
  const ITEMS_LINKS = {
    "stocks-1": "/sales-order",
    "stocks-2": "/purchased-orders",
    "stocks-3": "/stocks-control",
    2: "/register-item",
  };

  useEffect(() => {
    setSelected(
      location.pathname !== "/"
        ? Object.keys(ITEMS_LINKS).find(
            (key) => ITEMS_LINKS[key] === location.pathname
          )
        : "stocks-1"
    );
  }, [location.pathname]);

  const MenuItems = () => {
    const menuList = [
      {
        key: "1",
        icon: React.createElement(LineChartOutlined),
        label: "Stocks",
        open: true,
        children: [
          {
            key: "stocks-1",
            icon: React.createElement(BarChartOutlined),
            label: "Sales Orders",
            link: "123123",
          },
          {
            key: "stocks-2",
            icon: React.createElement(UnorderedListOutlined),
            label: "Purchase Orders",
          },
          {
            key: "stocks-3",
            icon: React.createElement(RiseOutlined),
            label: "Stocks Control",
          },
        ],
      },
      {
        key: "2",
        icon: React.createElement(EditOutlined),
        label: "Register item",
      },
      {
        key: "3",
        icon: React.createElement(MoneyCollectOutlined),
        label: "Revenue",
      },
    ];

    return menuList;
  };

  return (
    <Layout className="h-100">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          onClick={(item) => {
            console.log(item, "wow");
            setSelected(item.key);

            navigate(ITEMS_LINKS[item.key]);
          }}
          defaultOpenKeys={["1"]}
          theme="dark"
          mode="inline"
          selectedKeys={[selected]}
          items={MenuItems()}
        />
      </Sider>
      <Layout className="h-100" style={{ overflowY: "scroll" }}>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          className="h-100"
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div>{children}</div>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
