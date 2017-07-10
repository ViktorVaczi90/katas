/**
 * Created by v on 7/6/17.
 */
/*function solution(numbers){
 if(!!numbers.reduce((acc,curr) => acc===curr?curr:NaN)) {console.log(`finished with ${numbers}`);return numbers.reduce((acc,curr)=> acc+curr)}
 let result = numbers.map(number => numbers.slice().map(cmpNumber => [number,cmpNumber]))
 .map(i=> i.filter(numberPair=>numberPair[0]>numberPair[1]).map(numberPair=>numberPair[0]-numberPair[1]))// Create new number pairs
 .map((item,index)=> item.concat([numbers[index]])) //Put back the original numbers
 let numlists = [[]]
 result.forEach(numberListInPosition =>
 numlists = numberListInPosition.map(number =>
 numlists
 .map(item=>item.concat([number])))
 .reduce((acc,curr)=>acc.concat(curr)))
 console.log({numlists,numbers})
 return numlists.map(solution).reduce((acc,curr) => curr<acc?curr:acc)
 }*/
/*function solution(numbers) {
 let smallestNum = Math.min.apply(null, numbers)
 for (let divider = smallestNum; divider > 0; divider = divider == smallestNum ? Math.floor(smallestNum / 2) + 1 : divider - 1) {
 let allIsOK = true;
 for (j = 0; j < numbers.length; j++) {
 if ((numbers[j] % divider)) {
 allIsOK = false;
 //console.log(numbers.length - j)
 break;
 }
 }
 if (allIsOK) return divider * numbers.length
 }
 }*/
function solution(numbers) {
  let ending = numbers;
  while (ending.length !== 1) {
    let smallest = Math.min.apply(null, ending);
    ending = Array.from(new Set(ending.map(i=> i === smallest ? i : i % smallest).filter(i=>i)));
  }
  return ending[0] * numbers.length
}
console.log(solution([6, 9, 21]))