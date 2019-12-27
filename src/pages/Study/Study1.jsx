/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-27 19:26:52
 * @description: layout 布局组件
 */
import React from 'react';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function Study1(proprs) {
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;

  return (
    <div className="study-list">
      <ol>
        <li>{element}</li>
        <li>{formatName({firstName:'姓',lastName:'名字'})}</li>
      </ol>
    </div>
  );
}

export default Study1;
