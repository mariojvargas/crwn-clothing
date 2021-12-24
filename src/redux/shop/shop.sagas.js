import { call, put, takeEvery, all } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import ShopActionTypes from './shop.types';

export function* shopSagas() {
  yield all([call(onFetchCollectionsStart)]);
}

function* onFetchCollectionsStart() {
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, function* fetchCollectionsAsync() {
    try {
      const collectionRef = firestore.collection('collections');

      const snapshop = yield collectionRef.get();
      const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshop);

      yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      yield put(fetchCollectionsFailure, error.message);
    }
  });
}
