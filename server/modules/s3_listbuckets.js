// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 

const { S3_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
AWS.config.update({region: 'us-east-2'});
AWS.config.Bucket = S3_BUCKET

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});