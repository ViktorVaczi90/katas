var query = function() {
  return{data: [], propety: i=>i, filter: i=>true, group: undefined,
    error:false,
    select, from, where, orderBy, groupBy, having, execute}
};
function generateErrorFunction(errorStr){
  return function(){
    throw new Error(errorStr)
  }
}
function groupData(groupingFunctions = [], data){

}
function select(propety){return Object.assign({},this, {propety: propety?propety:this.propety, select: generateErrorFunction.bind(this)('Duplicate SELECT')})}
function from(data){return Object.assign({},this, {data, from: generateErrorFunction.bind(this)('Duplicate FROM')})}
function where(filter){return Object.assign({},this, {filter: filter?filter:this.filter, where: generateErrorFunction.bind(this)('Duplicate WHERE')})}
function orderBy(order){return Object.assign({},this, {order, orderBy: generateErrorFunction.bind(this)('Duplicate ORDERBY')})}
function groupBy(...group){return Object.assign({},this, {group: group?group:this.group, groupBy: generateErrorFunction.bind(this)('Duplicate GROUPBY')})}
function having(expression){return Object.assign({},this, {expression, having: generateErrorFunction.bind(this)('having Error')})}
function execute(){
  return this.data
    .filter(this.filter)
    .reduce((acc,curr)=>{
      if(!this.group) return acc.concat([curr])
      acc.filter(i=>i[0]===this.group(curr)).length
      ?acc.filter(i=>i[0]===this.group(curr))[0][1].push(curr)
      :acc.push([this.group(curr),[curr]])
    return acc},[])
    .map(this.propety)}

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
let retval = query()
//retval = retval.select(profession)
//retval = retval.select(profession)
retval = retval.from(persons)
//retval = retval.where(isTeacher)
retval = retval.groupBy(profession)
retval = retval.execute()
console.log(retval)