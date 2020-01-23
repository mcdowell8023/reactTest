/*
 * @Author: mcdowell
 * @Date: 2020-01-15 15:06:52
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-17 10:53:22
 */
import React, { Suspense } from 'react'

// import math from './utils/math';

const OtherComponent = React.lazy(() =>import('./component/BlurSelect'));
const AnotherComponent = React.lazy(() => new Promise(resolve =>setTimeout(() => {
  // 模拟ES Module 这个组件故意加载缓慢
  resolve(import('./component/ClickSelect'))
}, 1000)));


const TestComponent = React.lazy(() => import("./utils/defaultCommon"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <AnotherComponent/>
      </Suspense>
    </div>
  )
}

export default class CodeDivision extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      TestOtherComponent:null
    }

    // 动态加载  - 对父组件有侵入性（state.OtherComponent）- 布局抖动体验不佳
    import('./component/ClickSelect').then(({ default: TestOtherComponent }) => {
      console.log(TestOtherComponent,'TestOtherComponent--');
      this.setState({ TestOtherComponent });
    });
  }

  handleClickAdd = (a, b) => {
    // 动态import 将返回一个 promise。 这种使用方式也支持 await 关键字。
    import('./utils/math')
      .then(math => {
        console.log(math, '----')
        alert(math.add(a, b))
      })
      .catch(err => {
        // Handle failure
        console.log('Err：import.then()')
      })
  }

  async handleClickReduce(a,b){

    
    // const mathReduce = await React.lazy(() =>import('./utils/defaultCommon'));
    console.log(MyComponent,'0-0-0-0-0-')
  }

  render() {
    return (
      <div>
        <h1>代码分割</h1>
        <br />
        <hr />
        <br />
        <h2>代码分割、打包</h2>
        <p>
          对应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够
          <i>显著地提高你的应用性能</i>。 尽管并
          <b>没有减少应用整体的代码体积</b>，但你可以
          <b>避免加载用户永远不需要的代码</b>， 并
          <b>在初始加载的时候减少所需加载的代码量</b>
        </p>
        <h3>import()</h3>
        <p>应用中引入代码分割的最佳方式是通过动态 import() 语法</p>
        <div>
          <br />
          <button onClick={() => this.handleClickAdd(16, 26)}>
            {' '}
            test -> import():计算 16 + 26{' '}
          </button>
          <br />
          <p>
            当 Webpack 解析到该语法时，会自动进行代码分割。如果你使用 Create
            React App，该功能已开箱即用
          </p>
          <p>
            当使用 Babel 时，你要确保 Babel 能够解析动态 import
            语法而不是将其进行转换。对于这一要求你需要
            babel-plugin-syntax-dynamic-import 插件。
          </p>
        </div>
        <br />
        <hr />
        <br />
        <h2>React.lazy</h2>
        <div>
          { this.state.TestOtherComponent && <this.state.TestOtherComponent/>}
          <h3>动态组件解决方案：</h3>
          <p>React.lazy 和 Suspense 技术还不支持服务端渲染。</p>
          <p>React.Suspense也是一种虚拟组件（类似于Fragment，仅用作类型标识）</p>
          <p>Suspense子树中只要存在还没回来的Lazy组件，就走fallback指定的内容。[- 支持loading提升(包住最大层组件) -支持loading聚合(包住多个子组件)]</p>
          <p>P.S.没被Suspense包起来的Lazy组件会报错</p>

          <p><b>符合最佳用户体验：</b></p>
          <p> 
            避免布局抖动（数据回来之后冒出来一块内容），当然，这是加loading或skeleton的好处，与Suspense关系不很大
          </p><p>
            区别对待不同网络环境（数据返回快的话压根不会出现loading）
          </p><p>
            优雅：不用再为了加子树loading而提升相关状态和逻辑，从状态提升与组件封装性的抑郁中解脱了
          </p><p>
            灵活：loading组件与异步组件（依赖异步数据的组件）之间没有组件层级关系上的强关联，能够灵活控制loading粒度
          </p><p>
            通用：支持等待异步数据时显示降级组件（loading只是一种最常见的降级策略，fallback到缓存数据甚至广告也不是不可以）
          </p>
          <MyComponent />
          <p>测试站位</p>
          <p>测试站位----</p>

          <h3>命名导出（Named Exports）</h3>
          <p>React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。</p>

          <button onClick={() => this.handleClickReduce(271, 26)}>
            test -> lazy():计算 271 - 26
          </button>
          <TestComponent/>
        </div>
      </div>
    )
  }
}
