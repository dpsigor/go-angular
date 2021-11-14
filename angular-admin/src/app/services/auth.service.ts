import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  register(data: any): Observable<any> {
    return this.http.post(`${environment.api}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.api}/login`, data, { withCredentials: true });
  }

}
