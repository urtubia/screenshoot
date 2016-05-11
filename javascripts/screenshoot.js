const chokidar = require('chokidar');
const fs = require('fs');
const s3 = require('s3');
const uuid = require('node-uuid');
const child_process = require('child_process');
const process = require('process');


var exec = child_process.exec;

function getScreenshotPath() {
  return new Promise((resolve, reject) => {
    exec('defaults read com.apple.screencapture', 
         (err, stdout, stderr) => {
           var re = /location\s\=\s"(.+)"/;
           var m = re.exec(stdout);
           if(m != null){
             resolve(m[1]);
           }else{
             resolve(null);
           }
         });
  });
}

function setScreenshotPath(newPath) {
  return new Promise((resolve, reject) => {
    exec(`defaults write com.apple.screencapture location ${newPath}`,
         (err, stdout, stderr) => {
           if(err){
             reject(err);
           }else{
             resolve(newPath);
           }
         });
  });
}

function pbcopy(data) { 
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); 
  proc.stdin.end(); 
}


const TIME_TO_IGNORE_ADD_REPORTS_FROM_START = 3000;

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: "us-east-1",
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  }
});

getScreenshotPath().then( (path) => {
  var startWatchTime = new Date();
  // One-liner path directory, ignores .dotfiles
  chokidar.watch(path, {ignored: /[\/\\]\./}).on('all', (event, path) => {
    fs.stat(path, (err, stats) => {
      var now = new Date();
      var timeSinceStartWatch = (now - startWatchTime);
      console.log(`timeStartWatch=${timeSinceStartWatch}`)
      if(timeSinceStartWatch < TIME_TO_IGNORE_ADD_REPORTS_FROM_START){
        return;
      }

      console.log(event, path);
      console.log(stats.birthtime);
      console.log(now - stats.birthtime);

      var generatedKeyname = uuid.v1() + '.png';
      console.log('GeneratedKeyname: ' + generatedKeyname);
      console.log('bucket: ' + process.env.S3_BUCKET_NAME);

      var uploadParams = {
        localFile:  path,
        s3Params: {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: generatedKeyname
        }
      };
      var uploader = client.uploadFile(uploadParams);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
      });
      uploader.on('end', function() {
        console.log("done uploading " + generatedKeyname);
        var url = "https://s3.amazonaws.com/" + process.env.S3_BUCKET_NAME + "/" + generatedKeyname;
        pbcopy(url);
        console.log("Pasted URL to clipboard: " + url);
        var notificationOptions = {
          title: "Screenshot Uploaded",
          body: `${url} copied to clipboard`
        };
        new Notification('basic', notificationOptions);
      });

    });
  });
});
