const fs = require('fs')

function writeToDisk(outputFile, content) {
  firstRead(outputFile, content)
}

function firstRead(outputFile, content) {
  fs.readFile(outputFile, "utf-8", (err, buf) => {
    if (err) console.log(err)
    else content = buf + content
    thenWrite(outputFile, content)
  })
}

function thenWrite(outputFile, content) {
  fs.writeFile(outputFile, content, err => {
    if (err) console.log(err)
  })
}

module.exports = {
  writeToDisk: writeToDisk
}
