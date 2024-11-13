import { Pipe, PipeTransform } from '@angular/core';

import { Product } from 'src/app/shared/product.interface';

@Pipe({
  name: 'isInCart',
  standalone: true,
})
export class IsInCartPipe implements PipeTransform {
  transform(productId: string, cart: Product[]): boolean {
    const index: number = cart?.findIndex((product: Product) => product.id === productId);
    return index > -1;
  }
}
