/*
 * @Author: mcdowell
 * @Date: 2020-01-08 15:30:11
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-08 15:52:21
 */
import React from 'react';

export default class ClickSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = { isOpen:false };

    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onClickHandler(){
    console.log('打开');
    this.setState({isOpen:true});
  };

  componentWillMount(){
    console.log('生命周期');
    window.addEventListener('click',this.onCloseHandler);
  };
  componentWillUnmount(){
    window.removeEventListener('click',this.onCloseHandler);
  };
  
  onCloseHandler(event){
    // 是否 点击到 组件里面
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      console.log('关闭');
      this.setState({isOpen:false});
    }
  };

  render(){
    return (
      <div ref={this.toggleContainer} style={{background:'#ccc'}}>
        <button onClick={this.onClickHandler} >selsect option</button>
        {this.state.isOpen && (
        <div>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>)
        }
      </div>
    )
  }
}