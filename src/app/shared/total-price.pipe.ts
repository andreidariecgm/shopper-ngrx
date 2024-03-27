import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './product.interface';

@Pipe({
  name: 'totalPrice',
  standalone: true,
})
export class TotalPricePipe implements PipeTransform {
  transform(cart: Product[]): number {
    return cart.reduce((total, product) => total + parseFloat(product.price), 0);
  }
}
