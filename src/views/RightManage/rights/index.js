import React, { Component } from "react";
import { Table, Tag } from "antd";
import Axios from "axios";
// import store from "../../redux";
import {connect} from 'react-redux'
 class Rights extends Component {
  state = {
    datalist: [],
  };
  columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "name",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
      key: "age",
    },
    {
      title: "权限等级",
      dataIndex: "grade",
      key: "address",
      render: (grade) => {
        let arr = ["green", "orange", "red"];
        return <Tag color={arr[grade - 1]}>{grade}</Tag>;
      },
    },
  ];
  // action = () => {
  //   return Axios.get(`http://localhost:5000/rights`).then((res) => {
  //     return {
  //       type: "rights",
  //       payload: res.data,
  //     };
  //   });
  // };
  componentDidMount() {
    // 这是用 redux
    // let rightslist = store.getState().rights;
    // if (rightslist.length === 0) {
    //   store.dispatch(this.action());
    // } else {
    //   this.setState({
    //     datalist: rightslist,
    //   });
    // }
    // //订阅方法，离开组件，一定要取消订阅
    // this.unscribe = store.subscribe(() => {
    //   this.setState({
    //     datalist: store.getState().rights,
    //   });
    // });

    // 这是用 react-redux
    if(this.props.rightslist.length === 0){
      // 发布  调用这个方法
      this.props.getRightsList()
    }
  }

  // // 销毁
  // componentWillUnmount() {
  //   this.unscribe(); // 取消方法 unscribe这是个函数体 用() 销毁
  // }
  render() {
    return (
      <div>
        <Table
          dataSource={this.props.rightslist}
          columns={this.columns}
          rowKey={(item) => item.id}
          pagination={{ pageSize: 5 }} // 每页显示的最大条数
        />
        ;
      </div>
    );
  }
}

// 第一个参数
const a = (state) => {
  return {
    a: 1,
    rightslist: state.rights
  };
}

// 第二个参数
const b = ({
  // 这里用的是同步的写法  async  await
  async getRightsList() {
    let res = await Axios.get(`http://localhost:5000/rights`);
    return {
      type: "rights",
      payload:res.data // 这里传的值  请求的数据
    };
  }

})
export default connect(a,b)(Rights);
