import { Product } from 'src/app/shared/product.interface';
import { shopperReducer } from 'src/app/shared/store/shopper.reducer';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state';
import * as ShopperActions from 'src/app/shared/store/shopper.actions';

describe('shopperReducer', () => {

  describe('search', () => {
    it('should set loading to true', () => {
      const newState: ShopperState = shopperReducer(initialShopperState, ShopperActions.search);
      expect(newState.loading).toBeTrue();
    });

    it('should set loaded to false', () => {
      const newState: ShopperState = shopperReducer(initialShopperState, ShopperActions.search);
      expect(newState.loaded).toBeFalse();
    });
  });

  describe('addToCart', () => {
    it('should add product to cart', () => {
      const mockProduct: Product = {
        id: '123',
        name: 'test product',
        description: '',
        category: '',
        price: '',
        image: '',
      };
      const newState: ShopperState = shopperReducer(initialShopperState, ShopperActions.addToCart({ product: mockProduct }));
      expect(newState.cart).toContain(mockProduct);
      expect(newState.cart.length).toBe(1);
    });
  });

});
