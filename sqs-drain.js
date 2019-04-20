#!/usr/bin/env node
const program = require('commander')

const sqs = require('./sqs')

program
  .version("1.0.0")
  .command('drain-queue')
  .description('Drains queue to a file locally')
  .option('-o --output <output>', 'The output file')
  .option('-q --queue-url <queueUrl>', 'The URL of the queue to drain')
  .option('-r --region <region>', 'AWS region')
  .option('-p --profile <profile>', 'AWS profile to authenticate')
  .action(args => {
    let {output, queueUrl, region, profile} = args

    if (!output || !queueUrl || !region || !profile) {
      console.log(program.commandHelp())
      process.exit(1)
    }

    sqs.drainQueue(output, queueUrl, region, profile)
  })

program.parse(process.argv)
