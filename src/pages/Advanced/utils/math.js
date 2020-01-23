function add(...arr){
  // console.log(arguments,'arguments',arr)
  if(arr.length<=1){
    return 0
  }
  return arr.reduce((accumulator, currentValue) => (accumulator + currentValue),0)
}
function reduce (){
  if(arguments.length<=1){
    return 0
  }
  return arguments.reduce((accumulator, currentValue) => (accumulator - currentValue),0)
}

export { add, reduce };