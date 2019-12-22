

function oneHotToString(arr){
  return arr.map(oneHotToChar).join('');
}

function oneHotToChar(c){
  let hightestIndex = 0;
  for(let i = 1; i <= 26; i++){
    if(c[i] > c[hightestIndex]){
      hightestIndex = i;
    }
  }
  if(hightestIndex === 0) return ' '
  return String.fromCharCode(hightestIndex + 64);
}

module.exports = oneHotToString
