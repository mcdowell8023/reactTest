/*
 * @Author: mcdowell
 * @Date: 2020-01-08 15:30:11
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-15 15:05:53
 * @ des : (tabindex属性及特殊用法) https://www.zhuyuntao.cn/tabindex%E5%B1%9E%E6%80%A7%E5%8F%8A%E7%89%B9%E6%AE%8A%E7%94%A8%E6%B3%95
 */
import React from 'react'

export default class ClickSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }

    this.timeOutId = null

    this.toggleContainer = React.createRef()
    this.onClickHandler = this.onClickHandler.bind(this)
    // this.onSetFocusHandler = this.onSetFocusHandler.bind(this);

    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler(e) {
    e.preventDefault()
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }))
  }

  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      })
      console.log('执行 关闭')
    }, 100)
  }

  onFocusHandler() {
    clearTimeout(this.timeOutId)
  }
  /*  
    给最外层div 设置  tabIndex="-1" 才可以使 div 获得 焦点事件，进而实现 点击空白隐藏的效果 
    但是 会带来 outline （轮廓），所以需要对应设置 outline: none
  */ 
  render() {
    return (
      <div
        tabIndex="-1"
        style={{ background: 'red', outline: 'none' }}
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
      >
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          selsect option
        </button>
        {this.state.isOpen && (
          <div>
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}
