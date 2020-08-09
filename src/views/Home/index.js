import React, { Component } from "react";
// import axios from "axios";
import echarts from "echarts";
import axios from "axios";
import _ from "lodash"; // 不需下载
export default class Home extends Component {
  state = {};
  group = [];
  componentDidMount() {
    // console.log(this.refs.myechart.clientWidth);

    axios.get("http://localhost:5000/articles").then((res) => {
      //  console.log(res.data);
      // 后端给的数据不是前端想要的 ，数据转换

      // lodash
      console.log(_.groupBy(res.data, "author")); // 按 author 来分组
      // console.log(_.groupBy(res.data, (item) => item.category[0]));

      this.group = _.groupBy(res.data, "author");

      // ES5
      // console.log(Object.keys(this.group)); // 拿到对象中的key
      // console.log(Object.values(this.group).map((item) => item.length)); // 拿到对象中的每一个value值

      this.initEChart();
    });



    // 这个是控制宽度 大小  自适应窗口
    window.onresize = () => {
      console.log(123);
      this.myChart.resize();
    };
  }
  initEChart = () => {
    this.myChart = echarts.init(this.refs.myechart);
    // 指定图表的配置项和数据
    var option = {
      // title: {
      //   text: "统计用户发布文章数",
      // },
      // tooltip: {},
      // legend: {
      //   data: ["文章数"],
      // },
      // xAxis: {
      //   data: Object.keys(this.group),
      // },
      // yAxis: {
      //   minInterval: 1, // 设置成1保证坐标轴分割刻度显示成整数。
      // },
      // series: [
      //   {
      //     name: "文章数",
      //     type: "bar",
      //     data: Object.values(this.group).map((item) => item.length),
      //   },
      // ],

      title: {
        text: "统计用户发布文章数",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: Object.keys(this.group),
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            {
              value: Object.values(this.group).map((item) => item.length)[0],
              name: Object.keys(this.group)[0],
            },
            {
              value: Object.values(this.group).map((item) => item.length)[1],
              name: Object.keys(this.group)[1],
            },
            {
              value: Object.values(this.group).map((item) => item.length)[2],
              name: Object.keys(this.group)[2],
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    this.myChart.setOption(option);
  };

  // 清空
  componentWillUnmount() {
    window.onresize = null;
  }
  render() {
    return (
      <div ref="myechart" style={{ width: "100%", height: "400px" }}></div>
    );
  }
}

// RestFul api 接口

// http协议  method  ,get post ,put , delete,connect header, trace...

// $.get  $.post  $.post  $.delete
// axios.get  axios.post  axios.put  axios.delete
//  来进行 增删改查
