/*
 * @Author: mcdowell
 * @Date: 2019-12-27 19:33:35
 * @LastEditors  : mcdowell
 * @LastEditTime : 2020-01-06 19:31:21
 */

import React from 'react';

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


const TemperatureRES =({temperature})=>{
  return temperature >= 100 ? <p>水已经开了</p> : <p>才{temperature}摄氏度，水还没开呢！</p>
}

const TemperatureInput  =({type,temperature,callBack=()=>{}})=>{

  return <label>
          输入{type}温度：<input value={temperature} onChange={(ev)=>callBack({temperature : ev.target.value,type})}/> 
        </label>
}

export default class Study7 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      type:'c',
      temperature: 0
    }
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput({temperature,type}){
    console.log({})
    // {target}
    // const temperature = target.value;
    this.setState({temperature,type});
    // console.log(target.value,'value')
  };

  render(){
    const {temperature, type} = this.state;
    const cNum = type ==='f'?tryConvert(temperature,toCelsius):temperature;
    const fNum = type ==='c'?tryConvert(temperature,toFahrenheit):temperature;

    return <div>
      <h1>状态提升</h1>
      <br/>
      <p>在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。
        通常，state 都是首先添加到需要渲染数据的组件中去。
        然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。
        你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。
        </p><br/><p>
        虽然提升 state 方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，
        排查和隔离 bug 所需的工作量将会变少。
        由于“存在”于组件中的任何 state，仅有组件自己能够修改它，因此 bug 的排查范围被大大缩减了。
        此外，你也可以使用自定义逻辑来拒绝或转换用户的输入。
      </p>
      <br/>
      <hr/>
      <br/>

      <TemperatureInput type="c" temperature={cNum} callBack={this.changeInput} />
      <TemperatureInput type="f" temperature={fNum} callBack={this.changeInput} />

      <TemperatureRES temperature={parseFloat(cNum)}/>
    </div>
  }
  
}