/**
 * Created by v on 7/13/17.
 */
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