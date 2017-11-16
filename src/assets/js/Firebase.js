import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBpYTxmPHjg6zTyzWfUOaH3az3cFvmKLwc",
  authDomain: "fubar-1855a.firebaseapp.com",
  databaseURL: "https://fubar-1855a.firebaseio.com",
  projectId: "fubar-1855a",
  storageBucket: "fubar-1855a.appspot.com",
  messagingSenderId: "719675238172"
};
export default firebase.initializeApp(config);