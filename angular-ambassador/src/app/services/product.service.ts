import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedProducts } from '../interfaces/paginated-products';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = `${environment.api}/products`;

  constructor(private http: HttpClient) {}

  all(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpoint);
  }

  backend(filters?: { page?: number, sort?: 'asc' | 'desc' | '', s?: string }): Observable<PaginatedProducts> {
    let params = new HttpParams();
    if (filters && filters.page) params = params.set('page', filters.page);
    if (filters && filters.sort) params = params.set('sort', filters.sort);
    if (filters && filters.s) params = params.set('s', filters.s);
    return this.http.get<PaginatedProducts>(`${this.endpoint}/backend`, { params });
  }

}
