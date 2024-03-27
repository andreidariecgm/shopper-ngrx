import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../shared/product.interface';
import { TotalPricePipe } from '../shared/total-price.pipe';
import { selectCart, selectCartEmpty } from '../shared/store/shopper.selectors';
import * as ShopperActions from '../shared/store/shopper.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TotalPricePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

  cart$: Observable<Product[]> = of([]);
  cartEmpty$: Observable<boolean> = of(true);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.cartEmpty$ = this.store.select(selectCartEmpty);
  }

  buy(): void {
    this.store.dispatch(ShopperActions.buy());
  }
}
