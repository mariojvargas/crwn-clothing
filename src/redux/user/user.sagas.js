import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
  googleProvider,
} from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './user.actions';
import UserActionTypes from './user.types';

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, function* signInWithGoogle() {
    try {
      const { user } = yield auth.signInWithPopup(googleProvider);
      yield handleAuthenticatedUser(user);
    } catch (error) {
      yield put(signInFailure(error));
    }
  });
}

function* onEmailSignInStart(credentials) {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    function* signInWithEmail({ payload: { email, password } }) {
      try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);

        yield handleAuthenticatedUser(user);
      } catch (error) {
        yield put(signInFailure(error));
      }
    }
  );
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, function* reAuthenticateIfNeeded() {
    try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) {
        return;
      }

      yield handleAuthenticatedUser(userAuth);
    } catch (error) {
      yield put(signInFailure(error));
    }
  });
}

function* onSignOutStart() {
  yield takeEvery(UserActionTypes.SIGN_OUT_START, function* signOut() {
    try {
      yield auth.signOut();
      yield put(signOutSuccess());
    } catch (error) {
      yield put(signOutFailure(error));
    }
  });
}

function* handleAuthenticatedUser(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
