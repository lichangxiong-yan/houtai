import React, { Component } from "react";
import { Button, Table, Switch, Select, Input, Form, Modal,message } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import axios from "axios";
const { Option } = Select;

const { TextArea } = Input;
export default class index extends Component {
  state = {
    datalist: [],
    isShow: false,   // 添加用户     模态框默认不显示
    isUpdate: false, // 更新 编辑 模态框默认不显示
    currentId: 0,  // 给个id  为了后面的更新使用
  };

  columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "age",
    },
    {
      title: "用户状态",
      dataIndex: "roleState", //  映射原数据的属性
      key: "roleState",
      render: (roleState, item) => {
        return (
          <Switch
            disabled={item.default}
            defaultChecked={roleState}
            onChange={() => this.handlSwitch(item)}
          />
        );
      },
    },
    {
      title: "操作",
      //  dataIndex: "default",
      key: "address",
      render: (obj) => (
        <span>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            disabled={obj.default}
            onClick={() => this.handleUpdate(obj)}
          />

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            disabled={obj.default}
            onClick={() => {
              this.handleDlete(obj.id);
            }}
          />
        </span>
      ),
    },
  ];

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
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
            this.setState({
              isShow: true,
            });
          }}
        >
          添加用户
        </Button>
        <Table
          dataSource={this.state.datalist}
          columns={this.columns}
          rowKey={(item) => item.id}
          pagination={{ pageSize: 5 }}
        />

        {/*  创建新增弹出层 */}
        <Modal
          visible={this.state.isShow}
          title="添加用户"
          okText="确定"
          cancelText="取消"
          onCancel={() => {
            this.setState({ isShow: false });
          }}
          onOk={this.handleClick}
        >
          <Form
            ref="form"
            layout="vertical" // 垂直排列
            name="form_in_modal"
            initialValues={{}}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "Please input the username of collection!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "Please input the password of collection!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色"
              rules={[
                {
                  required: true,
                  message: "Please input the roleType of collection!",
                },
              ]}
            >
              <Select showSearch placeholder="选中一个角色">
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* 创建更新弹出层 */}
        {/*  创建弹出层 */}
        <Modal
          visible={this.state.isUpdate}
          title="更新用户"
          okText="更新"
          cancelText="取消"
          onCancel={() => {
            this.setState({ isUpdate: false });
          }}
          onOk={this.handleUpdateOk}
        >
          <Form
            ref="updataform"
            layout="vertical" // 垂直排列
            name="form_in_modal"
            initialValues={{}}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "Please input the username of collection!",
                },
              ]}
            >
              {/* 这里面不仅仅是可以input哦 */}
             <TextArea
              // row={4}
              // value={detail.desc}
              // onChange={this.change.bind(this, "desc")}
            />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "Please input the password of collection!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色"
              rules={[
                {
                  required: true,
                  message: "Please input the roleType of collection!",
                },
              ]}
            >
              <Select showSearch placeholder="选中一个角色">
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  // 状态开关或关闭
  handlSwitch = (item) => {
    console.log(item);
    let {roleState} = item
    // 同步后端
    this.state.datalist.forEach((listitem) => {
      if (listitem.id === item.id) {
        listitem["roleState"] = !roleState

        axios
          .put(`http://localhost:5000/users/${item.id}`, {
            ...listitem, // 把最新的数据传过去
          })
          .then((res) => {
            console.log("update-ok" , res);
          })
          .catch((error) => {
            console.log("请求数据", error);
          });
      }
    });
  };

  // 点击添加
  handleClick = () => {
    console.log(this.refs.form);
    this.refs.form
      .validateFields() // 这个是验证表单 必须要输入值
      .then((values) => {
        console.log(values);
        this.refs.form.resetFields(); // 验证完重置表单
        // this.setState({
        //   isShow:false
        // })

        // 这个方法时更新用户
        this.renderTable(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //  这个上面那个添加用户的一个方法
  renderTable = (values) => {
    // 1- table更新
    // 2- 数据库
    let { username, password, roleType } = values; //解构
    let roleArr = ["小编", "管理员", "超级管理员"];
    // 这个是添加到 数据库
    axios
      .post(`http://localhost:5000/users`, {
        username,
        password,
        roleType,
        roleState: false, // 这个是那个开关  默认是关的
        roleName: roleArr[roleType - 1], // 这个是用来渲染那个名字的 小编...
      })
      .then((res) => {
        console.log(res.data);
        // 模态框消失
        // table更新  前端更新 就是给 datalist重新赋值
        this.setState({
          isShow: false, // 让模态框消失
          // 要先把老的数据放在这里 然后显示新的 数据直接接在后面
          datalist: [...this.state.datalist],
        });
      });
  };

  // 这个方法是删除  删除条件 要知道id
  handleDlete = (id) => {
    //1.同步后端
    //2.同步页面
    axios.delete(`http://localhost:5000/users/${id}`).then((res) => {
      console.log("删除成功");
    });
    // 更新状态
    this.setState({
      // 只有当删除的那个id 不相等就返回  就是相等就不返回结果
      datalist: this.state.datalist.filter((item) => item.id !== id),
    });
  };

  // 更新(编辑) 那个模态框的方法
  handleUpdate = (item) => {
    // console.log(item)

    // Model 组件 visible => false ,true
    setTimeout(() => {
      this.setState({
        isUpdate: true, // 模态框显示
        currentId: item.id, //id 记录此时要更新哪个user  给下面做更新用  更新需要  id
      });
      // 预设数据
      // setFieldsValue 给表单元素提前设置数据
      this.refs.updataform.setFieldsValue({
        username: item.username,
        password: item.password,
        roleType: item.roleType,
      });
    }, 0);
  };

  // 更新 方法
  handleUpdateOk = () => {
    // 先验证表单
    this.refs.updataform
      .validateFields()
      .then((values) => {
        console.log(values);
      
        setTimeout(() => {
          this.updateTable(values); // 调用 更新数据  values 这是更改之后的数据
          message.info('更新成功了哦');
        },0)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 更新  更新表格方法
  updateTable = (values) => {
    // 这个是老的状态  就是过滤当前正在点的那个id 项  这个过滤出来的是个数组所以要用[0]
    let oldItems = this.state.datalist.filter(
      (item) => item.id === this.state.currentId
    );
    console.log('12312',oldItems[0])  // 就是那一条数据  点击的那一条数据
    let roleArr = ["小编", "管理员", "超级管理员"];
    // console.log(oldItems)  // 是个数组格式
    // 更新  这里的更新是让后端更新    更新必须要有id
    axios
      .put(`http://localhost:5000/users/${this.state.currentId}`, {
        // 先将老的数据  和新的数据进行合并
        ...oldItems[0], // 老的状态  因为是个数组所以这里取第 0 项  就能拿到那个数据
        ...values, // 新的状态  就是那个变淡输入的内容  全部在 vaules里
        roleName: roleArr[values.roleType - 1], // 这个是那个名字  小编...
      })
      .then((res) => {
        // 同步到当前页面， 这里是让前端更新
        let newlist = this.state.datalist.map((item) => {
          if (item.id === res.data.id) {
            // 如果找到了就把更新后的值返回出来
            return res.data;
          } else {
            // 没有更新的话 ，还是返回以前的
            return item;
          }
        });
        this.setState({
          datalist: newlist, // 更新后的数据赋值
        });
      });
  };
}
