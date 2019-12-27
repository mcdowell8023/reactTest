/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-27 19:26:24
 * @description: 头部组件
 */
import React from 'react';
// import logo from "../../public/logo.svg";

export default function header(proprs) {
  const { title } = proprs;
  return (
    <header className="App-header">
      {/* <img src={logo} alt=""/> */}
      <h1>
        <span className="App-logo" role="img" >🚀</span>
        { title }
      </h1>
    </header>
  );
}

// export default header;