import React, { Component } from 'react'
import { PageHeader } from "antd";
import { Steps } from "antd";
const { Step } = Steps;
export default class Create extends Component {
 steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
  render() {
     const { current } = this.state;
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
        <Steps current={current}>
          {/* {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))} */}
        </Steps>
      </div>
    );
  }
}
