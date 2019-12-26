

function oneHotToString(arr){
  return arr.map(oneHotToChar).join('');
}

function oneHotToChar(c){
  let highestIndex = 0;
  for(let i = 1; i <= 27; i++){
    if(c[i] > c[highestIndex]){
      highestIndex = i;
    }
  }
  if(highestIndex === 0) return ' '
  if(highestIndex === 27) return '*'
  return String.fromCharCode(highestIndex + 64);
}

module.exports = oneHotToString
