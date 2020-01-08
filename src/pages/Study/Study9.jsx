/*
 * @Author: mcdowell
 * @Date: 2020-01-07 14:28:14
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-08 11:40:12
 */
import React from 'react';


const SearchBar = ({searchName='', isStocked=false, callBackInput=()=>{}, callBackCheckbox=()=>{}})=>{
  return (
    <div>
      <input type="text" placeholder="Search..." value={searchName} onChange={callBackInput} />
      <p>
        <label>
          <input type="checkbox" value={isStocked} onChange={callBackCheckbox}  />
          {' '}
          Only show products in stock
        </label>
      </p>
    </div>
  )
}

const ProductCategoryRow =({title})=>{
  return <tr>
          <td colSpan="2" >{title} </td>
        </tr>
};

const ProductRow = ({ name ,price ,stocked })=>{
  return <tr>
          <td style={{color:stocked?'red':'#ccc'}}>{name}</td>
          <td>{price}</td>
        </tr>
};

const ProductTable = ({dataList =[], searchName, isStocked })=>{
  let lastCategory = null;
  const rows = []
  dataList.map(item=>{
    if(searchName && item.name.indexOf(searchName) === -1){
      return ''
    }
    if(isStocked && !item.stocked){
      return ''
    }
    if(item.category!==lastCategory){
      rows.push(<ProductCategoryRow title={item.category} key={`${item.name}_key`}/>);
    }
    rows.push(<ProductRow {...item} key={item.name}/>);
    lastCategory = item.category;
    return ''
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
};

class FilterableProductTable extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      searchName:'', 
      isStocked:false
    }
  }

  setSearchName(e){
    const searchName = e.target.value;
    this.setState({searchName});
    console.log(searchName,'setSearchName')
  };

  setIsStocked(e){
    const isStocked = e.target.value;
    console.log(isStocked,'isStocked');
    this.setState((state)=>({isStocked:!state.isStocked}));
  };

  render (){
    const { dataList } = this.props;
    const { searchName, isStocked } = this.state;
    return (
      <div>
        {/* 检索组件 */}
        <SearchBar 
          searchName={searchName} 
          isStocked={isStocked} 
          callBackInput={(e)=>this.setSearchName(e)}
          callBackCheckbox={(e)=>this.setIsStocked(e)}
        />
        {/* 内容组件 */}
        <ProductTable 
          dataList={dataList} 
          searchName={searchName} 
          isStocked={isStocked} 
        />
      </div>
    )
  }
}



export default class Study9 extends React.Component{
  constructor (props){
    super(props);
    this.state = {}
  }

  render (){

    const PRODUCTS = [
      {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
      {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
      {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
      {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
      {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
      {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
    ];

    return (
      <div>
        <h1>React 哲学</h1>
        <br/>
        <hr/>
        <br/>
        <div>
        {/* 
          FilterableProductTable (橙色): 是整个示例应用的整体
          SearchBar (蓝色): 接受所有的用户输入
          ProductTable (绿色): 展示数据内容并根据用户输入筛选结果
          ProductCategoryRow (天蓝色): 为每一个产品类别展示标题
          ProductRow (红色): 每一行展示一个产品 
        */}
        <h2>实现 react doc  示例</h2>
        <br/>
        <FilterableProductTable dataList={PRODUCTS} />
        </div>
        <br/><br/><br/>
        <h2> 步骤 </h2>
        <h3>第一步：将设计好的 UI 划分为组件层级</h3>
        <br/>
        <h3>第二步：用 React 创建一个静态版本</h3>
        <p>先用已有的数据模型渲染一个不包含交互功能的 UI。最好将渲染 UI 和添加交互这两个过程分开。</p>
        <p>React 单向数据流（也叫单向绑定）的思想使得组件模块化,易于快速开发。可以自上而下或者自下而上构建应用</p>
        <br/>
        <h3>第三步：确定 UI state 的最小（且完整）表示</h3>
        <h4>通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：</h4>
        <br/>
        <p>
          1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。<br/>
          2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。<br/>
          3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。
        </p>
        <br/>
        <h3>第四步：确定 state 放置的位置</h3>

        <h4>React 中的数据流是单向的，并顺着组件层级从上往下传递。</h4> 
        <p>
          1. 找到根据这个 state 进行渲染的所有组件。<br/>
          2. 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。<br/>
          3. 该共同所有者组件或者比它层级更高的组件应该拥有该 state。<br/>
          4. 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，
          并将这一新组件置于高于共同所有者组件层级的位置。
        </p>
        

      </div>
    )
  }
}