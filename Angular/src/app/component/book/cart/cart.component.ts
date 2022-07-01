import { CartService } from 'src/app/service/cart.service';
import { BookService } from 'src/app/service/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
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
  constructor(
    private cartService: CartService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    let dataOnStorage: string | null = null;
    dataOnStorage = localStorage.getItem('books');
    this.booksInCart = JSON.parse(dataOnStorage ? dataOnStorage : '');
    console.log(this.booksInCart);
  }

  onClickCheckout(): void {
    this.bookService.update(this.booksInCart).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.reloadPage();
    localStorage.removeItem('books');
  }

  reloadPage(): void {
    window.location.reload();
  }
}
