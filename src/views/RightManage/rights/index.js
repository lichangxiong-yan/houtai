import React, { Component } from "react";
import { Table, Tag } from "antd";
import Axios from "axios";
export default class Rights extends Component {
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
  componentDidMount() {
    Axios.get(`http://localhost:5000/rights`).then((res) => {
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
          pagination={{ pageSize: 5 }} // 每页显示的最大条数
        />
        ;
      </div>
    );
  }
}
