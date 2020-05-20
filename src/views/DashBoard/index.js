import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../Home";

import TopHeader from "./TopHeader";
import SidMenu from "./SidMenu";
import UserManage from "../UserManage";
import RightManage from "../RightManage";
import ActicleManage from "../ActicleManage";
import Notfound from "../Notfound";
export default class DashBoard extends Component {
  render() {
    return (
      <div>
        <TopHeader></TopHeader>
        <SidMenu></SidMenu>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/user-manage/users" component={UserManage} />
          <Route path="/right-manage" component={RightManage} />

          {/* 文章管理- 文章列表 文章分类 */}
          <Route path="/acticle-manage" component={ActicleManage} />

          <Redirect from="/" to="/home" exact />
          {/* 这个地方加 exact精准匹配是因为 怕用户不小心输错了 然后会自动跳转到 home 所以这里加个 exact精确 就不会走到这里了 */}
          <Route path="*" component={Notfound} />
        </Switch>
      </div>
    );
  }
}
