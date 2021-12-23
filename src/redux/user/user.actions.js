import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInFailure = (errorMessage) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: errorMessage,
});

export const emailSignInStart = (credentials) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: credentials,
});

export const emailSignInSuccess = (user) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const emailSignInFailure = (errorMessage) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: errorMessage,
});
