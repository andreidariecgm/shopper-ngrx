import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ProductsService } from '../products.service';
import { Product } from '../product.interface';
import { ShopperActionType } from './shopper.actions';
import { selectCart, selectSearchTerm } from './shopper.selectors';

@Injectable()
export class ShopperEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private productsService: ProductsService,
  ) { }

  udpateSearchTerm$ = createEffect(() => this.actions$.pipe(
    ofType(ShopperActionType.UPDATE_SEARCH_TERM),
    map(() => ({ type: ShopperActionType.SEARCH }))
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(ShopperActionType.SEARCH),
    withLatestFrom(this.store.select(selectSearchTerm)),
    switchMap(([action, searchTerm]) => this.productsService.search$(searchTerm).pipe(
      map((searchResults: Product[]) => ({
        type: ShopperActionType.SEARCH_SUCCESS,
        searchResults
      })),
      catchError((error: HttpErrorResponse) => of({
        type: ShopperActionType.SEARCH_ERROR,
        error: error.statusText
      }))
    ))
  ));

  buy$ = createEffect(() => this.actions$.pipe(
    ofType(ShopperActionType.BUY),
    withLatestFrom(this.store.select(selectCart)),
    switchMap(([action, cart]) => this.productsService.buy$(cart).pipe(
      map(() => ({ type: ShopperActionType.RESET_CART })),
      catchError(() => EMPTY)
    ))
  ));
}
