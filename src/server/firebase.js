const admin = require('firebase-admin');

var serviceAccount = require('./config/serviceAccountKey.json');

const firebaseInfo = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fubar-1855a.firebaseio.com"
};

admin.initializeApp(firebaseInfo);