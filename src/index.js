/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:22:46
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-27 19:51:22
 * @description: 这里应该 作为 项目 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import Layout from './pages/Layout';
import Main from './component/Main';
import routes from './route';

import './App.css';

function App(proprs) {

  return (
    <Router>
      <Layout routes={routes}>
        {/* <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.component route />}
            />
          ))}
        </Switch> */}
        <Main {...{routes:routes}}/>
      </Layout>
  </Router>
  );
};



ReactDOM.render(<App/>, document.getElementById('root'));
