/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-02 20:13:22
 */

import React from 'react';

const ToggleBtn =(props)=>{
  const toggleClick=()=>{
    const  toggleType = props && props.toggleType;
    props && props.toggleClick && props.toggleClick(toggleType);
  }
return <button onClick={toggleClick}>----{props.toggleType?'开':'关'}-----</button>
}

class TestBtn extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num1:0,
      num2:0
    }
  }

  clickAdd = (e) =>{
    console.log(11)
    this.setState((state)=>({num1:state.num1+1}))
  }
  clickReduce (e){
    console.log(22)
    this.setState((state)=>({num2:state.num2-1}))
  }
  render(){
    return <div>
      <button onClick={this.clickAdd} >---点击++:{this.state.num1}</button>
      <br/>
      <button onClick={(e)=>this.clickReduce(e)}>---点击--:{this.state.num2}</button>

    </div>
  }
}

export default class togglePage extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      toggleType:false
    }

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    /****
     * 在 JavaScript 中，class 的方法默认不会绑定 this。
     * 如果你忘记绑定 this.handleClick 并把它传入了 onClick，
     * 当你调用这个函数的时候 this 的值为 undefined。
     * */ 
    this.toggleClick = this.toggleClick.bind(this);
  }
  toggleClick(type){
    console.log(type,'type')
    // good
    // this.setState((state)=>({toggleType:!state.toggleType}));
    this.setState({toggleType:!type})
    
    /** danger **/  
    // this.setState({toggleType:!this.state.toggleType});

  }

  render (){
    return (
      <div>
        <h1>事件</h1>
        <ToggleBtn toggleClick={this.toggleClick} {...this.state}/>
        <br/>
        <hr/>
        <br/>
        <TestBtn/>
      </div>
    )
  }
}