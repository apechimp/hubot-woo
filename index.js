// Description:
//   Returns a randomly selected url to something in an s3 bucket.
//
// Dependencies:
//   aws-sdk
//   random.js
//   sprintf
//
// Configuration:
//   AWS_ACCESS_KEY_ID
//   AWS_ACCESS_SECRET
//   WOO_BUCKET
//   WOO_COMMAND (defaults to woo)
//
// Commands:
//   hubot woo - Returns a randomly selected url to something in an s3 bucket.
//
// Author:
//   apechimp

var aws = require('aws-sdk');
var Random = require('random-js');
var sprintf = require('sprintf');

var mt = Random.engines.mt19937();
mt.seed(Date.now());

aws.config.update({
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sslEnabled: !process.env.AWS_SSL_DISABLED,
  region: 'us-east-1'
});
s3 = new aws.S3();

var command_regex = /^woo\b/i;
var bucket = process.env.WOO_BUCKET;

module.exports = function (robot) {
	robot.respond(command_regex, function (msg) {
    s3.listObjects(
      { Bucket: bucket }, 
      function (err, data) {
        if(err) {
          console.error(err);
          msg.send('the gods of woo are displeased.');
        }
        else {
          msg.send(
            sprintf(
              'https://s3.amazonaws.com/%s/%s',
              bucket,
              Random.pick(mt, data.Contents).Key
            )
          );
        }
      }
    );
  });
};
