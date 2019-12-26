const csv = require('csv-parser');
const STRING_LENGTH = 16
const fs = require('fs');

function loadCsv(file){
  return new Promise(resolve=>{
    const result = []
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        result.push(row)
      })
      .on('end', () => {
        resolve(result);
      });
  })
}

function toWildcardString(adjective, place){
  let str = ''
  for(let i = 0; i < adjective.length; i++){
    if(adjective[i] === place[i]){
      str+="*"
    }else{
      str += adjective[i]
    }
  }
  return str;
}

async function getAllPairs(){
  const [countries, states, continents, regions, hellenic] = await Promise.all([
    loadCsv('trainingdata/countries.csv'),
    loadCsv('trainingdata/us-states.csv'),
    loadCsv('trainingdata/continents.csv'),
    loadCsv('trainingdata/regions.csv'),
    loadCsv('trainingdata/hellenic.csv')
  ])
  const all =  [...countries, ...states, ...continents, ...regions, ...hellenic]
  const result = all
    .filter(({
      place, adjective
    }) => place && adjective)
    .filter(({
      place, adjective
    }) => place.length <= STRING_LENGTH && adjective.length <= STRING_LENGTH)
    .map(({
      place, adjective
    }) => ({
      place,
      adjective: toWildcardString(adjective, place)
    }))
  console.log(result)
  return result
}
module.exports =  getAllPairs
module.exports.STRING_LENGTH = STRING_LENGTH;
