import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { Product } from '../product.interface';
import { ShopperState, initialShopperState } from './shopper.state';
import * as ShopperActions from './shopper.actions';

export const shopperReducer: ActionReducer<ShopperState, Action> = createReducer(
  initialShopperState,

  on(ShopperActions.search, (state: ShopperState) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(ShopperActions.searchSuccess, (state: ShopperState, { searchResults }) => ({
    ...state,
    searchResults,
    loading: false,
    loaded: true,
  })),
  on(ShopperActions.searchError, (state: ShopperState, { error }) => ({
    ...state,
    error,
    loading: false,
    loaded: false,
  })),

  on(ShopperActions.updateSearchTerm, (state: ShopperState, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),

  on(ShopperActions.addToCart, (state: ShopperState, { product }) => {
    const index: number = state.cart.findIndex((cartProduct: Product) => cartProduct.id === product.id);
    if (index == -1) {
      return {
        ...state,
        cart: [...state.cart, product],
      }
    }
    return state;
  }),

  on(ShopperActions.removeFromCart, (state: ShopperState, { productId }) => {
    const index: number = state.cart.findIndex((cartProduct: Product) => cartProduct.id === productId);
    if (index > -1) {
      return {
        ...state,
        cart: state.cart.filter((product: Product) => product.id !== productId),
      }
    }
    return state;
  }),

  on(ShopperActions.resetCart, (state: ShopperState) => ({
    ...state,
    cart: [],
  }))
);
