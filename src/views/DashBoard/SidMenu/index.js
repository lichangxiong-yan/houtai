import React, { Component } from "react";
import MenuArr from "../../../router/menu";

import { withRouter } from "react-router";
import { Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;
class SideMenu extends Component {
  state = {
    collapsed: false,
  };
  // 自己封装渲染函数
  renderMenu = (menus) => {
    // let { roleTyoe } = JSON.parse(localStorage.getItem("token"));
    // roleType 当前登录用户的 roleType
    return menus.map((item) => {
      //提示：判断当前登录的用户的角色值（roleType），跟当前要渲染的侧边栏项需要的角色值进行对比
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <item.icon />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              //递归用法
              this.renderMenu(item.children)
            }
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path} icon={<item.icon />}>
            {item.title}
          </Menu.Item>
        );
      }
    });
  };
  render() {
    console.log(this.props); // 拿到此时路径
    let selectedKey = this.props.location.pathname;
    console.log(selectedKey);
    let openKey = "/" + this.props.location.pathname.split("/")[1]; // 截取二级路由的一级路径;
    console.log(openKey);
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]} // 默认一级高亮
          defaultOpenKeys={[openKey]} // 默认展开
          onClick={this.handleChangePage}
        >
          {this.renderMenu(MenuArr)}
          {/* <Menu.Item key="/home" icon={<UserOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="/user-manage" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="/user-manage/users">用户列表</Menu.Item>
          </SubMenu>
          <SubMenu key="/right-manage" icon={<UserOutlined />} title="权限列表">
            <Menu.Item key="/right-manage/roles">角色列表</Menu.Item>
            <Menu.Item key="/right-manage/rights">权限列表</Menu.Item>
          </SubMenu>
          <SubMenu
            key="/article-manage"
            icon={<UserOutlined />}
            title="文章管理"
          >
            <Menu.Item key="/article-manage/list">文章列表</Menu.Item>
            <Menu.Item key="/article-manage/category">文章分类</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    );
  }
  handleChangePage = (obj) => {
    console.log(obj.key);
    // 高阶组件提供
    this.props.history.push(obj.key); //key路由对应的路径
  };
}
export default withRouter(SideMenu);
