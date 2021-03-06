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
      "CUPBOARD",
      "KITCHEN",
      "MUG",
      "COFFEE",
      "OFFICE"
    ]
    const result = {}
    for(var input of testInputs){
      const inputTensor =  tf.tensor3d([stringToOneHot.stringToDoubleSidedOneHot(input)])
      const prediction = model.predict(inputTensor)
      const [asOneHot] =  result[input] = prediction.arraySync()
      const string = oneHotToString(asOneHot)
      console.log(`${input}\t--->\t${string}`)
    }
  }catch(e){
    console.error(e)
  }
}
run();
