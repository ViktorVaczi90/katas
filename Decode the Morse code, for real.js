/**
 * Created by v on 7/10/17.
 */
const beeplengths = [".","-"]
const pauseLengths = [""," ","   "]
const closestClusterIndex = (observation, clusterMeans) =>
  {
    return clusterMeans.map((mean,index)=>({distance: Math.abs(mean-observation), index})).reduce((acc,curr)=>(acc.distance > curr.distance)?curr:acc).index
  }

const KMeansCluster = (observations, numberOfClusters, lengths) => {
  let means = Array.from(Array(numberOfClusters)).map((item,index)=>lengths[index] * Math.min(...observations)); // This has to more clever!!!
  let membersArray = Array.from(Array(numberOfClusters)).map(i=>[])
  let newMembersArray = Array.from(Array(numberOfClusters)).map(i=>[])
  do{
    membersArray = newMembersArray;
    newMembersArray = means
      .map((clusterMembers,clusterIndex)=>observations
        .reduce((acc,observation)=>
            closestClusterIndex(observation,means)
          ===clusterIndex?acc.concat([observation]):acc
        ,[]))// Filter observations where the closest mean is the current one.
    means = newMembersArray.map(
      (clusterMembers,clusterIndex) => clusterMembers.length?clusterMembers.reduce((a,b)=>a+b,0)/clusterMembers.length:lengths[clusterIndex]*Math.min(...observations))
    //console.log({membersArray, newMembersArray})
  } while(!newMembersArray.reduce((acc,newMembers,meanIndex) => acc && newMembers
    .reduce((memberAcc,member,memberIndex)=>memberAcc && (membersArray[meanIndex][memberIndex] !== undefined && membersArray[meanIndex][memberIndex] === member) ,true)
  ,true))
  return means
}
const decodeBitsAdvanced = (bits) => {
  if(!bits) return ''
  const observations = bits.replace(/^0+/,'').replace(/0+$/,'').match(/0+|1+/g)
  const beepMeans = KMeansCluster(observations.filter(item=>item[0]==1).map(i=>i.length),2,[1,3])
  const pauseMeans = KMeansCluster(observations.filter(item=>item[0]==0).map(i=>i.length),3,[1,3,7])
  return observations.map(observation => observation[0]==1
    ?beeplengths[closestClusterIndex(observation.length,beepMeans)]
    :pauseLengths[closestClusterIndex(observation.length,pauseMeans)]).join("").trim()
}

const decodeMorse =(morseCode) => {
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
'shortE': '11'}
console.log(decodeMorse(decodeBitsAdvanced(messages['HEY JUDE'])))