const fs = require('fs')

function writeToDisk(outputFile, content) {
  firstRead(outputFile, content)
}

function firstRead(outputFile, content) {
  fs.readFile(outputFile, "utf-8", (err, buf) => {
    if (err) console.log(err)
    else {
      concatenate(buf, content)
    }
    thenWrite(outputFile, content)
  })
}

function thenWrite(outputFile, content) {
  fs.writeFile(outputFile, JSON.stringify(content), err => {
    if (err) console.log(err)
  })
}

function concatenate(buffer, newContent) {
  const arr = JSON.parse(buffer)
  arr.forEach(el => newContent.push(el))
  return newContent
}

module.exports = {
  writeToDisk: writeToDisk
}
