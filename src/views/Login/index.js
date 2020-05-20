import React, { Component } from 'react'
import Particles from "react-particles-js";
import style from './login.module.css'
export default class index extends Component {
  render() {
    return (
      <div style={{ background: "rgb(35,39,65)" }}>
        <Particles height={window.innerHeight - 5} />
        <div className={style.container}></div>
      </div>
    );
  }
}
