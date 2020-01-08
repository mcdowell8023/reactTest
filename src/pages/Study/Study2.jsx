/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-07 17:12:20
 */

import React from 'react';



class Clock extends React.Component{
  constructor(props){
    super(props)

    this.state={
      date:new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick(){
    this.setState({date:new Date()})
  };

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render (){
    return <h4>
      {this.state.date.toLocaleTimeString()}
    </h4>
  }
}

export default class Study2 extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:null
    };
  }

  render(){
    return (
      <div>
        <h1>State & 生命周期:</h1>
        <h2>clock 组件</h2>
        <Clock/>

        <br/>
        <div>
        props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。
        </div>
      </div>
    )

  }
}