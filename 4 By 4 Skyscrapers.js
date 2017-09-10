/**
 * Created by v on 7/4/17.
 */
const heightPermutations = permutator([1, 2, 3, 4])
let solveRowt = 0;
const solveRow = (clue, possibleHeights) =>{
  if (!clue) return possibleHeights;
  return  heightPermutations
    .filter(permutation=>permutation
      .reduce((acc, val, idx)=>acc && possibleHeights[idx].includes(val),true)) // Filter permutations
    .filter(arr=> rowClue(arr) === clue) // Filter with right clue
    .reduce((acc, currArr)=> {
      return acc.map((item, idx)=>item.add(currArr[idx]))
    }, Array.from(Array(4)).map(i=>new Set()))
    .map(item=>Array.from(item).sort());// Merge solutions

};
const puzzleReady = (puzzle) => {
return puzzle.reduce((acc, row)=> acc &&
    row.reduce((acc, item) => acc && item.length === 1, true)
    , true)
};
const rowClue = (heights) => {
  let currentMax = 0;
  let clue = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > currentMax) {
      currentMax = heights[i];
      clue++;
    }
  }
  return clue;
};

function permutator (inputArr){
  let result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  };
  permute(inputArr)

  return result;
}
const getRowFromPuzzleByClueIndex = (clueIndex, puzzle) => { // Gets row from puzzle
  let retval = [];
  let row;
  let column;
  let deltaRow = 0;
  let deltaColumn = 0;
  if (clueIndex < 4) {
    column = clueIndex;
    row = 0;
    deltaRow = 1
  }
  else if (clueIndex < 8) {
    column = 3;
    row = clueIndex - 4;
    deltaColumn = -1
  }
  else if (clueIndex < 12) {
    column = 11 - clueIndex;
    row = 3;
    deltaRow = -1
  }
  else {
    column = 0;
    row = 15 - clueIndex;
    deltaColumn = 1;
  }
  for (let i = 0; i < 4; i++) {
    retval.push(puzzle[row][column].slice())
    row += deltaRow;
    column += deltaColumn;
  }
  return retval;
};
const mergeSolutionBackToPuzzle = (clueIndex, solution, puzzle) => { // Gives back the new puzzle
  let retPuzzle = puzzle;
  let row;
  let column;
  let deltaRow = 0;
  let deltaColumn = 0;
  if (clueIndex < 4) {
    column = clueIndex;
    row = 0;
    deltaRow = 1
  }
  else if (clueIndex < 8) {
    column = 3;
    row = clueIndex - 4;
    deltaColumn = -1
  }
  else if (clueIndex < 12) {
    column = 11 - clueIndex;
    row = 3;
    deltaRow = -1
  }
  else {
    column = 0;
    row = 15 - clueIndex;
    deltaColumn = 1;
  }
  for (let i = 0; i < 4; i++) {
    retPuzzle[row][column] = retPuzzle[row][column].filter(item => solution[i].includes(item));
    row += deltaRow;
    column += deltaColumn;
  }
  return retPuzzle;
}

const updateClue = (row) =>{
  let clues = heightPermutations
    .filter(permutation=>permutation
      .reduce((acc, val, idx)=>acc && row[idx].includes(val),true)).map(permutation => rowClue(permutation))
  if(clues.reduce((acc,curr)=>acc && curr === clues[0],true)){
    return clues[0];
  }
  return 0;
}
const solvePuzzle = (clues) => {
  const row = Array.from(Array(4)).map(i=>[1, 2, 3, 4])
  let puzzle = Array.from(Array(4)).map(i=>row.slice());
  while (!puzzleReady(puzzle)) {
    clues.forEach((clue, clueIdx)=> {
      let currentRow = getRowFromPuzzleByClueIndex(clueIdx, puzzle);
      if (!clue){
        clues[clueIdx] = updateClue(currentRow)
      }
      let solution = solveRow(clue, currentRow)
      puzzle = mergeSolutionBackToPuzzle(clueIdx, solution, puzzle)
    })
  }
  return puzzle.map(row=>row.map(col=>col[0]));
}
const puzzleTriesLeft = (puzzle)=>
puzzle.reduce((acc,row)=>acc+= row
    .reduce((a,col)=>a+col.length,0)
  ,0) -36
const puzzleToStr = (puzzle)=>{
  let retval = "";
  puzzle.forEach(row=>{
    row.forEach(column=>{
      retval += column +",\t"
    })
    retval +="\n"
  })
  return retval
}
