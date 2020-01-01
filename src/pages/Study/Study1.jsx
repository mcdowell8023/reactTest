/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-30 21:56:44
 * @description: layout 布局组件
 */
import React from 'react';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function SayHello(props){
return <h2>hello,{props.name}!</h2>
}

function Study1(proprs) {
  const name = 'Josh Perez';
  const element = <h2>Hello, {name}</h2>;

  return (
    <div className="study-list">
      <h1>组件 & Props</h1>
      <br/>
      <hr/>
      <ol>
        <li>{element}</li>
        <li>{formatName({firstName:'姓',lastName:'名字'})}</li>
      </ol>
      <br/>

      <h1>SayHello 组件使用</h1>
      <SayHello name="hanmeimei" />
      <SayHello name="lilei" />

    </div>
  );
}

export default Study1;
