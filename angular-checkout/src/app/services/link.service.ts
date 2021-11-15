import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  get(code: string): Observable<{ user: User, products: Product[] }> {
    return this.http.get<{ user: User, products: Product[] }>(`${environment.api}/links/${code}`);
  }

}
