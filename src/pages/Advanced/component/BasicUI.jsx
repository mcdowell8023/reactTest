/*
 * @Author: mcdowell
 * @Date: 2020-01-17 16:12:07
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-17 16:14:37
 */
import React from 'react';
// 基础组件

// 按钮
export class Btn extends React.Component{
  render (){
    const { children,type='default',size='l' } = this.props;
    const typeJson = {
      'success':{background:'green',color:'#fff'},
      'danger':{background:'red',color:'#fff'},
      'info':{background:'#61dafb',color:'#fff'},
      'default':{background:'#fff',color:'#333'}
    }
    const styleCss ={
      'l':{fontSize:'22px',padding:'15px 18px'},
      'm':{fontSize:'16px',padding:'10px 12px'},
      's':{fontSize:'12px',padding:'5px 8px'},
    }
  return <button style={{...styleCss[size],...typeJson[type]}} >{children}</button>
  }
} 