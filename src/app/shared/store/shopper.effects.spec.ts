import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, ReplaySubject } from 'rxjs';
import { Product } from 'src/app/shared/product.interface';
import { ProductsService } from 'src/app/shared/products.service';

import { ShopperActionType } from 'src/app/shared/store/shopper.actions';
import { ShopperEffects } from 'src/app/shared/store/shopper.effects';
import { selectSearchTerm } from 'src/app/shared/store/shopper.selectors';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state';

describe('ShopperEffects', () => {
  let actions$: ReplaySubject<any>;
  let shopperEffects: ShopperEffects;
  let productsService: ProductsService;
  let mockStore: MockStore;

  const mockProductsService: Partial<ProductsService> = {
    search$: () => of(),
    buy$: () => of(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ShopperEffects,
        provideMockActions(() => actions$),
        provideMockStore<ShopperState>({
          initialState: initialShopperState,
          selectors: [
            { selector: selectSearchTerm, value: 'test' }
          ],
        }),
        { provide: ProductsService, useValue: mockProductsService },
      ]
    }).compileComponents();

    shopperEffects = TestBed.inject(ShopperEffects);
    productsService = TestBed.inject(ProductsService);
    mockStore = TestBed.inject(MockStore);

    actions$ = new ReplaySubject(1);
  });

  it('should perform search after update search term', (done: DoneFn) => {

    actions$ = new ReplaySubject(1);
    actions$.next({ type: ShopperActionType.UPDATE_SEARCH_TERM });

    shopperEffects.udpateSearchTerm$.subscribe(resultAction => {
      expect(resultAction).toEqual({ type: ShopperActionType.SEARCH });
      done();
    });
  });

  it('should get search results', (done: DoneFn) => {
    mockStore.overrideSelector(selectSearchTerm, 'test');
    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    spyOn(productsService, 'search$').and.returnValue(of([mockProduct]));

    actions$ = new ReplaySubject(1);
    actions$.next({ type: ShopperActionType.SEARCH });

    shopperEffects.search$.subscribe(resultAction => {
      expect(productsService.search$).toHaveBeenCalledWith('test');

      expect(resultAction).toEqual({
        type: ShopperActionType.SEARCH_SUCCESS,
        searchResults: [mockProduct]
      });
      done();
    });
  });
});
