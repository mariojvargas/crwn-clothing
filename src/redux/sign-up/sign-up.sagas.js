import { all, call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { emailSignInStart, signUpFailure, signUpSuccess } from '../user/user.actions';
import UserActionTypes from '../user/user.types';

export function* signUpSagas() {
  yield all([call(onSignUpStart), call(onSignUpSuccess)]);
}

function* onSignUpStart() {
  yield takeEvery(UserActionTypes.SIGN_UP_START, function* (action) {
    try {
      const { displayName, email, password } = action.payload;
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);

      yield createUserProfileDocument(user, { displayName });

      yield put(signUpSuccess({ displayName, email, password }));
    } catch (error) {
      yield put(signUpFailure(error));
    }
  });
}

function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, function* ({ payload: { email, password } }) {
    yield put(emailSignInStart({ email, password }));
  });
}
