import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProductsComponent } from 'src/app/products/products.component';
import { Product } from 'src/app/shared/product.interface';
import { addToCart, removeFromCart, updateSearchTerm } from 'src/app/shared/store/shopper.actions';
import { selectSearchTerm } from 'src/app/shared/store/shopper.selectors';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
      ],
      providers: [
        provideMockStore<ShopperState>({
          initialState: initialShopperState,
          selectors: [
            { selector: selectSearchTerm, value: 'test' }
          ],
        }),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  // mocked selector
  it('should set search term', () => {
    component.ngOnInit();
    expect(component.searchFormControl.value).toBe('test')
  });


  // overridde selector
  it('should not set search term is empty', () => {
    mockStore.overrideSelector(selectSearchTerm, '-')
    component.ngOnInit();

    expect(component.searchFormControl.value).toBe('-')
  });

  it('should update search term in store', () => {
    spyOn(mockStore, 'dispatch').and.callFake(() => { });

    mockStore.overrideSelector(selectSearchTerm, 'fake term');
    component.ngOnInit();

    component.updateSearchTerm();

    expect(mockStore.dispatch).toHaveBeenCalledWith(updateSearchTerm({ searchTerm: 'fake term' }));
  });

  it('should add to cart', () => {
    spyOn(mockStore, 'dispatch').and.callFake(() => { });

    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    component.addToCart(mockProduct);

    expect(mockStore.dispatch).toHaveBeenCalledWith(addToCart({ product: mockProduct }))
  });

  it('should remove from cart', () => {
    spyOn(mockStore, 'dispatch').and.callFake(() => { });

    component.removeFromCart('1234');

    expect(mockStore.dispatch).toHaveBeenCalledWith(removeFromCart({ productId: '1234' }))
  });
});
