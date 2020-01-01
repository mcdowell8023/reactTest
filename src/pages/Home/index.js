
import React from 'react';

const hellHome=()=>(
  <h1 className="text-red">你好，这是home页面</h1>
);

const hellHomeCreat =()=>React.createElement(
  'h1',
  {className:'text-red'},
  '你好，这是home页面(使用createElement)'
);

export default ()=>{
  return(
   <div>
     {hellHome()}
     {hellHomeCreat()}
   </div> 
  )
};