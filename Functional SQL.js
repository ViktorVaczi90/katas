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

var teachers = [
  {
    teacherId: '1',
    teacherName: 'Peter'
  },
  {
    teacherId: '2',
    teacherName: 'Anna'
  }
];


var students = [
  {
    studentName: 'Michael',
    tutor: '1'
  },
  {
    studentName: 'Rose',
    tutor: '2'
  }
];

function teacherJoin(join) {
  return join[0].teacherId === join[1].tutor;
}

function student(join) {
  return {studentName: join[1].studentName, teacherName: join[0].teacherName};
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
console.log(query().select(student).from(teachers, students).where(teacherJoin).execute())