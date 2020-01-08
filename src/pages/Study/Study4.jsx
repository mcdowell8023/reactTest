/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-03 10:33:13
 */

import React from 'react';


const Children1 =()=>(<div>Children1</div>)
const Children2 =()=>(<div>Children2</div>)

const WarningBanner =({warn})=>{
  if(!warn){
    return ''
  }
  return <h4>这里是这是 WarningBanner 组件</h4>
}

export default class Study4 extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      type:false
    };
  }

  toggleType(e){
    this.setState((state)=>({
      type:!state.type
    }))
  };

  render(){
    const type  = this.state.type;
    const Child = type ? <Children1/> : <Children2/>;
    
    return <div>
      <h1> 条件渲染 </h1>
      <br/>
      <hr/>
      <br/>
      <button onClick={(e)=>{this.toggleType(e)}}> 点击按钮切换组件 </button>
      <br/>
      <ul>
        <li>
          <h3>1: 使用 元素变量 进行条件渲染</h3>
          {Child}
        </li>
        <li>
          <h3>2: 使用 与运算符 && 进行条件渲染</h3>
          { this.state.type && <Children1/> }
          { !this.state.type && <Children2/> }
        </li>
        <li>
          <h3>3: 使用 三目运算符 && 进行条件渲染</h3>
          { this.state.type ? <Children1/> : <Children2/> }
        </li>
        <li>
          <h3>4: 使用 阻止组件渲染 && 进行条件渲染</h3>
          <WarningBanner warn={this.state.type} />
        </li>
      </ul>
    </div>
  }
}