import React, { Component } from "react";
import { Button, Table, message, Popconfirm } from "antd";
import Axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  ChromeOutlined,
} from "@ant-design/icons";

export default class List extends Component {
  state = {
    datalist: [],
    aaa: true,
  };
  columns = [
    {
      title: "文章标题",
      dataIndex: "title", //映射原数据的属性
      key: "title",
    },
    {
      title: "文章作者",
      dataIndex: "author", //映射原数据的属性
      key: "author",
    },
    {
      title: "文章类别",
      dataIndex: "category", //映射原数据的属性
      key: "category",
      render: (category) => {
        return category.join("/");
      },
    },
    {
      title: "操作",
      //  dataIndex: "roleName", //映射原数据的属性
      key: "roleName",
      render: (obj) => {
        return (
          <div>
            <Button
              shape="circle"
              icon={<ChromeOutlined />}
              onClick={() => this.handlePreview(obj.id)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => this.handleUpdateClick(obj.id)}
            />
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              disabled={true}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                //  onClick={() => this.handleDelClick(obj.id)}
              />
            </Popconfirm>
            ,
          </div>
        );
      },
    },
  ];
  componentDidMount() {
    Axios.get(`http://localhost:5000/articles`).then((res) => {
      console.log(res.data);
      this.setState({
        datalist: res.data,
      });
    });
  }
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            console.log(this.props);
            this.props.history.push("/article-manage/Create");
          }}
        >
          创建文章
        </Button>
        <Table
          dataSource={this.state.datalist}
          columns={this.columns}
          rowKey={(item) => item.id}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
  }
  cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  // 编辑  更新
  handleUpdateClick = (id) => {
    console.log(this.props);
    this.props.history.push(`/article-manage/Updata/${id}`);
  };
  // 点击预览
  handlePreview = (id) => {
    console.log(this.props);
    this.props.history.push(`/article-manage/preview/${id}`);
  };
  // 删除按钮
  handleDelClick = (id) => {
    Axios.delete(`http://localhost:5000/articles/${id}`).then((res) => {
      // console.log("删除成功");
      message.success("删除成功了哦亲");
    });
    this.setState({
      datalist: this.state.datalist.filter((item) => item.id !== id),
    });
  };
}
