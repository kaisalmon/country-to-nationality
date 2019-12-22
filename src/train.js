const tf = require('@tensorflow/tfjs-node')
const createTrainingData = require('./create-training-data')
const stringToOneHot = require('./string-to-one-hot')
const oneHotToString = require('./one-hot-to-string')

const savePath = 'file://'+process.cwd()+"/models/model1"

function createModel(inputShape) {
  // Create a sequential model
  const model = tf.sequential();
  const [width, height] = inputShape;

  model.add(
     tf.layers.flatten({inputShape})
  )
  model.add(
    tf.layers.gaussianNoise({stddev: 0.2})
  )
  model.add(
     tf.layers.dense({units: width*height, useBias: true, activation:'relu'})
  )
  model.add(
    tf.layers.gaussianNoise({stddev: 0.2})
  )
  model.add(
     tf.layers.dense({units: width*height, useBias: true, activation:'sigmoid'})
  )
  model.add(
     tf.layers.reshape({targetShape: inputShape})
  )

  console.log(model.summary())

  return model;
}

async function train(){
  try{
    const {inputs, labels} = await createTrainingData();

    const [sampleSize, ...shape] = inputs.shape

    const model = createModel(shape)

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: tf.losses.meanSquaredError,
    });

    const batchSize = 32;
    const epochs = 1000;

    await model.fit(inputs, labels, {
      batchSize,
      epochs,
      shuffle: true,
      validationSplit: 0.15,
      callbacks:{
        onEpochEnd: onEpochEnd.bind(model)
      }
    });
   await model.save(savePath);

  }catch(e){
      console.error(e)
  }
}

const testInputs = [
  "kingston",
  "texas",
  "england",
  "bosnia",
  "guildford",
  "london",
  "narnia",
  "hogwarts",
  "serbia",
  "sweden",
  "france",
  "gothenburg",
  "rocketdesk",
]
function onEpochEnd(epoch){
  if(epoch%25 !== 0) return
  const result = {}
  for(var input of testInputs){
    const inputTensor =  tf.tensor3d([stringToOneHot(input)])
    const prediction = this.predict(inputTensor)
    const [asOneHot] =  result[input] = prediction.arraySync()
    const string = oneHotToString(asOneHot)
    result[input] = string;
  }
  console.log(result)
}

train();
