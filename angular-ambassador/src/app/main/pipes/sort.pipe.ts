import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Pipe({
  name: 'sort',
  pure: true,
})
export class SortPipe implements PipeTransform {

  transform(products: Product[], sort: '' | 'asc' | 'desc'): Product[] {
    switch (sort) {
    case 'asc':
      return products.sort((a, b) => a.price - b.price);
    case 'desc':
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
    }
  }

}
