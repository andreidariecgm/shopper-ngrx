import { createAction, props } from '@ngrx/store';

import { Product } from '../product.interface';

export enum ShopperActionType {
  SEARCH = '[Shopper] Search',
  SEARCH_SUCCESS = '[Shopper] Search success',
  SEARCH_ERROR = '[Shopper] Search error',
  UPDATE_SEARCH_TERM = '[Shopper] Update search term',
  ADD_TO_CART = '[Shopper] Add to cart',
  REMOVE_FROM_CART = '[Shopper] Remove from cart',
  BUY = '[Shopper] Buy',
  RESET_CART = '[Shopper] Reset cart',
}

export const search = createAction(ShopperActionType.SEARCH);
export const searchSuccess = createAction(ShopperActionType.SEARCH_SUCCESS, props<{ searchResults: Product[] }>());
export const searchError = createAction(ShopperActionType.SEARCH_ERROR, props<{ error: string }>());
export const updateSearchTerm = createAction(ShopperActionType.UPDATE_SEARCH_TERM, props<{ searchTerm: string }>());
export const addToCart = createAction(ShopperActionType.ADD_TO_CART, props<{ product: Product }>());
export const removeFromCart = createAction(ShopperActionType.REMOVE_FROM_CART, props<{ productId: string }>());
export const buy = createAction(ShopperActionType.BUY);
export const resetCart = createAction(ShopperActionType.RESET_CART);
