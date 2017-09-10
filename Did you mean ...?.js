/**
 * Created by v on 7/7/17.
 */
function Dictionary(words) {
  this.words = words;
}

function wordDistanceFast(firstWord,secondWord){
  let wordMatrix = Array.from(Array(firstWord.length + 1)).map(i=>Array.from(Array(secondWord.length + 1)).map(i=>0))
  wordMatrix[0] = wordMatrix[0]
    .map((item,index)=>index)
    wordMatrix.map((item,index)=>item[0]=index)
  for(let column = 1; column < wordMatrix[0].length;column++){
    for(let row = 1; row < wordMatrix.length;row++){
      wordMatrix[row][column] = Math.min.apply(null,[
        wordMatrix[row-1][column] + 1,
        wordMatrix[row][column-1] + 1,
        wordMatrix[row-1][column-1] + ((firstWord[row-1] === secondWord[column-1])?0:1)
      ])
    }
  }
  return wordMatrix[firstWord.length][secondWord.length]
}
function wordDistance(firstWord,secondWord){
  let cost;
  if(!firstWord.length) return secondWord.length;
  if(!secondWord.length) return firstWord.length;
  if(firstWord[firstWord.length-1] === secondWord[secondWord.length-1])
    cost = 0;
  else
    cost = 1;
  return [
    wordDistance(firstWord,secondWord.substr(0,secondWord.length -1)) + 1,
    wordDistance(firstWord.substr(0,firstWord.length -1),secondWord) + 1,
    wordDistance(firstWord.substr(0,firstWord.length -1),secondWord.substr(0,secondWord.length -1)) + cost
  ].reduce((acc,curr)=>curr<acc?curr:acc)
}
Dictionary.prototype.findMostSimilar = function(term) {
  let distances = this.words.map(item=>wordDistanceFast(term,item))
  return this.words[distances.indexOf(distances.reduce((acc,curr)=>curr<acc?curr:acc))]
}