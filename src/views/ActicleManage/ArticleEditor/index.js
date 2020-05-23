import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentBlock } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";

export default class ArticleEditor extends Component {
  state = {
    editorState: "",
    contentState: "",
  };
  componentDidMount() {
    console.log("第一次会执行", this.props.content);
    // 当content  为空时 就直接返回
    // 之所以做判断是因为 假如点击创建的时候里面是没有值的 然后执行下面的解析就会报错   ，， 所以为空时 就直接返回 不执行下面
    if (!this.props.content) {
      return;
    }
    // 就是content  有值的时候  就会执行这里  有值就解析
    const html = this.props.content;
    const contentBlock = htmlToDraft(html);
    if (ContentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      ); //内容状态
      const editorState = EditorState.createWithContent(contentState);
      //编辑器状态
      this.setState({
        editorState,
      });
    }
  }
  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          onBlur={() => {
            console.log("失去焦点", draftjsToHtml(this.state.contentState));
            // 子传父
            this.props.onEvent(draftjsToHtml(this.state.contentState));
          }}
        />
      </div>
    );
  }
  onContentStateChange = (contentState) => {
    // console.log(contentState);
    this.setState({
      contentState,
    });
  };
  onEditorStateChange = (editorState) => {
    //  console.log((editorState));
    this.setState({
      editorState,
    });
  };
}
