process.env.AWS_ENDPOINT = 'http://localhost:2345';
var bucket = process.env.WOO_BUCKET = 'foo';
process.env.AWS_ACCESS_KEY_ID = 'bar';
process.env.AWS_SECRET_ACCESS_KEY = 'baz';
process.env.AWS_FORCE_PATH_STYLE = true;
process.env.AWS_SSL_DIABLED = true;

var test = require('tape');
var hubot_woo = require('./index');

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
  s3.createBucket({ Bucket: bucket }, function(err) {
    t.error(err);
    hubot_woo({
      respond: function(command_regex, responder) {
        responder({
          send: function(message) {
            t.equal(message, 'no woo pics :\'(');
          }
        });
      }
    });
  });
});

test('Call send with url for something in the bucket', function(t) {
  var s3 = require('./s3');
  t.plan(3);
  s3.createBucket({ Bucket: bucket }, function(err) {
    t.error(err);
    s3.putObject({ Bucket: bucket, Key: 'lol' }, function(err) {
      t.error(err);
      hubot_woo({
        respond: function(command_regex, responder) {
          responder({
            send: function(message) {
              t.equal(message, 'https://s3.amazonaws.com/foo/lol');
            }
          });
        }
      });
    });
  });
});
