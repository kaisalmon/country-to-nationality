const tf = require('@tensorflow/tfjs-node')

const getAllPairs = require('./get-data')
const stringToOneHot = require('./string-to-one-hot')

const createTrainingData = async ()=>{
  const data = await getAllPairs();
  const inputs = data.map(d => d.place)
    .map(stringToOneHot.stringToDoubleSidedOneHot)
  const labels = data.map(d => d.adjective)
    .map(stringToOneHot)


  const shape = [inputs.length, inputs[0].length, 28]
  const outputShape = [labels.length, labels[0].length, 28]
  const inputOneHot = tf.tensor3d(inputs, shape);
  const labelOneHot = tf.tensor3d(labels, outputShape);

  return {
    inputs: inputOneHot,
    labels: labelOneHot,
  }
}

module.exports = createTrainingData
