import React from 'react';

import G2 from '@antv/g2';
import './index.css'
// import { View } from '@antv/data-set';
import DataSet from '@antv/data-set';
import { G2data, newG2data, lineData } from './data';

export default class G2G2Charts extends React.Component{
  constructor (props){
    super(props)
    this.state={
      chart:null,
      dataType:'old',
      chartType:'bar',
      ds:null
    };
    this.changeData = this.changeData.bind(this);
  }

  componentDidMount(){
    
    
    // 引入 数据集 DataSet
    // const DataSet = require('@antv/data-set');
    // step1 创建 dataset 指定状态量
    // 此处 指定状态量 state  状态变量参考值 与 属于无直接关系
    const ds = new DataSet({
      state:{
        max: '10000',
        min: '10',
      }
    }); 

    // step2 创建 数据视图 DataView 
    const dv = ds.createView(); 

    // const dv = new View(); 
    // step3 数据连接
    dv.source(G2data);
    // step4 数据转换处理
    dv.transform({
      type: 'filter',
      callback(row) {
        // console.log(row,'row---')
        const num = row.sold;
        return num <= ds.state.max && num >= ds.state.min;
      }
    });

    // 视图渲染
    // Step 1: 创建 Chart 对象
    const chart = new G2.Chart({
      container: 'c1', // 指定图表容器 ID
      forceFit: true, // 宽度自适应
      width : 600, // 指定图表宽度
      height : 300, // 指定图表高度
      padding: [ 10, 20, 99, 80 ], // 上，右，下，左
      // data:G2data // 载入数据
    });
    // Step 2: 载入数据源
    chart.source(dv,{
      x: {
        type: 'cat'
      },
      y: {
        min: 0
      }
    });
  
    
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre')
    // Step 4: 渲染图表
    chart.render();
    // 记录
    this.setState({
      ds,
      chart,
      dataType:'old',
      chartType:'bar'
    });
  }
  // 更换柱形图数据
  changeData(){
    const { chart, dataType, chartType} = this.state;

    const chartData = dataType === 'old'?newG2data:G2data;

    if(chartType==='bar'){
      
      /* 第一 直接生效 */ 
      // chart.changeData(chartData);
      /* 第二种 更新数据的方法 */ 
      chart.source(chartData);
      chart.guide().clear();// 清理guide
      // 此时才应用到视图 真正生效
      chart.repaint();
    } else {
      chart.clear(); // 清理所有
      chart.source(chartData,{
        x: {
          type: 'cat'
        },
        y: {
          min: 0
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('genre*sold').color('genre')
      // Step 4: 渲染图表
      chart.render();
    }
    

    this.setState({
      dataType:dataType === 'old'?'new':'old',
      chartType:'bar'
    });
    
  }
  // 更换折线图
  changeChartLine(){
    const { chart} = this.state;

    chart.clear(); // 清理所有
    chart.source(lineData, {
      'time': {
        type: 'time',
        nice: false,
        mask: 'HH:mm'
      },
      'value': {
        formatter: val => {
          return val + ' k';
        }
      }
    }); // 重新加载数据
    chart.line().position('time*value').size(2);
    chart.render();
    this.setState({
      chartType:'line'
    });
  }

  filterData(){

    const { ds } = this.state;
    // step4 更新状态量 修改参考值
    ds.setState('min', '50');
    ds.setState('max', '20000');
  }

  render (){
    return (
    <div>
     
      <h2 className="ctrl-box">
        <button className="ctrl-btn" onClick={this.filterData.bind(this)}> 筛选最小50 最大20000</button>
        <button className="ctrl-btn" onClick={this.changeChartLine.bind(this)}>更换折线图</button>
        <button className="ctrl-btn" onClick={this.changeData}>更换柱形图数据</button>
      </h2>
      
      <div id="c1"></div>
    </div>)
  }
 
  
}