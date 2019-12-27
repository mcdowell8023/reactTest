/*
 * @Author: mcdowell
 * @Date: 2019-09-18 11:23:04
 * @LastEditors  : mcdowell
 * @LastEditTime : 2019-12-27 19:27:47
 * @description: 头部组件
 */
import React from 'react'
import {
  Link,useRouteMatch
} from "react-router-dom";

function MenuLink({ children, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      <Link className="App-link" style={ match &&{color:'red'}}  to={to}>{children}</Link>
    </div>
  );
}

// eslint-disable-next-line
export default function Sidebar(proprs) {
  const { menuList }=proprs;
  return (
    <div className="layout-sidebar">
      <ol>
        {
          menuList
          &&
          menuList.map((item,index)=>{
            
            if(item && item.name){
              return(
                <li key={index}>
                  <MenuLink  to={item.path} activeOnlyWhenExact={item.exact}>
                    {item.name}
                  </MenuLink>
                  {
                    Array.isArray(item.children)
                    &&
                    item.children.map((childItem,index)=>(
                      childItem && childItem.name?
                      <div style={{paddingLeft:'20px'}} key={`${index}-${childItem.path}`}>
                        <MenuLink className="App-link"  to={childItem.path} activeOnlyWhenExact={childItem.exact}>
                          {childItem.name}
                        </MenuLink>
                      </div>
                      :''
                    ))
                  }
                </li>
              )
            }
            return ''
          })
        }
        {
          !menuList&&
          // eslint-disable-next-line
          <h4>暂无文章😢</h4>
        }
      </ol>
    </div>
  );
};