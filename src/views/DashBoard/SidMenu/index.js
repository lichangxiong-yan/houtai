import React, { Component } from "react";
import MenuArr from "../../../router/menu";

import { withRouter } from "react-router";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import store from "../../redux";
const { SubMenu } = Menu;
const { Sider } = Layout;
class SideMenu extends Component {
  state = {
    collapsed: false,
  };
  // 自己封装渲染函数
  renderMenu = (menus) => {
    let { roleType } = JSON.parse(localStorage.getItem("token"));
    // roleType 当前登录用户的 roleType
    return menus.map((item) => {
      //提示：判断当前登录的用户的角色值（roleType），跟当前要渲染的侧边栏项需要的角色值进行对比
      // 就是当前用户的  那个权限值 要大于等于当前的这个类别的等级 才会显示
      if (item.children && roleType >= item.permission) {
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
        // 如果 当前这个类别的等级大于 用户的权限值 就不显示 返回 null
        if (item.permission > roleType) {
          return null;
        }
        return (
          <Menu.Item key={item.path} icon={<item.icon />}>
            {item.title}
          </Menu.Item>
        );
      }
    });
  };

  componentDidMount() {
    // 订阅方法
    store.subscribe(() => {
      console.log("我是菜单那的 订阅", store.getState());
      this.setState({
        collapsed: store.getState().isCollapsed,
      });
    });
  }
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

// connect 拿到了 store.getState()
const mapStateToProps = (state) => {
  // state   这个是获取的状态   store.getState()
  console.log(state);
  return {
    isCollapsed: state.isCollapsed,
  };
};

export default connect(mapStateToProps)(withRouter(SideMenu));
