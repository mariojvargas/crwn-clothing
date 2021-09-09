import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

const selectShop = ({ shop }) => shop;

export const selectCollections = createSelector(selectShop, ({ collections }) => collections);

// This selector becomes a curried function
export const selectCollection = memoize((collectionName) =>
  createSelector([selectCollections], (collections) => collections[collectionName])
);

export const selectCollectionsForPreview = createSelector([selectCollections], (collections) =>
  Object.keys(collections).map((key) => collections[key])
);
