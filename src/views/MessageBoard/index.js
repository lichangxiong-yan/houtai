import React, { Component } from "react";
import {Route} from 'react-router-dom'
import List from "./List";
import Management from "./Management";
export default class MessageBoard extends Component {
  render() {
    return (
      <div>

        <Route path="/messageBoard/list" component={List} />
        <Route path="/messageBoard/management" component={Management} />
      </div>
    );
  }
}
