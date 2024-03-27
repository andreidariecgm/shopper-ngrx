import { Product } from '../product.interface';

export interface ShopperState {
  searchResults: Product[];
  searchTerm: string;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  cart: Product[];
}

export const initialShopperState: ShopperState = {
  searchResults: [],
  searchTerm: '',
  loading: false,
  loaded: false,
  error: null,
  cart: [],
};
