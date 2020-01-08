/*
 * @Author: mcdowell
 * @Date: 2020-01-06 19:34:39
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-08 11:34:08
 */
import React from 'react';
require('./Dialog.css');

const Dialog=({visible, children, title, message})=>{
  return (
    visible &&
    <div  className="Dialog">
      <div className="text-center">
        {
          !children?
        <>
          <h1 className="Dialog-title">
            {title}
          </h1>
          <p className="Dialog-message">
            {message}
          </p>
        </>
        :
        children
        }
      </div>
    </div>
  )
};

const TestP =()=>{
  return <p>测试 p 标签</p>
};

export default class study8 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible1:false,
      visible2:false
    }
  }

  openDialog({name}){
    this.setState((state)=>({[name]:!state[name]}))
  };

  render (){
    return <div>
      <h1>组合 vs 继承</h1>
      <br/>
      <hr/>
      <br/>
      <button className="dialog-btn" onClick={()=>{this.openDialog({name:'visible1'})}}>
        包含关系 - Dialog
      </button>
      <Dialog visible={this.state.visible1}>
        包含关系-嵌套-测试
        <TestP/>
      </Dialog>

      <br/>
      <hr/>
      <br/>
      
      <button className="dialog-btn" onClick={()=>{this.openDialog({name:'visible2'})}}>
        特例关系
      </button>
      <Dialog visible={this.state.visible2} title="Welcome" message="欢迎测试"></Dialog>


    </div>
  }
}