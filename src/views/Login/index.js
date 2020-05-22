import React, { Component } from "react";
import Particles from "react-particles-js";

import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import axios from 'axios'

import style from "./login.module.css";

export default class Login extends Component {
  render() {

    return (
      <div style={{ background: "rgb(35,39,65)" }}>
        <Particles height={window.innerHeight - 5} />
        <div className={style.container}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "账号是必填的哦",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码是必填的哦!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  onFinish = (values) => {
    console.log("提交后端校验: ", values);

    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=${true}`).then(res => {
      if(res.data.length === 0){
        message.error("用户名密码不匹配");
      }else{
             // localstorage 只能存字符串， json字符串转化
             localStorage.setItem("token", JSON.stringify(res.data[0]));
             this.props.history.push(`/home`); //跳转到首页
           }
    })

  };
}
