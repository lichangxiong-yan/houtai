import React, { Component } from 'react'
import { Route } from 'react-router'

import List from "./List";
import Category from "./Category";
export default class ActicleManage extends Component {
  render() {
    return (
      <div>
        文章管理
        <Route path="/article-manage/list" component={List} />
        <Route path="/article-manage/category" component={Category} />
      </div>
    );
  }
}
