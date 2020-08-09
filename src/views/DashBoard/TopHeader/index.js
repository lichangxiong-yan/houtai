import React, { Component } from "react";
import { withRouter } from "react-router";
import { Drawer,  Space } from "antd";
import { Layout, Dropdown, Menu, Avatar, Tooltip, Button } from "antd";

import { connect } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  GithubOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

class TopHeader extends Component {
  state = {
    collapsed: false,
    visible: false,

    placement: "right",
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
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
    const { placement, visible } = this.state;

    const text = <span> github</span>;
    const aaa = <span> 设置</span>;

    const buttonWidth = 70;
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
          <div
            style={{
              marginLeft: buttonWidth,
              clear: "both",
              whiteSpace: "nowrap",
            }}
          >
            <Tooltip placement="bottomLeft" title={text}>
              <a
                href="https://github.com/lichangxiong-yan/houtai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubOutlined />
              </a>
            </Tooltip>
            <Tooltip placement="bottomLeft" title={aaa}>
              <span onClick={this.showDrawer}>
                <SettingOutlined style={{ marginLeft: "10px" }} />
              </span>
            </Tooltip>
            <span style={{ marginLeft: "10px" }}>{currentUser.username}</span>
            <Dropdown overlay={menu}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
            ,
          </div>
        </div>

        <>
          <Space>
            {/* <Radio.Group defaultValue={placement} onChange={this.onChange}>
              <Radio value="top">top</Radio>
              <Radio value="right">right</Radio>
              <Radio value="bottom">bottom</Radio>
              <Radio value="left">left</Radio>
            </Radio.Group> */}
            {/* <Button type="primary" onClick={this.showDrawer}>
              Open
            </Button> */}
          </Space>
          <Drawer
            title="设置"
            placement={placement}
            closable={true}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <p>背景色</p>
            <span>
              <Button type="primary" shape="circle">
                A
              </Button>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <Button type="primary" shape="circle">
                B
              </Button>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <Button type="primary" shape="circle">
                C
              </Button>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <Button type="primary" shape="circle">
                D
              </Button>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <Button type="primary" shape="circle">
                E
              </Button>
            </span>
            <p>Some contents...</p>
          </Drawer>
        </>
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
