import { Product } from './product';

export interface PaginatedProducts {
  data: Product[],
  total: number;
  page: number;
  last_page: number;
}
