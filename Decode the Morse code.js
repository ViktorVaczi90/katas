/**
 * Created by v on 7/10/17.
 */
decodeMorse = function(morseCode){
  return morseCode.split("   ").map(i=>i.split(" ").map(morse=>MORSE_CODE[morse]).join("")).join(" ").trim()
}