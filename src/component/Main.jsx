/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-27 19:48:28
 * @description: 内容组件  模块 路由复用
 */
import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
export default function Main(props) {
  const {routes}= props;
  return (
    <Switch>
    {Array.isArray(routes) && routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={props => (<route.component {...props}  route />)}
        />
      ))}
    </Switch>
  );
};