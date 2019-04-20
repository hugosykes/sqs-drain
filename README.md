# sqs-drain

## Tool for draining an SQS queue and keeping the messages

### Usage
```
./sqs-drain.js -o drain-to-here.txt -p aws-profile -r eu-west-1 -q https://sqs.aws-region-x.amazonaws.com/0123456789/queue-name-goes-here
```
This would drain the whole of queue `queue-name-goes-here` to a file named `drain-to-here.txt`. To 
authenticate with SQS, the AWS SDK will use the profile `aws-profile` and assume the queue is
available in region `eu-west-1`.


### Options
```
-o, --output    => Output file, will be created if it doesn't exist.
-r, --region    => AWS Region, e.g. eu-west-1.
-p, --profile   => AWS Profile to use for authentication.
-q, --queue-url => URL of the queue you wish to drain, e.g. https://sqs.eu-west-1.amazonaws.com/1234567890123/queue-name.fifo
```
