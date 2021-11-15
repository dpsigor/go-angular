import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], search: string): Product[] {
    search = search.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
  }

}
