const Test = { assertEquals: (a, b, c) => console.log({ a, b, c }) }

function findPosition(num) {
  const possibleSolutions = Array.from(Array(num.length))
    .map((i, index) =>
        Array.from(Array(index + 1))
          .map((item, idx) => ({
            startPosition: idx, number:
              (index + idx < num.length)
                ? num.slice(idx, index + idx + 1)
                : Number((num + num ).slice(idx, index + idx + 1)) + 1 + ''
          }))
          //.filter(i => i.number.length - 1 === index)
          .map(item => Object.assign({}, item, { generatedSequence: repeatNumber(item.number, num, item.startPosition) }))
      .filter(item => item.generatedSequence === num)
    )
   .reduce((acc, curr) => acc.concat(curr))
   .map(i => Object.assign({}, i, { pos: numberOfCharsForNumber(i.number, i.startPosition) }))
   .sort((a, b) => a.number < b.number)
  .map(i=>i.pos)
  .sort((a,b)=>a-b)
  return possibleSolutions//[0]
}

function repeatNumber(startNum, fullNum, startPosition) {
  return Array.from(Array(Math.ceil(fullNum.length / startNum.length) + 1)) // How many repeats + 1 for the previous number
    .map((itm, idx) => Number(startNum) + idx - 1 + "")
    .join('')
    .slice(startNum.length - startPosition - ((startNum.length > (Number(startNum) - 1 + "").length) ? 1 : 0), fullNum.length + startNum.length - startPosition - ((startNum.length > (Number(startNum) - 1 + "").length) ? 1 : 0))
}

function numberOfCharsForNumber(number, startPosition) {
  return Array.from(Array(number.length))
    .map((item, idx) => ((idx + 1 < number.length) ? Math.pow(10, idx + 1) : number) - Math.pow(10, idx))
    .map((item, idx) => item * (idx + 1))
    .reduce((acc, curr) => acc + curr) - startPosition
}

/*
console.log(repeatNumber('91','9100',0));
console.log(repeatNumber('9','9100',0));
console.log(repeatNumber('10','9100',1));

*/

console.log(findPosition("99"));

function doTest() {
  Test.assertEquals(findPosition("456"), 3, "...3456...");
  Test.assertEquals(findPosition("454"), 79, "...444546...");
  Test.assertEquals(findPosition("455"), 98, "...545556...");
  Test.assertEquals(findPosition("910"), 8, "...7891011...");
  Test.assertEquals(findPosition("9100"), 188, "...9899100...");
  Test.assertEquals(findPosition("99100"), 187, "...9899100...");
  Test.assertEquals(findPosition("00101"), 190, "...99100101...");
  Test.assertEquals(findPosition("001"), 190, "...9899100...");
  Test.assertEquals(findPosition("00"), 190, "...9899100...");
  Test.assertEquals(findPosition("123456789"), 0);
  Test.assertEquals(findPosition("1234567891"), 0);
  Test.assertEquals(findPosition("123456798"), 1000000071);
  Test.assertEquals(findPosition("10"), 9);
  Test.assertEquals(findPosition("53635"), 13034);
  Test.assertEquals(findPosition("040"), 1091);
  Test.assertEquals(findPosition("11"), 11);
  Test.assertEquals(findPosition("99"), 168);
  Test.assertEquals(findPosition("667"), 122);
  Test.assertEquals(findPosition("0404"), 15050);
  Test.assertEquals(findPosition("58257860625"), 24674951477);
}