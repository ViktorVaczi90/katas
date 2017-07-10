/**
 * Created by v on 7/7/17.
 */
function damagedOrSunk (board, attacks){
  let resultArr = Array.from(Array(4)).map(i=>({attacks:0,length:0}))
  board.map(row=>row.map(i=>{
      if(i) resultArr[i].length++
  }))
  attacks = attacks.map(attack=>[board.length-attack[1],attack[0]-1])
  attacks.forEach(attack=>{
    if(board[attack[0]][attack[1]]){
      resultArr[board[attack[0]][attack[1]]].attacks++
      board[attack[0]][attack[1]] = 0;
    }
  })
  resultArr.shift();
  let retVal = {sunk:0,damaged:0,notTouched:0,points:0}
  resultArr.map(boat=>{
    if(boat.attacks == boat.length){
      retVal.sunk++;retVal.points++;
    }
    else if (boat.attacks && boat.attacks < boat.length){
      retVal.damaged++; retVal.points += 0.5;
    }
    else{retVal.notTouched++; retVal.points--}
  })
  return retVal
}
var board = [
  [3, 0, 1],
  [3, 0, 1],
  [0, 2, 1],
  [0, 2, 0] ];

var attacks = [[2, 1], [2, 2], [ 3, 2], [3, 3]]
var result = damagedOrSunk(board, attacks)
console.log(result)