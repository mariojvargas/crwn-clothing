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

  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData,
    });
  }

  return userRef;
};

const app = firebase.initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = async () => {
//   try {
//     await auth.signInWithPopup(googleProvider);
//   } catch (error) {
//     // Note: when user closes popup, this is what happens:
//     //       _createError(this.auth, AuthErrorCode.POPUP_CLOSED_BY_USER)

//     console.error('Something terrible happened while signing in with Google', error);
//   }
// };

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((item) => {
    const documentRef = collectionRef.doc();
    batch.set(documentRef, item);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items,
    };
  });

  const collectionMap = transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});

  return collectionMap;
};

export default firebase;
