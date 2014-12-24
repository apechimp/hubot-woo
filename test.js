process.env.AWS_ENDPOINT = 'http://localhost:2345';
var bucket = process.env.WOO_BUCKET = 'foo';
process.env.AWS_ACCESS_KEY_ID = 'xxx';
process.env.AWS_SECRET_ACCESS_KEY = 'xxx';
process.env.AWS_FORCE_PATH_STYLE = true;
process.env.AWS_SSL_DISABLED = true;

var test = require('tape');
var hubot_woo = require('./index');
var async = require('async');

function mock_responder() {
  return function(callback) {
    hubot_woo({
      respond: function(command_regex, responder) {
        responder({
          send: callback.bind(null, null)
        });
      }
    });
  };
}

test('Command is woo', function(t) {
  t.plan(3);
  hubot_woo({
    respond: function(command_regex) {
      t.ok(command_regex.test('woo'), 'woo matches');
      t.notOk(command_regex.test('pwoo'), 'pwoo doesn\'t match');
      t.notOk(command_regex.test('woop'), 'woop doesn\'t match');
    }
  });
});

test('Call send with message for empty bucket', function(t) {
  var s3 = require('./s3');
  t.plan(2);
  async.series({
    create_bucket: s3.createBucket.bind(s3, { Bucket: bucket }),
    woo: mock_responder(),
    delete_bucket: s3.deleteBucket.bind(s3, { Bucket: bucket })
  }, function(err, results) {
    t.error(err);
    t.equal(results.woo, 'no woo pics :\'(');
  });
});

test('Call send with url for something in the bucket', function(t) {
  var s3 = require('./s3');
  t.plan(2);
  async.series(
    {
      create_bucket: s3.createBucket.bind(s3, { Bucket: bucket }),
      put_object: s3.putObject.bind(s3, { Bucket: bucket, Key: 'lol' }),
      woo: mock_responder(),
      delete_object: s3.deleteObject.bind(s3, { Bucket: bucket, Key: 'lol' }),
      delete_bucket: s3.deleteBucket.bind(s3, { Bucket: bucket })
    }, 
    function(err, results) {
      t.error(err);
      t.equal(results.woo, 'https://s3.amazonaws.com/foo/lol');
    }
  );
});
