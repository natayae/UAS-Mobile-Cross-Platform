// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   // Firebase configuration
  // Check project preview on Firebase
  firebaseConfig : {
    apiKey: "AIzaSyBl7vROeP-KxELk4pIICsq__4IPcw-UFIE",
    authDomain: "uas-mobilecross.firebaseapp.com",
    databaseURL: "https://uas-mobilecross-default-rtdb.firebaseio.com",
    projectId: "uas-mobilecross",
    storageBucket: "uas-mobilecross.appspot.com",
    messagingSenderId: "613618017368",
    appId: "1:613618017368:web:4f9f7675933042ac49d62d",
    measurementId: "G-8RW74HDEY6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
