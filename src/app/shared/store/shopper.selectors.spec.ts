import { Product } from 'src/app/shared/product.interface';
import { selectCartEmpty, selectCartSize, selectSearchResults, selectSearchTerm } from 'src/app/shared/store/shopper.selectors';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state'

describe("Selectors", () => {
  it("should select search results", () => {
    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    const state: ShopperState = {
      ...initialShopperState,
      searchResults: [mockProduct]
    };
    const result: Product[] = selectSearchResults.projector(state);
    expect(result).toContain(mockProduct);
    expect(result.length).toBe(1);
  });

  it("should select search results", () => {
    const state: ShopperState = {
      ...initialShopperState,
      searchTerm: 'test'
    };
    const result: string = selectSearchTerm.projector(state);
    expect(result).toBe('test');
  });

  it("should select cart size", () => {
    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    const state: ShopperState = {
      ...initialShopperState,
      cart: [mockProduct]
    };
    const result: number = selectCartSize.projector(state);
    expect(result).toEqual(1);
  });

  it("should select is cart empty", () => {
    const state: ShopperState = {
      ...initialShopperState,
      cart: []
    };
    const result: boolean = selectCartEmpty.projector(state);
    expect(result).toEqual(true);
  });
});
