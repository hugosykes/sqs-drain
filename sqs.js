function drainQueue(outputFile, queueUrl, region, profile) {
  process.env.AWS_SDK_LOAD_CONFIG=true
  process.env.AWS_PROFILE = profile
  const AWS = require('aws-sdk')
  AWS.config.region = region
  const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

  receiveMessages(queueUrl, sqs)
}

function receiveMessages(queueUrl, sqs) {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10
  }

  sqs.receiveMessage(params, (err, data) => {
    if (err) console.log(err.stack)
    else console.log(data)
  })
}

module.exports = {
  drainQueue: drainQueue
}
