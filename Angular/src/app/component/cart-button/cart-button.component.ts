import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent implements OnInit {
  quantity = 0;
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

  constructor() {}

  ngOnInit(): void {
    let dataOnStorage: string | null = null;
    dataOnStorage = localStorage.getItem('books');
    this.booksInCart = JSON.parse(dataOnStorage ? dataOnStorage : '[{}]');
    this.booksInCart.forEach((item) => {
      this.quantity = this.quantity + item.amount;
    });
  }
}
