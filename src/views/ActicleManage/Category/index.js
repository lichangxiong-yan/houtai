import React, { Component } from "react";

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import img from '../../../utils/img'
export default class Category extends Component {
  state = {
    imageUrl : img.uploadIcon
  }
  render() {
    return <div>
      <h1>你好</h1>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action= {'http://localhost:3000/api/upload/img'}

        onChange={this.handleChange}
      >
       <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} />
        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
      </Upload>
    </div>;
  }
}
