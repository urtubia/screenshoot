## Running
First create a S3 bucket and get valid access and secret keys that can write to it, then export the following env vars:

```
export S3_BUCKET_NAME=the_bucket
export S3_ACCESS_KEY_ID=the_access_key
export S3_SECRET_ACCESS_KEY=the_secret_access_key
```

then install dependencies and run

```
nvm use 5
npm install
./node_modules/.bin/webpack
./node_modules/.bin/electron .
```

to develop, set the env variable `WEBPACK_DEV_SERVER=true` and run the webpack dev server with
```
npm run-script watch
```
and then, with the same variable set, run electron:
```
./node_modules/.bin/electron .
```


