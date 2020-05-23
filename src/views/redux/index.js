// React
import { createStore, applyMiddleware, compose } from "redux";
import reduxPromise from "redux-promise"; // 这个是转 promise形式的
import reduxThunk from "redux-thunk";  // 这个是 函数形式



const reducer = (preState, action) => {
  // 不能直接修改老状态
  // preState.isCollapsed = payLoad;
  // 只能进行深复制 prevState ,返回修改后的新状态
  // 深复制 preState老状态 , 返回修改后的新状态
  let { type, payload } = action; // 结构出来
  let newState = { ...preState }; // 深复制 这是之前初始定义的值
  switch (
    type // 根据 type 来做判断
  ) {
    case "xiong":
      // 处理折叠

      newState.isCollapsed = payload; // 可以说是传过来的值
      console.log(newState);
      return newState;
    case "roles":
      // 处理折叠

      newState.roles = payload; // 可以说是传过来的值
      console.log(newState);
      return newState;
    case "rights":
      // 处理折叠

      newState.rights = payload; // 可以说是传过来的值
      console.log(newState);
      return newState;
    default:
      return preState; // 如果没有匹配到 就返回老的状态
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  {
    isCollapsed: false, //  初始化状态
    roles: [], // 初始化状态
    rights: [], // 初始化状态
  },
  composeEnhancers(applyMiddleware(reduxPromise, reduxThunk))
);

export default store;
