import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = `${environment.backendURL}/products/books/`;
const CART_API = `${environment.backendURL}/products/carts/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface BookCreateInput {
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}
interface CartCreateInput {
  _id: string;
  title: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  create(bookCreateInput: BookCreateInput): Observable<any> {
    return this.http.post(AUTH_API, bookCreateInput, httpOptions);
  }

  update(cartCreateInput: CartCreateInput[]): Observable<any> {
    return this.http.post(CART_API, cartCreateInput, httpOptions);
  }

  getAll(): Observable<any> {
    return this.http.get(AUTH_API, httpOptions);
  }
  getById(id: string | null): Observable<any> {
    return this.http.get(AUTH_API + 'getById/' + id, httpOptions);
  }

  // getById(id: string): Observable<any> {
  //   return this.http.get(AUTH_API + 'getById', id, httpOptions);
  // }
}
