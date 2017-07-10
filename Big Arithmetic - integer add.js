/**
 * Created by v on 7/8/17.
 */
function substractStrings(a,b) {
  if(b[0] === '-') return (addStrings(a,b.slice(1,b.length)));
  if(a[0] === '-'){
    if(b[0] === '-') return substractStrings(b.slice(1,b.length),a.slice(1,a.length)) // b-a
    else return substractStrings(b,a.slice(1,a.length))
  }
  //both positive, a is bigger then b
  let aS = a.toString().split('').reverse().join('').match(/.{1,8}/g).map(i=>i.split('').reverse().join(''));
  let bS = b.toString().split('').reverse().join('').match(/.{1,8}/g).map(i=>i.split('').reverse().join(''));
  let res = aS
    .map((item,idx)=>aS[idx] - ((idx<bS.length)?(bS[idx]):0))
    .map((item,idx)=>(item>0)?{num:item,flipped:false}:{num:Math.pow(10,8) + item,flipped:true})
  while(res.reduce((acc,curr)=>acc || curr.flipped,false)) // Why no flipped
  res = res.map((item,idx,arr)=>{
    if(item.flipped) arr[idx+1]--;
    item.flipped = false;
    return item;
  })
asd = 5;
  let cycleLength = aS.length>bS.length?aS.length:bS.length
  let result = [];

}
function addStrings(a,b){}
substractStrings('52100000000000000000000000','5000000009999999')