/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors: mcdowell
 * @LastEditTime: 2019-11-06 15:43:55
 * @description: layout 布局组件
 */
import React from 'react';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import '../../index.css';

function Layout(props) {
  const { children = "Welcome to your Inbox",routes} = props;
  return (
    <div className="App">
      <Header title="React 学习测试项目"/>
      <div className="layout-content">
        <Sidebar menuList={routes}/>
        <div className="layout-main">
        {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
