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

async function getAllPairs(){
  const [countries, states, continents] = await Promise.all([
    loadCsv('trainingdata/countries.csv'),
    loadCsv('trainingdata/us-states.csv'),
    loadCsv('trainingdata/continents.csv')
  ])
  const all =  [...countries, ...states, ...continents]
  const result = all
    .filter(({
      place, adjective
    }) => place && adjective)
    .filter(({
      place, adjective
    }) => place.length <= STRING_LENGTH && adjective.length <= STRING_LENGTH)
  console.log(result)
  return result
}
module.exports =  getAllPairs
module.exports.STRING_LENGTH = STRING_LENGTH;
