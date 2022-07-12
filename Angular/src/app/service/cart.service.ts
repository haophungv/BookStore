import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const AUTH_API = 'http://localhost:3000/products/carts/';
const AUTH_API = `${environment.backendURL}/authentication/user/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

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
export class CartService {
  constructor(private http: HttpClient) {}

  create(cartCreateInput: CartCreateInput[]): Observable<any> {
    // console.log(JSON.stringify(cartCreateInput));
    console.log(cartCreateInput);

    let temp = [
      {
        _id: '',
        title: '',
        image: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
        amount: 0,
      },
    ];
    console.log('call api');

    // return this.http.post(AUTH_API, { temp: temp }, httpOptions);
    return this.http.post(
      AUTH_API,
      {
        username: 'haophungv',
        password: '12313',
      },
      httpOptions
    );
  }
  // create(username: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API,
  //     {
  //       username,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }
}
