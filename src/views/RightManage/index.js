import React, { Component } from 'react'
import { Route } from 'react-router'

import Rights from "./rights";
import Roles from './roles'
export default class RightManage extends Component {
  render() {
    return (
      <div>
        我是公共的
        <Route path="/right-manage/roles" component={Roles} />
        <Route path="/right-manage/rights" component={Rights} />
        {/* <Redirect from="/" to="/right-manage/roles" /> */}
      </div>
    );
  }
}
