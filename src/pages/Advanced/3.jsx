/*
 * @Author: mcdowell
 * @Date: 2020-01-17 11:37:58
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-23 08:16:01
 */
// eslint-disable-next-line 
import React from 'react';
import { Btn } from './component/BasicUI';

/* 普通传值方式 */
class ThemedButton extends React.Component{
  render(){
    const { theme = 'default', children } = this.props;
    const themeJson = {
      'bigHot':{type:'danger',size:'l'},
      'smallBlue':{type:'info',size:'s'},
      'default':{type:'default',size:'l'}
    }
    return <Btn {...themeJson[theme]} >{children}</Btn>
  }
}

const PageBar=({ theme })=>{
  return <div>
    <ThemedButton theme={theme} >上一页</ThemedButton>
    <ThemedButton theme={theme} >下一页</ThemedButton>
  </div>
}

/* context 传值方式 */
// 使用全局方式 设置 ThemeContext
const ThemeContext = React.createContext('default');

class ThemedButtonOne extends React.Component{
  static  contextType = ThemeContext;
  render(){
    const { children } = this.props;
    const themeJson = {
      'bigHot':{type:'danger',size:'l'},
      'smallBlue':{type:'info',size:'s'},
      'default':{type:'default',size:'l'}
    }
    return <Btn {...themeJson[this.context]} >{children}</Btn>
  }
}

const PageBarOne=({ theme })=>{
  return <div>
    <ThemedButtonOne theme={theme} >上一页</ThemedButtonOne>
    <ThemedButtonOne theme={theme} >下一页</ThemedButtonOne>
  </div>
}


/* 不借助 context 的最佳实践 */
const PageLayout =({pageBtns,pageTitle})=>{
  return (<div style={{background:'red'}}>
    { pageTitle }
    {/* 类似children 的用法 */}
    { pageBtns }
  </div>)
};
const Page=({ theme,title,info })=>{
  const PageTitle = (
    <>
      <h1>{title}</h1>
      <p>{info}</p>
    </>
  );
   
  const PageBtns =  (<div>
      <ThemedButton theme={theme} >上一页</ThemedButton>
      <ThemedButton theme={theme} >下一页</ThemedButton>
    </div>)
  
  return <PageLayout pageBtns={PageBtns} pageTitle={PageTitle} />;
};

export default class  CodeDivision extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (<div>
        <h1>Context</h1>
        <br/>
        <hr/>
        <p>
          Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。
        </p>
        <br/>
        <h2>何时使用 Context</h2>
        <p> 普通手动传值</p>
        <PageBar theme="bigHot"/>
        <p>使用 context</p>
        {/* <BtnCss2 size='m'>使用 context</BtnCss2> */}
        <PageBarOne/>
        {/* 使用局部方式 context */}
        <ThemeContext.Provider value="smallBlue">
          <PageBarOne/>
        </ThemeContext.Provider>
        <br/>
        <h2>使用 Context 之前的考虑</h2>
        <br/>
        <p>Context 主要应用场景在于<b>很多不同层级的组件需要访问同样一些的数据</b>。请谨慎使用，因为这会使得组件的<i>复用性变差</i>。</p>
        
        <h2>无需 context 的解决方案</h2>
        <p>无需 context 的解决方案是将 最终组件 自身传递下去，因而中间组件无需知道 最终组件的props</p>

        <Page theme="smallBlue" title="这是测试标题" info="测试副标题"/>

        <h2></h2>
        
    </div>)
  }
}