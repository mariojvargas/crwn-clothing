import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';
import { signUpSagas } from './sign-up/sign-up.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas), call(signUpSagas)]);
}
