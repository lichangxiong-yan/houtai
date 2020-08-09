import React, { Component } from "react";
import {
  PageHeader,
  Button,
  message,
  Steps,
  Form,
  Input,
  Cascader,
} from "antd";
import Axios from "axios";
import ArticleEditor from "../ArticleEditor";

const { Step } = Steps;
export default class Create extends Component {
  state = {
    current: 0,
    content: "", // 第二步 的那个
    options: [
      // label 级联菜单的显示内容，  value 对应value值，childern
    ],
    formdata: null,
  };
  componentDidMount() {
    Axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res.data);
      this.setState({
        options: res.data,
      });
    });
  }
  render() {
    // 布局格式  4:20
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            console.log(this.props);
            this.props.history.goBack();
          }}
          title="创建文章"
          subTitle="加油 向前冲"
        />
        <Steps current={this.state.current}>
          <Step key={111} title="基本信息" />
          <Step key={222} title="文章内容" />
          <Step key={333} title="提交内容" />
        </Steps>

        <div
          style={{
            marginTop: "50px",
            display: this.state.current === 0 ? "block" : "none",
          }}
        >
          <Form
            {...layout} // 布局 第一列占 4 第二列占20
            ref="form" // 拿到组件对象
            name="form_in_modal"
            initialValues={{}}
          >
            <Form.Item
              name="title"
              label="文章标题"
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
              name="category"
              label="文章分类"
              rules={[
                {
                  required: true,
                  message: "Please input the username of collection!",
                },
              ]}
            >
              <Cascader
                options={this.state.options}
                placeholder="Please select"
                fieldNames={{ label: "title" }} //自定义 options 中 label name children 的字段
              ></Cascader>
            </Form.Item>
          </Form>
        </div>
        <div
          style={{
            marginTop: "50px",
            height: "400px",
            overflow: "auto",
            display: this.state.current === 1 ? "block" : "none",
          }}
        >
          <ArticleEditor
            onEvent={(content) => {
              this.setState({
                content: content,
              });
            }}
          ></ArticleEditor>
        </div>

        <div
          style={{
            marginTop: "50px",
            display: this.state.current === 2 ? "block" : "none",
          }}
        >12312</div>


        <div className="steps-action">
          {this.state.current < 2 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {this.state.current === 2 && (
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
  submit = () => {
    let { username} = JSON.parse(localStorage.getItem("token"));
    // 提交给后端 存到数据库
    // console.log(this.state.formdata ,this.state.current)
    Axios.post("http://localhost:5000/articles", {
      ...this.state.formdata, // 第一步输入的内容
      content: this.state.content, // 第二部输入的内容
      author: username, // 作者
    }).then(res => {
       message.success("你成功了，你知道嘛？");
      console.log(res.data)
this.props.history.push(`/article-manage/list`);
    })
  };
  next = () => {
    // 为第一个的时候来判断 不能为空 然后把数据的存到state   收集表单信息， 在最后一步提交给后端
    if (this.state.current === 0) {
      // 此时表示第一步
      this.refs.form
        .validateFields()
        .then((values) => {
          console.log(values);
          this.setState({
            current: this.state.current + 1,
            formdata: values, //收集表单信息， 在最后一步提交给后端
          });
        })
        .catch((err) => {});
    } else {
      this.setState({
        current: this.state.current + 1,
      });
    }
  }

  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });
  }
}
