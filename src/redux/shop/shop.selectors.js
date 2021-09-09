import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = ({ shop }) => shop;

export const selectCollections = createSelector(selectShop, ({ collections }) => collections);

// This selector becomes a curried function
export const selectCollection = memoize((collectionName) =>
  createSelector([selectCollections], (collections) =>
    collections.find((c) => c.id === COLLECTION_ID_MAP[collectionName])
  )
);
