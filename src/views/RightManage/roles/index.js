import React, { Component } from "react";
import { Table, Button, Tag } from "antd";
import Axios from "axios";
export default class Roles extends Component {
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
  componentDidMount() {
    Axios.get("http://localhost:5000/roles").then((res) => {
      console.log(res.data);
      this.setState({
        datalist: res.data,
      });
    });
  }
  render() {
    return (
      <div>
        <Table
          dataSource={this.state.datalist}
          columns={this.columns}
          rowKey={(item) => item.id}
          pagination={{ pageSize: 5 }}
          // 控制表格展开以及展开的内容
          expandable={{
            expandedRowRender: (data) => {
              console.log(data.roleRight);
              return data.roleRight.map((item, index) => (
                <div key={index}>
                  <Tag color="green">
                    {item.category}
                  </Tag>
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
