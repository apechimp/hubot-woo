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
//
// Commands:
//   hubot woo - Returns a randomly selected url to something in an s3 bucket.
//
// Author:
//   apechimp

var Random = require('random-js');
var sprintf = require('sprintf');
var s3 = require('./s3');

var mt = Random.engines.mt19937();
mt.seed(Date.now());

var command_regex = /woo\b/i;
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
        else if(!data.Contents.length) {
          msg.send('no woo pics :\'(');
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
