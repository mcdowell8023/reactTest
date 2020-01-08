/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-03 19:06:37
 */

import React from 'react';

const ChildrenList =(list)=>list.map((item,index)=><li key={index.toString()}>{item}</li>)

const ChildrenUl = ({list})=>{
  return <ul>{ChildrenList(list)}</ul>
}

const ListItem =({data})=><li><h3>{data.title}</h3><p>{data.content}</p></li>;

export default class Study5 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list :[1,2,3,4,5],
      dataList : [
        {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
        {id: 2, title: 'Installation', content: 'You can install React from npm.'}
      ]
    };
  }

  render (){
    const { list } = this.state;
    return <div>
      <h1>列表 & Key</h1>
      <br/>
      <hr/>
      <br/>
      <h2>1:渲染多个组件</h2>
      <ul>
        {ChildrenList(list)}
      </ul>

      <h2>2:基础列表组件</h2>
      <ChildrenUl {...this.state} />

      <h2>3:map遍历组件</h2>
      <ul>
        {
          this.state.dataList.map(item=><ListItem key={item.id} data={item}/>)
        }
      </ul>
      <h2>如果一个 map() 嵌套了太多层级，那可能就是你提取组件的一个好时机</h2>
      
    </div>
  }
}