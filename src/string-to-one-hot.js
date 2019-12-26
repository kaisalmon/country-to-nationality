const tf = require('@tensorflow/tfjs-node')
const {STRING_LENGTH} = require('./get-data')

function stringToOneHot(string){
  const result = []
  const chars = Array.from(
    standardizeString(string)
  );
  for(const c of chars){
    result.push(charToOneHot(c))
  }
  return result
}

function stringToDoubleSidedOneHot(string){
  return [
    ...stringToOneHot(string),
    ...stringToOneHot(reverse(string))
  ]
}

function reverse(s){
    return s.split("").reverse().join("");
}

function getIndexFromChar(c){
  if(c === " ") return 0;
  if(c === "*") return 27;
  return alphabetPosition(c)
}

function charToOneHot(c){
  const i = getIndexFromChar(c)
  const result = Array(28).fill(0)
  result[i] = 1
  return result
}

function alphabetPosition(c) {
  var result = "";
  var code = c.charCodeAt(0)
  return code < 96 ? code - 64 : code - 96
}

function standardizeString(string){
  const withSpecialRemoved =  string.replace(/[^a-zA-Z \*]/g, '')
  const padded = padStringToLength(withSpecialRemoved)
  return padded
}

function padStringToLength(string, length=STRING_LENGTH){
  const pad = "                                            " //many spaces
  const padSize = length - string.length;
  const padOfCorrectSize = pad.substring(0, padSize);
  return string + padOfCorrectSize;
}


module.exports = stringToOneHot
module.exports.stringToDoubleSidedOneHot = stringToDoubleSidedOneHot;
