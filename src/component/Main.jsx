/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-16 16:30:27
 * @description: 内容组件  模块 路由复用
 */
import React,{ Suspense } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
export default function Main(props) {
  const {routes}= props;
  return (
    <Suspense fallback={<div>Loading...</div>}>

    
      <Switch>
      {Array.isArray(routes) && routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props => (<route.component {...props}  route />)}
            // render={props => lazy(<route.component {...props}  route />)}
          />
        ))}
      </Switch>
    </Suspense>
  );
};