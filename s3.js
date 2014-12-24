var aws = require('aws-sdk');

module.exports = new aws.S3({
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sslEnabled: false,
  region: 'us-east-1',
  s3ForcePathStyle: process.env.AWS_FORCE_PATH_STYLE
});

