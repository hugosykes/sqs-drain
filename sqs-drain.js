#!/usr/bin/env node
const program = require('commander')

program
  .version("0.0.1")
  .command('drain-queue')
  .description('Drains queue to a file locally')
  .option('-o --output <output>', 'The output file')
  .option('-q --queue-url <queueUrl>', 'The URL of the queue to drain')
  .option('-r --region <region>', 'AWS region')
  .option('-p --profile <profile>', 'AWS profile to authenticate')
  .action(args => {
    if (!args.output || !args.queueUrl || !args.region || !args.profile) {
      console.log(program.commandHelp())
      process.exit(1)
    }
  })

program.parse(process.argv)
