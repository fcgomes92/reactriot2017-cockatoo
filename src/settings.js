import firebase from 'firebase';

//------------------------------------------------------------------------------
window.onload = () => {
  // load sentry bug report
  try {
    // eslint-disable-next-line
    // Raven.config('https://07127c20cbda44169fa0848d6420156c@sentry.io/183491').install()
  } catch (e) {
    console.error(e);
  }
}

//------------------------------------------------------------------------------
// load firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPmsRhb2AbfnJP1CC2rZxhynjcxpyRK3Y",
  authDomain: "reactriot2017-cockatoo.firebaseapp.com",
  databaseURL: "https://reactriot2017-cockatoo.firebaseio.com",
  projectId: "reactriot2017-cockatoo",
  storageBucket: "reactriot2017-cockatoo.appspot.com",
  messagingSenderId: "519713501566"
};
firebase.initializeApp(config);
