/*
 * @Author: mcdowell
 * @Date: 2020-01-08 13:35:43
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-08 17:02:47
 */
import React,{ Fragment }  from "react";

import ClickSelect from "./component/ClickSelect";
import BlurSelect from "./component/BlurSelect";

function Glossary({list=[]}) {
  return (
    <dl>
      {list.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.name}</dt>
          <dd>{item.des}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

function ListItem({data}) {
  return (
    <>
      <dt>{data.name}</dt>
      <dd>{data.des}</dd>
    </>
  );
}

const RefInput = ({refInput})=>{
  return (
    <>
      <input type="text" ref={refInput}/>
    </>
  );
};

export default  class Advanced1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {};

    this.textInput = React.createRef();
  }

  setFocus(){
    console.log(this.textInput.current,'ref textInput');
    this.textInput.current.focus();
  };

  render(){
    const dataList =[{id:1,name:'抖音',des:'小视频类'},{id:2,name:'王者荣耀',des:'竞技类'}];
    return (
    <div>
      <h1>无障碍--常见部分</h1>
      <br/>
      <hr/>
      <h2>WAI-ARIA [HTML5中的aria与role](https://blog.csdn.net/dearcode/article/details/52218689)</h2>
      <p>
      网络无障碍倡议 - 无障碍互联网应用（Web Accessibility Initiative - Accessible Rich Internet Applications） 文件包含了创建完全无障碍 JavaScript 部件所需要的技术。
      </p>
      <p>
      注意：JSX 支持所有 aria-* HTML 属性。虽然大多数 React 的 DOM 变量和属性命名都使用驼峰命名（camelCased），但 aria-* 应该像其在 HTML 中一样使用带连字符的命名法（也叫诸如 hyphen-cased，kebab-case，lisp-case)。
      </p>
      <br/>
      <hr/>
      <br/>

      <h2>语义化的 HTML 【使用 Fragment 】</h2>

      <div>
        <h3>需 props 时 使用 Fragment 标签 渲染列表</h3>
        <Glossary list={dataList}/>
      </div>
      <br/>
      <div>
        <h3>不需 props 时 使用 短语法 渲染列表  </h3>
        {dataList.map(item => (<ListItem key={item.id} data={item} />))}
      </div>
      <br/>
      <hr/>
      <br/>

      <h2> 修改程序焦点 </h2>
      <div>
        <h3>借助 label  htmlFor 焦点</h3>
        <label htmlFor="namedInput">Name:</label>
        <input id="namedInput" type="text" name="name"/>
      </div>
      <br/>
      <div>
        <h3>借助 ref 操作 焦点</h3>
        <p onClick={()=>this.setFocus()}>点击input 获得焦点</p>
        <RefInput refInput={this.textInput}/>
      </div>
      <h2> 鼠标和指针事件 【使用onBlur 和 onFocus 代替 事件委托 实现 点击空白 关闭】 </h2>
      <h3>全局事件委托</h3>
      <ClickSelect/>
      <br/>
      <h3>onBlur 和 onFocus 代替</h3>
      <BlurSelect/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    )
  }
}