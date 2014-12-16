var test = require('tape');
var hubot_woo = require('./index');

test('Command is woo', function(t) {
  t.plan(3);
  hubot_woo({
    respond: function(command_regex) {
      debugger;
      t.ok(command_regex.test('woo'));
      t.notOk(command_regex.test('pwoo'));
      t.notOk(command_regex.test('woop'));
    }
  })
});

test('Call send with url for something in the bucket');
