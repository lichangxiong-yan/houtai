import React, { Component } from "react";
import { PageHeader } from "antd";
import Axios from "axios";
export default class Preview extends Component {
  state = {
    title: "",
    subTitle: "",
    content: "",
  };
  componentDidMount() {
    console.log('ss',this.props)
    let id = this.props.match.params.id;
    Axios.get(`http://localhost:5000/articles/${id}`).then(res => {
      console.log(res.data)
      this.setState({
        title: res.data.title,
        subTitle: res.data.category.join('/'),
        content: res.data.content
      });
    })
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            this.props.history.goBack();
          }}
          title={this.state.title}
          subTitle={this.state.subTitle}
        />
        {/* react过滤后台富文本传来带标签的内容 */}
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.content,
          }}
        ></div>
      </div>
    );
  }

}
