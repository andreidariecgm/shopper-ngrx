import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../shared/product.interface';
import { IsInCartPipe } from '../shared/is-in-cart.pipe';
import { selectCart, selectLoaded, selectLoading, selectSearchResults, selectSearchTerm } from '../shared/store/shopper.selectors';
import * as ShopperActions from '../shared/store/shopper.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    IsInCartPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {

  searchResults$: Observable<Product[]> = of([]);
  cart$: Observable<Product[]> = of([]);
  loading$: Observable<boolean> = of(false);
  loaded$: Observable<boolean> = of(false);

  searchFormControl = new FormControl('');

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
    this.cart$ = this.store.select(selectCart);
    this.loading$ = this.store.select(selectLoading);
    this.loaded$ = this.store.select(selectLoaded);

    this.store.select(selectSearchTerm)
      .pipe(take(1))
      .subscribe((term: string) => {
        this.searchFormControl.patchValue(term);
      });
  }

  updateSearchTerm(): void {
    this.store.dispatch(ShopperActions.updateSearchTerm({ searchTerm: this.searchFormControl.value || '' }));
  }

  addToCart(product: Product): void {
    this.store.dispatch(ShopperActions.addToCart({ product }));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(ShopperActions.removeFromCart({ productId }));
  }
}
