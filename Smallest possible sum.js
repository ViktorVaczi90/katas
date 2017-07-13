/**
 * Created by v on 7/6/17.
 */
function solution(numbers) {
  let ending = numbers;
  while (ending.length !== 1) {
    let smallest = Math.min.apply(null, ending);
    ending = Array.from(new Set(ending.map(i=> i === smallest ? i : i % smallest).filter(i=>i)));
  }
  return ending[0] * numbers.length
}
