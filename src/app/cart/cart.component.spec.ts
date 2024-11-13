import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CartComponent } from 'src/app/cart/cart.component';
import { Product } from 'src/app/shared/product.interface';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state';
import { selectCart, selectCartEmpty } from 'src/app/shared/store/shopper.selectors';
import * as ShopperActions from 'src/app/shared/store/shopper.actions';

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CartComponent,
      ],
      providers: [
        provideMockStore<ShopperState>({
          initialState: initialShopperState,
          selectors: [
            { selector: selectCartEmpty, value: true },
            { selector: selectCart, value: [] },
          ],
        }),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch buy action', () => {
    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    spyOn(mockStore, 'dispatch').and.callFake(() => { });
    component.buy();
    expect(mockStore.dispatch).toHaveBeenCalledWith(ShopperActions.buy());
  });

  it('should show cart when there are items', () => {
    const mockProduct: Product = {
      id: '123',
      name: 'test product',
      description: '',
      category: '',
      price: '',
      image: '',
    };
    mockStore.overrideSelector(selectCartEmpty, false);
    mockStore.setState({ cart: [mockProduct] });

    component.ngOnInit();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cart')).nativeElement.textContent.trim()).not.toBe('No items in cart.');
  });

  it('should show empty message when cart empty', () => {
    mockStore.overrideSelector(selectCartEmpty, true);
    mockStore.setState({ cart: [] });

    component.ngOnInit();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cart')).nativeElement.textContent.trim()).toBe('No items in cart.');
  });
});
