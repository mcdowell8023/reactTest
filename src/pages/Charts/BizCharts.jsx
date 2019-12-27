import React from 'react';
// import * as BizCharts from "bizcharts";

// import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import Chart from 'bizcharts/lib/components/Chart';
import Axis from 'bizcharts/lib/components/Axis';
import Legend from 'bizcharts/lib/components/Legend';
import Tooltip from 'bizcharts/lib/components/Tooltip';
import Line from 'bizcharts/lib/components/TypedGeom/Line';


import Slider from 'bizcharts-plugin-slider';


import DataSet from '@antv/data-set';

import { lineData } from './data';






// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};
// const timeScale = {
//   type: 'time',
//   tickInterval: 60 * 60 * 1000, // 坐标轴间距 60 分 60秒 1000 ms
//   mask: 'HH:mm',
//   range: [0, 1],
// };
const padding = [60, 20, 40, 40];
const titleMap = {

};

export default class Charts extends React.Component{
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }


  render(){
    const data =  lineData && Array.isArray(lineData)?lineData:[{value: 10, time: '2015-03-01T16:00:00.000Z' },{ value: 22, time: '2015-03-01T17:20:00.000Z' }]

    const ds = new DataSet({
      state:{
        start: data[0].time,
        end: data[data.length - 1].time,
      }
    }); 

    // step2 创建 数据视图 DataView 
    const dv = ds.createView(); 

    // const dv = new View(); 
    // step3 数据连接
    dv.source(data);
    // step4 数据转换处理
    dv.transform({
      type: 'filter',
      callback: obj => {
        const date = obj.x;
        return date <= ds.state.end && date >= ds.state.start;
      },
    })
    .transform({
      type: 'map',
      callback(row) {
        const newRow = { ...row };
        console.log()
        newRow[titleMap.y1] = row.y1;
        newRow[titleMap.y2] = row.y2;
        return newRow;
      },
    })
    // .transform({
    //   type: 'fold',
    //   fields: [titleMap.y1, titleMap.y2], // 展开字段集
    //   key: 'key', // key字段
    //   value: 'value', // value字段
    // });

    console.log(ds,'ds---',ds.isDataSet === true,ds.view,ds.state);
    return (
      <div>
        <Chart width={600} height={400} data={data} scale={cols}>
          <Axis name="genre" title/>
          <Axis name="sold" title/>
          <Legend position="top" dy={-20} />
          <Tooltip />
          {/* <Geom type="interval" position="genre*sold" color="genre" /> */}

          <Line position="time*value" color="genre"/>
        </Chart>

        <Slider
          padding={[0, padding[1] + 20, 0, padding[3]]}
          width="auto"
          height={26}
          xAxis="x"
          yAxis="y1"
          scales={cols}
          data={data}
          start={ds.state.start}
          end={ds.state.end}
          backgroundChart={{ type: 'line' }}
          onChange={({ startValue, endValue }) => {
            console.log(startValue, endValue,'startValue, endValue')
            ds.setState('start', startValue);
            ds.setState('end', endValue);
          }}
        />
      </div>
      

    )
  }
}




// export default function Charts(props){



//   return (
    // <Chart width={600} height={400} data={data} scale={cols}>
    //   <Axis name="genre" title/>
    //   <Axis name="sold" title/>
    //   <Legend position="top" dy={-20} />
    //   <Tooltip />
    //   <Geom type="interval" position="genre*sold" color="genre" />
    // </Chart>
//   )
  
// }