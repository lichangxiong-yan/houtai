import React, { Component } from "react";
import { withRouter } from "react-router";

import { Layout, Dropdown, Menu, Avatar } from "antd";

import { connect } from "react-redux";
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
    // // 点击就会触发发布模式
    // store.dispatch({
    //   type: "xiong", // 这个是随便的没有规定
    //   payload: !this.state.collapsed,
    // }); //  // 传的对象  就是 action

    // react-redux 方法
    this.props.change({
      type: "xiong",
      payload: !this.state.collapsed,
    }); // 回调父组件传来的方法

    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handClick = (obj) => {
    console.log(obj);
    if (obj.key === "exit") {
      localStorage.removeItem("token");
      console.log(obj);
      this.props.history.push("/login");
    }
  };
  render() {
    // 这个是获取登入的用户信息
    const currentUser = JSON.parse(localStorage.getItem("token"));
    const menu = (
      <Menu onClick={this.handClick}>
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
const mapStateToProps = () => {
  return {
    a: 1,
  };
};

// 发布
const mapDispatchToProps = {
  change(obj) {
    return obj;
  },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
