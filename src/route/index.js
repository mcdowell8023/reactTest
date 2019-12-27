
import React from 'react';

import { Redirect } from "react-router-dom";
import Main from '../component/Main';

import BizCharts from '../pages/Charts/BizCharts';
import G2Charts from '../pages/Charts/G2Charts';

import Study1 from '../pages/Study/Study1';
import Study2 from '../pages/Study/Study2';


import Error from '../pages/Error';

const getRouteChildren = (props,routers)=>{
  const { match }=props;
  const _this = routers.find((item)=>item.path===match.path);
  return _this.children&& Array.isArray(_this.children)?_this.children:[];
}

// react-router-dom 
// 借助函数 复用 Main 组件 实现路径 跳转 切换视图
const setRouteView = (props,redirect)=> {
  const { match, location }=props;
  return (
    location.pathname!== match.path
    ?
    <Main routes={getRouteChildren(props,routers)} /> 
    :
    <Redirect
      to={{
        pathname: redirect,
        state: { from: location }
      }}
    />
  )
};


const routers= [
  {
    path: "/",
    exact: true,
    name:'这是主页',
    component: () => <h2>Home</h2>
  },
  {
    path: "/charts",
    name:'G2图表',
    children:[
      {
        path: "/charts/g2",
        name:'学习g2',
        component: G2Charts,
      },
      {
        path: "/charts/biz",
        exact: true,
        name:'学习biz',
        component: BizCharts,
      },
      
    ],
    component: (props)=> {
      return setRouteView(props,'/charts/g2');
    },
  },
  {
    path: "/study",
    name:'学习目录',
    component: (props)=> {
      return setRouteView(props,'/study/1');
    },
    children:[
      {
        path: "/study/1",
        name:'学习1',
        component: ()=> <Study1/>,
      },
      {
        path: "/study/2",
        name:'学习2',
        component: () => <Study2/>,
      }
    ]
  },
  {
    path: "*",
    component: () => <Error />
  }
];

export default routers;