import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { shopperReducer } from './shared/store/shopper.reducer';
import { ShopperEffects } from './shared/store/shopper.effects';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
    ),

    provideStore({ shopper: shopperReducer }),
    provideEffects(ShopperEffects),
    provideStoreDevtools(),
  ]
};
