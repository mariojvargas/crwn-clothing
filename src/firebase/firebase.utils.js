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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error);
    }
  }

  return userRef;
};

const app = firebase.initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    // Note: when user closes popup, this is what happens:
    //       _createError(this.auth, AuthErrorCode.POPUP_CLOSED_BY_USER)

    console.error('Something terrible happened while signing in with Google', error);
  }
};

export default firebase;
