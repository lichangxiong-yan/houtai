import React, { Component } from 'react'
import { Result, Button } from "antd";
export default class Notfound extends Component {
  render() {
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => {
           console.log(this.props)
           this.props.history.push('/home')
          }}>Back Home</Button>}
        />
        ,
      </div>
    );
  }
}
