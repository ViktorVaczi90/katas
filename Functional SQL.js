var query = function() {
  return{data: [], propety: i=>i, filter: [i=>true], group: undefined, order: undefined, hFilter:[i=>true],
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
function from(...data)        {return Object.assign({},this,{data: data.length>1?data:data[0],      from:     generateErrorFunction.bind(this)('Duplicate FROM')})}
function where(...filter)     {return Object.assign({},this,{filter: filter?filter:this.filter,     where:    generateErrorFunction.bind(this)('Duplicate WHERE')})}
function orderBy(order)       {return Object.assign({},this,{order: order?order:this.order,         orderBy:  generateErrorFunction.bind(this)('Duplicate ORDERBY')})}
function groupBy(...group)    {return Object.assign({},this,{group: group?group:this.group,         groupBy:  generateErrorFunction.bind(this)('Duplicate GROUPBY')})}
function having(hFilter)      {return Object.assign({},this,{hFilter: hFilter?this.hFilter.concat(hFilter):this.hFilter})}

function execute(){
  const retVal = groupData(this.group,
    this.data
      .filter(i=>this.filter.map(f=>f(i)).reduce((acc,curr)=>acc || curr )))
    .filter(i=>this.hFilter.map(f=>f(i)).reduce((acc,curr)=>acc && curr ))
    .map(this.propety)
    return this.order?retVal.sort(this.order):retVal}

var persons = [
  {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
  {name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single'},
  {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
  {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married'},
  {name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married'},
  {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single'},
  {name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married'}
];
function profession(person) {
  return person.profession;
}
function name(person) {
  return person.name;
}
function isTeacher(person) {
  return person.profession === 'teacher';
}
function naturalCompare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
function id(value) {
  return value;
}
function greatThan1(group) {
  return group[1].length > 1;
}

function isPair(group) {
  return group[0] % 2 === 0;
}
function frequency(group) {
  return { value: group[0], frequency: group[1].length };
}
var numbers = [1, 2, 1, 3, 5, 6, 1, 2, 5, 6];
// let retval = query()
// //retval = retval.select(profession)
// //retval = retval.select(profession)
// retval = retval.from(persons)
// //retval = retval.where(isTeacher)
// retval = retval.groupBy(profession, name).orderBy(naturalCompare)
// retval = retval.execute()
console.log(query().select(frequency).from(numbers).groupBy(id).having(greatThan1).having(isPair).execute())