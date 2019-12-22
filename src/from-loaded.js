const tf = require('@tensorflow/tfjs-node')
const stringToOneHot = require('./string-to-one-hot')
const oneHotToString = require('./one-hot-to-string')
const loadPath = 'file://'+process.cwd()+"/models/model1"

async function run(){
  try{
    const loadPath = 'file://'+process.cwd()+"/models/model1/model.json"
    const model = await tf.loadLayersModel(loadPath);

    model.summary();

    const testInputs = [
      "HONG KONG",
      "DEVON",
      "EXETER",
      "BORAS",
      "FISH",
      "ALF",
      "ALFRED",
      "ELEANOR",
      "KAI",
      "OCTOPUS",
      "SQUID"
    ]
    const result = {}
    for(var input of testInputs){
      const inputTensor =  tf.tensor3d([stringToOneHot(input)])
      const prediction = model.predict(inputTensor)
      const [asOneHot] =  result[input] = prediction.arraySync()
      const string = oneHotToString(asOneHot)
      console.log(`${input} ---> ${string}`)
    }
  }catch(e){
    console.error(e)
  }
}
run();
