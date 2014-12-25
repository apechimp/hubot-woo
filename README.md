hubot-woo
=========
A hubot script which returns a randomly selected url to something in an s3
bucket.

Installation
------------
```
npm install --save hubot-woo
```
edit your ``external_scripts.json`` to add ``"hubot-woo"``.

Configuration
-------------
Set the following environment variables
  * `AWS_ACCESS_KEY_ID`
  * `AWS_ACCESS_SECRET`
  * `WOO_BUCKET` S3 bucket to use

Usage
-----
From wherever you use hubot

```
Hubot woo
```

Testing
-------
```
gem install fake_s3
npm test
```

Thanks
-------
Thanks to @benjymessner for the inital implementation.
