import { createSelector } from 'reselect';

const selectShop = ({ shop }) => shop;

export const selectCollections = createSelector(selectShop, ({ collections }) => collections);
