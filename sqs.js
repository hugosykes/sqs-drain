const diskWriter = require('./disk-writer')

async function drainQueue(outputFile, queueUrl, region, profile) {
  process.env.AWS_SDK_LOAD_CONFIG = true
  process.env.AWS_PROFILE = profile
  const AWS = require('aws-sdk')
  AWS.config.region = region
  const sqs = new AWS.SQS({apiVersion: '2012-11-05'})
  let messagesAvailable = await checkForExistingMessages(queueUrl, sqs)
  while (messagesAvailable) {
    receiveMessages(queueUrl, sqs, outputFile)
    messagesAvailable = await checkForExistingMessages(queueUrl, sqs)
  }
}

function checkForExistingMessages(queueUrl, sqs) {
  return new Promise((resolve, reject) => {
    sqs.getQueueAttributes({
      QueueUrl: queueUrl,
      AttributeNames: ["ApproximateNumberOfMessages"]
    }, (err, data) => {
      const num = data.Attributes["ApproximateNumberOfMessages"]
      if (err) reject(err)
      else if (num > 0) resolve(true)
      else resolve(false)
    })
  })
}

function receiveMessages(queueUrl, sqs, outputFile) {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10
  }
  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log(err.stack)
    } else {
      const {Messages} = data
      if (Messages) {
        diskWriter.writeToDisk(outputFile, getBody(Messages))
        deleteMessages(queueUrl, sqs, Messages)
      }
    }
  })
}

function deleteMessages(queueUrl, sqs, messages) {
  const params = {
    QueueUrl: queueUrl,
    Entries: getReceiptHandles(messages)
  }
  sqs.deleteMessageBatch(params, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data.Failed.length !== 0) {
        data.Failed.forEach(m => {
          console.log(`Failed to delete: ${m.Id}, for reason: ${m.Message}`
              + `, and code ${m.Code}`)
        })
      }
      data.Successful.forEach(s => console.log(`Successfully deleted `
          + `${s.Id}`))
    }
  })
}

function getBody(messages) {
  return messages.map(m => {
    return m.Body
  })
}

function getReceiptHandles(messages) {
  return messages.map(m => {
    return {Id: m.MessageId, ReceiptHandle: m.ReceiptHandle}
  })
}

module.exports = {
  drainQueue: drainQueue
}
