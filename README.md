# reading-challenge
Reading Challenge App for School Districts

## Production app
- Web app (deployed in heroku): https://reading-challenge.herokuapp.com
- Play store listing (web):  https://play.google.com/store/apps/details?id=com.reactnativesource&hl=en
- Play store listing, search "Charm City Readers".
- Play store listing, web link: https://play.google.com/store/apps/details?id=com.reactnativesource&hl=en

## Developing

You can see this on localhost:5000

To run:

- 1:  Make a config file in the `web` dir called `config.coffee` with the following:

```coffee
module.exports =
  HOST: 'localhost'
  PORT: 5000
  CLIENT_ID: ""
  CLIENT_SECRET: ""
  AUTH_URL: "https://clever.com/oauth"
  API_URL: "https://api.clever.com"
  SESSION_SECRET: ""
  FIREBASE_ACCOUNT: # json object by creating new key for node-backend at https://console.firebase.google.com/iam-admin/serviceaccounts/project?project=firebase-reading-challenge&consoleReturnUrl=https:%2F%2Fconsole.firebase.google.com%2Fproject%2Ffirebase-reading-challenge%2Foverview
```

- 2:  To run the web app
```
make run
```

- 3: To run android app
```
    open genymotion -> start virtual device
    react-native run-android
    adb logcat *:S ReactNative:V ReactNativeJS:V // SHOWS ANDROID LOGS
```

To update apk:
- Update version in: `/android/app/src/main/AndroidManifest.xml` and `android/app/build.gradle`
- Generete apk:  `cd android && ./gradlew assembleRelease`
- Upload to dev console in play store

To test on android device:
- If old android phone, follow [instructions](http://stackoverflow.com/questions/34500020/referenceerror-cant-find-variable-fbbatchedbridge).  When entering port in dev settings, make sure to enter ip:8081.

or
- generate apk, install directly with


To test:
use this district id: `56ae8e9c5994560100000ae4`
