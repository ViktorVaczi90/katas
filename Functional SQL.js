var query = function() {
  return{data: [], propety: i=>i, wFilter: [[i=>true]], group: undefined, order: undefined, hFilter:[[i=>true]],
    error:false,
    select, from, where, orderBy, groupBy, having, execute}
};
function generateErrorFunction(errorStr){
  return function(){
    throw new Error(errorStr)
  }
}
function groupData(groupingFunctions = [], data){
  const currentGroupingFunction = groupingFunctions[0]
  const remainingGroupingFunctions = groupingFunctions.slice(1,groupingFunctions.length)
  const groupedData =  data.reduce((acc,curr)=>{
    if(!groupingFunctions.length) return acc.concat([curr])
    acc.filter(i=>i[0]===currentGroupingFunction(curr)).length
      ?acc.filter(i=>i[0]===currentGroupingFunction(curr))[0][1].push(curr)
      :acc.push([currentGroupingFunction(curr),[curr]])
    return acc},[])
  return remainingGroupingFunctions.length
    ?groupedData.map(i=>[i[0],groupData(remainingGroupingFunctions,i[1])])
    :groupedData
}
function select(propety)      {return Object.assign({},this,{propety: propety?propety:this.propety, select:   generateErrorFunction.bind(this)('Duplicate SELECT')})}
function from(...data)        {return Object.assign({},this,{data: data.length>1
  ? data[0].map(i=>data[1].map(ii=>[i,ii])).reduce((acc,curr)=>acc.concat(curr),[])
  :data[0],                                                                                         from:     generateErrorFunction.bind(this)('Duplicate FROM')})}
function where(...wFilter)     {return Object.assign({},this,{wFilter: this.wFilter.concat([wFilter])})}
function orderBy(order)       {return Object.assign({},this,{order: order?order:this.order,         orderBy:  generateErrorFunction.bind(this)('Duplicate ORDERBY')})}
function groupBy(...group)    {return Object.assign({},this,{group: group?group:this.group,         groupBy:  generateErrorFunction.bind(this)('Duplicate GROUPBY')})}
function having(...hFilter)      {return Object.assign({},this,{hFilter: this.hFilter.concat([hFilter])})}

function execute(){
  const retVal = groupData(this.group,
    this.data
      .filter(i=>this.wFilter.reduce((andAcc,orFilters)=>andAcc && orFilters.reduce((acc,curr)=>curr(i) || acc,false),true)))
    .filter(i=>this.hFilter.reduce((andAcc,orFilters)=>andAcc && orFilters.reduce((acc,curr)=>curr(i) || acc,false),true))
    .map(this.propety)
    return this.order?retVal.sort(this.order):retVal}