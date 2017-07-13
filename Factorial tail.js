// fixme
function zeroes(base, number) {
  let basePrimes = []
  let baseToDivide = base
  for (let i = 2; i <= baseToDivide; i++)
    while (baseToDivide % i === 0) {
      basePrimes.push(i);
      baseToDivide /= i;
    }
  let basePrimeNumbers = Array.from(new Set(basePrimes)).map(i=>({ prime: i, count: 0 }))
  for (let i = number; i > 1; i--) {
    let currentNumber = i
    basePrimeNumbers.forEach(primeObj=> {
        while (currentNumber % primeObj.prime === 0) {
          currentNumber /= primeObj.prime
          primeObj.count++
        }
      }
    )
  }

  basePrimeNumbers.forEach(primeObj=>
    primeObj.ratio = Math.floor(primeObj.count/basePrimes.filter(i=>i===primeObj.prime).length)
  )
  return basePrimeNumbers.reduce((acc,curr)=>curr.ratio<acc.ratio?curr:acc).ratio
  //console.log(basePrimeNumbers,basePrimes)

}