import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], ({ cartItems }) => cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems
    .map(({ quantity }) => quantity)
    .reduce((accumulatedQuantity, quantity) => accumulatedQuantity + quantity, 0)
);

export const selectCartHidden = createSelector([selectCart], ({ hidden }) => hidden);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems
    .map(({ quantity, price }) => quantity * price)
    .reduce((runningTotal, currentItemCost) => runningTotal + currentItemCost, 0)
);
