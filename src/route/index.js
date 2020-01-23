
import React,{ lazy } from 'react';

import { Redirect } from "react-router-dom";
import Main from '../component/Main';

import Home from '../pages/Home/index';
import Error from '../pages/Error';

import BizCharts from '../pages/Charts/BizCharts';
import G2Charts from '../pages/Charts/G2Charts';

import Study1 from '../pages/Study/Study1';
import Study2 from '../pages/Study/Study2';
import Study3 from '../pages/Study/Study3';
import Study4 from '../pages/Study/Study4';
import Study5 from '../pages/Study/Study5';
import Study6 from '../pages/Study/Study6';
import Study7 from '../pages/Study/Study7';
import Study8 from '../pages/Study/Study8';
import Study9 from '../pages/Study/Study9';

// react lazy 懒加载
// import Advanced1 from '../pages/Advanced/1';
const Advanced1 = lazy(()=>import('../pages/Advanced/1'));
// import Advanced2 from '../pages/Advanced/2';
const Advanced2 = lazy(()=>import('../pages/Advanced/2'));
const Advanced3 = lazy(()=>import('../pages/Advanced/3'));






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
    component: () => <Home />
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
      },
      {
        path: "/study/3",
        name:'学习3',
        component: () => <Study3/>,
      },
      {
        path: "/study/4",
        name:'学习4',
        component: () => <Study4/>,
      },
      {
        path: "/study/5",
        name:'学习5',
        component: () => <Study5/>,
      },
      {
        path: "/study/6",
        name:'学习6',
        component: () => <Study6/>,
      },
      {
        path: "/study/7",
        name:'学习7',
        component: () => <Study7/>,
      },
      {
        path: "/study/8",
        name:'学习8',
        component: () => <Study8/>,
      },
      {
        path: "/study/9",
        name:'学习9',
        component: () => <Study9/>,
      }
    ]
  },
  {
    path: "/Advanced",
    name:'高级进阶',
    component: (props)=> {
      return setRouteView(props,'/Advanced/1');
    },
    children:[
      {
        path: "/Advanced/1",
        name:'无障碍',
        component: () => <Advanced1/>,
      },
      {
        path: "/Advanced/2",
        name:'分割代码',
        component: () => <Advanced2/>,
      },
      {
        path: "/Advanced/3",
        name:'context',
        component: () => <Advanced3/>,
      }
    ]
  },
  {
    path: "*",
    component: () => <Error />
  }
];

export default routers;