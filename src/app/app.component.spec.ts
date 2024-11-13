import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppComponent } from 'src/app/app.component';
import { initialShopperState, ShopperState } from 'src/app/shared/store/shopper.state';
import { selectCartSize } from 'src/app/shared/store/shopper.selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore<ShopperState>({
          initialState: {
            ...initialShopperState
          },
          selectors: [
            { selector: selectCartSize, value: 21 }
          ],
        }),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should select cart size from store', (done: DoneFn) => {
    component.cartSize$.subscribe((cartSize: number) => {
      expect(cartSize).toEqual(21);
      done();
    });
  });

});
