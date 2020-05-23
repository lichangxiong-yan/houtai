import React from "react";

import BlogRouter from "../src/router";
import { Provider } from "react-redux";
import store from "./views/redux";
// 根组件
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BlogRouter />
      </Provider>
    );
  }
}
// <Provider></Provider>  这个目的是给所有的孩子传 store

export default App;
