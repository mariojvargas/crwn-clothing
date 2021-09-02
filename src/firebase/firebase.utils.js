import { getAnalytics } from 'firebase/analytics';
// https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPbl8OyfcHoMFQXglHyNCzVHLVmZ2lOL8',
  authDomain: 'crwn-db-e5350.firebaseapp.com',
  projectId: 'crwn-db-e5350',
  storageBucket: 'crwn-db-e5350.appspot.com',
  messagingSenderId: '635454266399',
  appId: '1:635454266399:web:3a9f31eb5ddaefd652092a',
  measurementId: 'G-M0W24ZVE95',
};

const app = firebase.initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
