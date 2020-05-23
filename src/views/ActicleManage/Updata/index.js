import React, { Component } from "react";
import {
  PageHeader,
  Steps,
  Form,
  Input,
  Cascader,
  Button,
  message,
} from "antd";
import Axios from "axios";
import ArticleEditor from "../ArticleEditor";

const { Step } = Steps;

export default class Updata extends Component {
  state = {
    current: 0,
    formdata: null, // 表单的值
    content: "", // 第二步的值
    firstNumber: 0, // 这个是那个key值
    options: [
      //默认 ： label 级联菜单的显示内容， value,对应value值， children,
    ],
  };
  componentDidMount() {
    console.log(this.props);
    let id = this.props.match.params.id;
    Axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res.data);
      this.setState({
        options: res.data,
      });
    });

    // 给表单加初始值
    Axios.get(`http://localhost:5000/articles/${id}`).then((res) => {
      console.log(res.data);
      let { title, category, content } = res.data;
      this.setState({
        formdata: {
          title,
          category,
        },
        content,
        firstNumber: 1, // key值发生改变 就不会复用了
      });

      //!!!
      //动态的设置表单的value值， 就是给第一步填上数据 填上之前写好的数据
      this.refs.form.setFieldsValue(this.state.formdata);
    });
  }
  render() {
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
          title="更新文章"
          subTitle="八仙过海  各显其能"
        />
        <Steps current={this.state.current}>
          <Step key="11111" title="基本信息" />
          <Step key="222222" title="文章内容" />
          <Step key="33333" title="提交文章" />
        </Steps>
        <div
          style={{
            marginTop: "50px",
            display: this.state.current === 0 ? "block" : "none",
          }}
        >
          <Form
            {...layout}
            ref="form" // 拿到组件对象
            name="form_in_modal"
            // 初始化 只会渲染一次
            initialValues={{}}
          >
            <Form.Item
              name="title"
              label="文章标题"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
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
                  message: "Please input the category of collection!",
                },
              ]}
            >
              {/*  这个组件是可配置的 */}
              <Cascader
                options={this.state.options}
                // onChange={onChange}
                placeholder="Please select"
                fieldNames={{ label: "title" }} // 自定义 options 中 label 字段 改成title  和后端传过来的一致  title代替label属性
              />
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
              // console.log("create组件得到content",content)

              this.setState({
                content,
              });
              //diff key值不同， 组件不会复用， key值相同，才会复用
            }}
            content={this.state.content}
            key={this.state.firstNumber}
          />
        </div>
        <div
          style={{
            marginTop: "50px",
            display: this.state.current === 2 ? "block" : "none",
          }}
        >
          {" "}
          333
        </div>

        <div className="steps-action">
          {this.state.current < 2 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {this.state.current === 2 && (
            <Button type="primary" onClick={this.submit}>
              更新
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
    // 获取当前登入的作者名字
    let { username } = JSON.parse(localStorage.getItem("token"));
    // 提交给后端 存到数据库
    console.log(this.state.formdata, this.state.content);

    Axios.post("http://localhost:5000/articles", {
      ...this.state.formdata, // 第一步输入的内容
      content: this.state.content, // 第二部输入的内容
      author: username, // 作者
    }).then((res) => {
      message.success("你成功了，你知道嘛？");
      this.props.history.push(`/article-manage/list`);
    });
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
  };
  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });
  };
}
