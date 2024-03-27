import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShopperState } from './shopper.state';

const featureSelector = createFeatureSelector<ShopperState>('shopper');

export const selectSearchResults = createSelector(featureSelector, (state: ShopperState) => state.searchResults);
export const selectSearchTerm = createSelector(featureSelector, (state: ShopperState) => state.searchTerm);
export const selectLoading = createSelector(featureSelector, (state: ShopperState) => state.loading);
export const selectLoaded = createSelector(featureSelector, (state: ShopperState) => state.loaded);
export const selectError = createSelector(featureSelector, (state: ShopperState) => state.error);
export const selectCart = createSelector(featureSelector, (state: ShopperState) => state.cart);
export const selectCartSize = createSelector(featureSelector, (state: ShopperState) => state.cart.length);
export const selectCartEmpty = createSelector(featureSelector, (state: ShopperState) => state.cart.length === 0);
