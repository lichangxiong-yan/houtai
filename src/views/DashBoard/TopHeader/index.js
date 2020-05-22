import React, { Component } from "react";
import { withRouter } from "react-router";

import { Layout, Dropdown, Menu, Avatar } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

 class TopHeader extends Component {

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handClick = (obj) => {
    console.log(obj)
    if(obj.key === 'exit' ) {
      localStorage.removeItem('token')
      console.log(obj)
      this.props.history.push("/login");
    }
  }
  render() {
    // 这个是获取登入的用户信息
    const currentUser = JSON.parse(localStorage.getItem("token"));
    const menu = (
      <Menu onClick={this.handClick} >
        <Menu.Item key="role">{currentUser.roleName}</Menu.Item>
        <Menu.Item key="exit">退出</Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-background" style={{ padding: "0 24px" }}>
        {React.createElement(
          this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: this.toggle,
          }
        )}
        <div style={{ float: "right" }}>
          <span>欢迎{currentUser.username}回来</span>
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
          ,
        </div>
      </Header>
    );
  }
}
export default withRouter(TopHeader);
