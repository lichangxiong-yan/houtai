import React, { Component } from "react";
import { Table, Button, Tag } from "antd";
import axios from "axios";
// import store from "../../redux";
import { connect } from "react-redux";
class Roles extends Component {
  state = {
    datalist: [],
  };
  data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
  ];
  columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "用户名",
      // dataIndex: "username",
      key: "age",
      render: (obj) => (
        <Button
          type="danger"
          // onClick={() => {
          //   this.handleDelClick(obj.id); //把当前点击的id传给
          // }}
        >
          delete
        </Button>
      ),
    },
  ];
  // action = () => {
  //   return Axios.get(`http://localhost:5000/roles`).then((res) => {
  //     return {
  //       type: "roles",
  //       payload: res.data,
  //     };
  //   });
  // };
  componentDidMount() {
    // // 先获取这个的数据 看看有没有值
    // let rolesList = store.getState().roles;
    // if (rolesList.length === 0) {
    //   // 就是说第一次的时候  就让他发布 请求
    //   store.dispatch(this.action()); //dispath 传入一个promise对象，不支持，只支持最简单的对象，需要借助中间件（middleware）
    // } else {
    //   // 如果有值的话 就直接拿这个  不用重新请求
    //   this.setState({
    //     datalist: rolesList,
    //   });
    // }

    // this.unscribe = store.subscribe(() => {
    //   console.log(store.getState().roles);
    //   this.setState({
    //     datalist: store.getState().roles,
    //   });
    // });

    // react-redux实现
    if (this.props.roleslist.length === 0) {
      // dispatch 发布  调用这个方法
      this.props.getRoleList();
    }
  }

  // 销毁
  // componentWillUnmount() {
  //   this.unscribe(); // 取消方法 unscribe这是个函数体 用() 销毁
  // }
  render() {
    return (
      <div>
        <Table
          dataSource={this.props.roleslist}
          columns={this.columns}
          rowKey={(item) => item.id}
          pagination={{ pageSize: 5 }}
          // 控制表格展开以及展开的内容
          expandable={{
            expandedRowRender: (data) => {
              console.log(data.roleRight);
              return data.roleRight.map((item, index) => (
                <div key={index}>
                  <Tag color="green">{item.category}</Tag>
                  {/* <b>{item.category}</b> */}
                  {item.list.map((childitem) => (
                    <Tag key={childitem} color="green">
                      {childitem}
                    </Tag>
                  ))}
                </div>
              ));
            },
          }}
        />
      </div>
    );
  }
}

// 订阅
const mapStateToProps = (state) => {
  return {
    roleslist: state.roles,
  };
};

// 发布
const mapDispatchToProps = {
  async getRoleList() {
    // 这里做发布   dispatch
    let res = await axios.get("http://localhost:5000/roles");
    return {
      type:'roles',
      payload: res.data
    }
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
