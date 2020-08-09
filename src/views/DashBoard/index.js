import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";
import "./index.css";

// import Home from "../Home";
// import TopHeader from "./TopHeader";
import SidMenu from "./SidMenu";
import UserManage from "../UserManage";
import RightManage from "../RightManage";
import ActicleManage from "../ActicleManage";
import Notfound from "../Notfound";
import List from "../ActicleManage/List";
import Category from "../ActicleManage/Category";
import Create from "../ActicleManage/Create";
import Preview from "../ActicleManage/Preview";
import Updata from "../ActicleManage/Updata";
import Collection from "../Collection";
import MessageBoard from "../MessageBoard";
import { Layout  } from "antd";
const  Home  = loadable(() => import('../Home'));
const TopHeader = loadable(() => import('./TopHeader'))
const {  Content } = Layout;

export default class DashBoard extends Component {

  render() {
    let { roleType } = JSON.parse(localStorage.getItem("token"));

    return (
      <Layout>
        <SidMenu></SidMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/home" component={Home} />
              {
                // 路由拦截
                // 要当前登入用户权限大于 3 才可以访问
                roleType >= 3 ? (
                  <Route path="/user-manage/users" component={UserManage} />
                ) : null
              }

              <Route path="/right-manage" component={RightManage} />

              {/* 文章管理- 文章列表 文章分类 */}
              <Route path="/acticle-manage" component={ActicleManage} />
              <Route path="/article-manage/list" component={List} />
              <Route path="/article-manage/Create" component={Create} />
              <Route path="/article-manage/Preview/:id" component={Preview} />
              <Route path="/article-manage/Updata/:id" component={Updata} />
              <Route path="/article-manage/category" component={Category} />
              <Route path="/collection" component={Collection} />
              <Route path="/messageBoard" component={MessageBoard} />

              <Redirect from="/" to="/home" exact />
              {/* 这个地方加 exact精准匹配是因为 怕用户不小心输错了 然后会自动跳转到 home 所以这里加个 exact精确 就不会走到这里了 */}
              <Route path="*" component={Notfound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
