import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title = 'Angular';
  booksInCart = [
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
  quantity = 0;

  ngOnInit(): void {
    let dataOnStorage: string | null = null;
    dataOnStorage = localStorage.getItem('books');
    this.booksInCart = JSON.parse(dataOnStorage ? dataOnStorage : '[{}]');
    this.booksInCart.forEach((item) => {
      this.quantity = this.quantity + item.amount;
    });
  }
}
