function CurryIt(func) {
  let localArgs = [];
  let context = null
  return function curry(...a) {
    if (this != ((function () {return this;}).call(null))) context = this
    if (!a.length) {
      let retVal = func.call(context,...localArgs);
      localArgs = [];
      return retVal
    }
    localArgs = localArgs.concat(a)
    return curry
  }
}

var curryReduce = CurryIt(Array.prototype.reduce);

var exampleArray = [2, 3, 4]
curryReduce.call(exampleArray, function (a, b) {
  return a + b;
});
curryReduce(8);
console.log(curryReduce())