/**
 * Created by v on 7/10/17.
 */
const beeplengths = [".","-"]
const pauseLengths = [""," ","   "]
const closestClusterIndex = (observation, clusterMeans) =>
  {
    return clusterMeans.map((mean,index)=>({distance: Math.abs(mean-observation), index})).reduce((acc,curr)=>(acc.distance > curr.distance)?curr:acc).index
  }

const spread = (means,observations)=> {
  return observations.reduce((acc,observation)=>{
    //console.log({means,observation,closestMean:means[closestClusterIndex(observation,means)],add: Math.abs(means[closestClusterIndex(observation,means)]-observation)})
    return acc+ Math.abs(means[closestClusterIndex(observation,means)]-observation)},0)}


const KMeansCluster = (observations, numberOfClusters, lengths,maxLength) => {
  const maxObsLength = maxLength > 7?maxLength:7
  let means = Array.from(Array(numberOfClusters)).map((item,index)=>lengths[index] * maxObsLength/7); // This has to more clever!!!
  console.log({means})
  let membersArray = Array.from(Array(numberOfClusters)).map(i=>[])
  let newMembersArray = Array.from(Array(numberOfClusters)).map(i=>[])
  let previousMeans = [];
  let turns = 0
  do{
    turns++;
    previousMeans = means.slice()
    membersArray = means
      .map((clusterMembers,clusterIndex)=>observations
        .reduce((acc,observation)=>
            closestClusterIndex(observation,means)
            ===clusterIndex?acc.concat([observation]):acc
          ,[]))// Filter observations where the closest mean is the current one.;
    means = membersArray.map(
      (clusterMembers,clusterIndex) => clusterMembers.length?clusterMembers.reduce((a,b)=>a+b,0)/clusterMembers.length:lengths[clusterIndex]*maxObsLength/7)
    newMembersArray = means
      .map((clusterMembers,clusterIndex)=>observations
        .reduce((acc,observation)=>
            closestClusterIndex(observation,means)
            ===clusterIndex?acc.concat([observation]):acc
          ,[]))// Filter observations where the closest mean is the current one.
    //console.log({membersArray, newMembersArray})
  } while(!newMembersArray.reduce((acc,newMembers,meanIndex) => acc && newMembers
    .reduce((memberAcc,member,memberIndex)=>memberAcc && (membersArray[meanIndex][memberIndex] !== undefined && membersArray[meanIndex][memberIndex] === member) ,true)
  ,true))
  console.log({previousMeans,turns,means})
  console.log('\n')
  return means
}
const decodeBitsAdvanced = (bits) => {
  //console.log({bits})
  if(!bits || !bits.replace(/^0+/,'')) return ''
  const observations = bits.replace(/^0+/,'').replace(/0+$/,'').match(/0+|1+/g)
  const maximalObservationLengts = Math.max(...observations.map(o=>o.length))
  const minimalObservationLengts = Math.min(...observations.map(o=>o.length))
  const obsLengt= maximalObservationLengts
  /*const beepMeans = KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3],maximalObservationLengts)
  const pauseMeans = KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7],maximalObservationLengts)*/

  const [beepMeans,pauseMeans] = [
    [KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3],obsLengt*7),
    KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7],obsLengt*7)],
    [KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3],obsLengt*3),
      KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7],obsLengt*3)],
    [KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3],obsLengt*7/3),
      KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7],obsLengt*7/3)],
      [KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3],obsLengt),
      KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7],obsLengt)]
    ].reduce((acc,curr)=>
    curr[0].length*spread(curr[0],observations.filter(item=>item[0]==1).map(i=>i.length))
    + curr[1].length*spread(curr[1],observations.filter(item=>item[0]==0).map(i=>i.length))
    <acc[0].length*spread(acc[0],observations.filter(item=>item[0]==1).map(i=>i.length))
    + acc[1].length*spread(acc[1],observations.filter(item=>item[0]==0).map(i=>i.length))
      ?curr:acc)
  return observations.map(observation => observation[0]==1
    ?beeplengths[closestClusterIndex(observation.length,beepMeans)]
    :pauseLengths[closestClusterIndex(observation.length,pauseMeans)]).join("").trim()
}

const decodeMorse =(morseCode) => {
  if (!morseCode) return ''
  return morseCode.split("   ").map(i=>i.split(" ").map(morse=>MORSE_CODE[morse]).join("")).join(" ").trim()
}


const MORSE_CODE = { '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '.-.-.-': '.',
  '--..--': ',',
  '..--..': '?',
  '.----.': '\'',
  '-.-.--': '!',
  '-..-.': '/',
  '-.--.': '(',
  '-.--.-': ')',
  '.-...': '&',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '.-.-.': '+',
  '-....-': '-',
  '..--.-': '_',
  '.-..-.': '"',
  '...-..-': '$',
  '.--.-.': '@',
  '...---...': 'SOS' }
const messages = {'HEY JUDE': '0000000011011010011100000110000001111110100111110011111100000000000111011111111011111011111000000101100011111100000111110011101100000100000',
'E':'000000000000001111110000000000000000000000',
"Empty":'',
'shortE': '11',
'M':'00000000000000000111011100000000',
'EE': '1001'}
console.log(decodeMorse(decodeBitsAdvanced(messages['EE'])))