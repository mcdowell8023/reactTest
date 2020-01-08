/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-06 15:19:39
 */

import React from 'react';

export default class Study6 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      remarks:'',
      sex:1,
      like:['grapefruit','mango']
    };
  }


  changeName=(e)=>{
    const val = e.target.value;
    console.log(val,'name')
    this.setState({name:val});
  };
  changeRemarks=(e)=>{
    const val = e.target.value;
    console.log(val,'remarks')
    this.setState({remarks:val});
  };
  changeSelect=(e)=>{
    const val = e.target.value;
    console.log(val,'sex')
    this.setState({sex:val});
  };

  changeLike=(e)=>{
    const val = e.target.value;
    console.log(val,'like')
    this.setState((stste)=>({like:[...stste.like,val]}))
  };

  submitClick=(e)=>{
    e.preventDefault();

    console.log('表单提交',this.state)
  }

  render(){
    return <div>
      <h1>表单</h1>
      <br/>
      <hr/>
      <br/>
      <h2>受控表单</h2>
      <p>渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。</p>
      <br/>
      <form action="/" onSubmit={this.submitClick}>
        <label>
          名字：
          <input type="text" value={this.state.name} onChange={this.changeName} />
        </label>

        <label>
          备注：
          <textarea value={this.state.remarks} onChange={this.changeRemarks} />
        </label>
        
        <label>
          性别：
          <select value={this.state.sex} onChange={this.changeSelect}>
            <option value={1}>男</option>
            <option value={2}>女</option>
          </select>

        </label>
        <label>
          爱好：
          <select multiple={true} value={this.state.like} onChange={this.changeLike} >
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>

        <label>
          非受控组件--上传：
          <input type="file" />
        </label>
        <br/>
        {/* multiple={true} value={['B', 'C']} */}
        <button> --提交按钮--</button>
      </form>


    </div>
  }

}