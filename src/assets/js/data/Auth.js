import FirebaseApp from '~/Firebase';
const auth = FirebaseApp.auth();

export default (callback) => auth.onAuthStateChanged(callback);